using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Reconhecimento.Hubs;
using Reconhecimento.TimeFeatures;

namespace Reconhecimento.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CandidateController : ControllerBase
    {
        private IHubContext<VotingHub> _hub;

        public CandidateController(IHubContext<VotingHub> hub)
        {
            _hub = hub;
        }
    
        [HttpPost]        
        public async Task<IActionResult> AddCandidate([FromBody] Models.Candidate vote,  [FromServices] VoteContext voteContext) {
            var model = new Models.Candidate { Name = vote.Name };

            try {
                voteContext.Candidates.Add(model);
                await voteContext.SaveChangesAsync();
            } catch (Exception ex ) {
                return BadRequest(ex);
            }                        
            
            return RedirectToAction(nameof(GetCandidates)); 
        }

        [HttpGet("{id}")]        
        public async Task<IActionResult> RemoveCandidate([FromRoute] int id,  [FromServices] VoteContext voteContext)
        {
            var item = voteContext.Candidates.SingleOrDefault(x => x.Id == id);

            try {
                if (item != null) {
                    voteContext.Candidates.Remove(item);
                    await voteContext.SaveChangesAsync();                   
                }
            } catch (Exception ex) {            
                return BadRequest(ex);
            }            
            return RedirectToAction(nameof(GetCandidates));                                
        }        

        [HttpGet]
        public List<Models.Candidate> GetCandidates([FromServices] VoteContext voteContext)
        {                        
            // var timerManager = new TimerManager(() => _hub.Clients.All.SendAsync("transfervotingdata", voteContext.Votes.ToList())); 
            var candidates = voteContext.Candidates.ToList();
            _hub.Clients.All.SendAsync("loadCandidates", candidates);
            
            return candidates;
        }
    }
}
