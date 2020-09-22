using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Reconhecimento.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VotingController: ControllerBase
    {


        [HttpGet]
        public Models.Voting CreateVoting([FromServices] VoteContext voteContext) {
            
            var voting = new Models.Voting {
                Guid = Guid.NewGuid().ToString(),
                DateVoting = DateTime.Now
            };

           voteContext.Votings.Add(voting);
           voteContext.SaveChanges();

           return voting;
        }
        
    }
}