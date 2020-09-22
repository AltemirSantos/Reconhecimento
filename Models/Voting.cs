using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Reconhecimento.Models
{
    public class Voting
    {
        [Key]
        public int Id { get; set; }
        public string Guid { get; set; }
        public DateTime DateVoting { get; set; }  
        public ICollection<VotesCandidate> VotesCandidates {get; set;}      
    }
}