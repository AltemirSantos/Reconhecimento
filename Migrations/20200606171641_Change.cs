using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Reconhecimento.Migrations
{
    public partial class Change : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "public");

            migrationBuilder.CreateTable(
                name: "Candidates",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Candidates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Votings",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Guid = table.Column<string>(nullable: true),
                    DateVoting = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Votings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VotesCandidates",
                schema: "public",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    VotingId = table.Column<int>(nullable: false),
                    CandidateId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VotesCandidates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VotesCandidates_Candidates_CandidateId",
                        column: x => x.CandidateId,
                        principalSchema: "public",
                        principalTable: "Candidates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VotesCandidates_Votings_VotingId",
                        column: x => x.VotingId,
                        principalSchema: "public",
                        principalTable: "Votings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VotesCandidates_CandidateId",
                schema: "public",
                table: "VotesCandidates",
                column: "CandidateId");

            migrationBuilder.CreateIndex(
                name: "IX_VotesCandidates_VotingId",
                schema: "public",
                table: "VotesCandidates",
                column: "VotingId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VotesCandidates",
                schema: "public");

            migrationBuilder.DropTable(
                name: "Candidates",
                schema: "public");

            migrationBuilder.DropTable(
                name: "Votings",
                schema: "public");
        }
    }
}
