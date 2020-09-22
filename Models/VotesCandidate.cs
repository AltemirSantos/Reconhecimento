using System.ComponentModel.DataAnnotations;

namespace Reconhecimento.Models
{
    public class VotesCandidate
    {        
        public int Id { get; set; }
        public int VotingId { get; set; }
        public Voting Voting { get; set; }
        public int CandidateId { get; set; }
        public Candidate Candidate { get; set; }
        
    }
}
