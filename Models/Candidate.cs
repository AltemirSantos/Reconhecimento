using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Reconhecimento.Models
{
    public class Candidate
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<VotesCandidate> VotesCandidates {get; set;}
    }
}