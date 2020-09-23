using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Reconhecimento.Hubs;
using Reconhecimento.Models;
using Reconhecimento.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Reconhecimento.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VotesCandidatesController : ControllerBase
    {
        private readonly VoteContext voteContext;
        private readonly IHubContext<VotingHub> _hub;

        public VotesCandidatesController(VoteContext voteContext, IHubContext<VotingHub> hub)
        {
            this._hub = hub;
            this.voteContext = voteContext;

        }

        [HttpPost]
        public async Task<IActionResult> Vote([FromBody] VoteCandidate vote, [FromServices] VoteContext voteContext)
        {

            var votingId = await ValidateGuidVoting(vote.VortingGuid);

            if (votingId > 0)
            {
                try
                {
                    var voteCandidate = new VotesCandidate
                    {
                        CandidateId = vote.CandidateId,
                        VotingId = votingId
                    };

                    await voteContext.VotesCandidates.AddAsync(voteCandidate);
                    await voteContext.SaveChangesAsync();

                    await CountCandidatesVotes(vote.VortingGuid, votingId);

                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }

            }
            return Ok(vote);
        }


        [HttpGet]
        [Route("reset/{votingGuid}")]
        public async Task<IActionResult> GetVotesForCandidate([FromRoute] string votingGuid)
        {            
            var votingId = await ValidateGuidVoting(votingGuid);
            if (votingId > 0) {         
              await ResetCandidatesVotes(votingId);
              return await Task.FromResult(Ok());
            } else {
                return await Task.FromResult(NoContent());
            }
        }

        private async Task<List<VotesForCandidate>> CountCandidatesVotes(string votingGuid, int votingId) {

            var voting = await (from votes in voteContext.VotesCandidates
                                where votes.VotingId == votingId
                                group votes by votes.CandidateId into groupCandidate
                                select new VotesForCandidate {
                                    CandidateName = voteContext.Candidates.SingleOrDefault(x => x.Id == groupCandidate.Key).Name,
                                    CandidateVotes = groupCandidate.Count(),
                                    GuidSession = votingGuid
                                })
                                .OrderByDescending(x => x.CandidateVotes)
                                .ToListAsync();

              await _hub.Clients.All.SendAsync("loadVotesCandidates", voting);

              return await Task.FromResult(voting);
        }

         private async Task<List<VotesForCandidate>> ResetCandidatesVotes(int votingId) {

            var voting = await (from votes in voteContext.VotesCandidates
                                where votes.VotingId == votingId
                                select votes
                                ).ToListAsync();

            voteContext.VotesCandidates.RemoveRange(voting);
            await voteContext.SaveChangesAsync();
            
            await _hub.Clients.All.SendAsync("loadVotesCandidates", new List<VotesForCandidate>());

            return await Task.FromResult(new List<VotesForCandidate>());
        }
        private async Task<int> ValidateGuidVoting(string guid)
        {
            return await Task.FromResult(voteContext.Votings.SingleOrDefault(v => v.Guid == guid).Id);
        }

    }
}