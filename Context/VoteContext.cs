
using Microsoft.EntityFrameworkCore;
using Reconhecimento.Models;

public class VoteContext: DbContext {
    
    public VoteContext(DbContextOptions<VoteContext> options): base(options) {        
    }            
    public DbSet<Candidate> Candidates { get; set;}
    public DbSet<Voting> Votings { get; set;}
    public DbSet<VotesCandidate> VotesCandidates { get; set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.HasDefaultSchema("public");


        modelBuilder.Entity<VotesCandidate>()
            .HasKey(v => v.Id);

        modelBuilder.Entity<VotesCandidate>()
            .HasOne(x => x.Voting)
            .WithMany(x => x.VotesCandidates)
            .HasForeignKey(x => x.VotingId);

        modelBuilder.Entity<VotesCandidate>()
            .HasOne(x => x.Candidate)
            .WithMany(x => x.VotesCandidates)
            .HasForeignKey(x => x.CandidateId);            

    }
}