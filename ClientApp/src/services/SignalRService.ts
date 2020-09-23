import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Candidate } from 'src/models/Candidate';
import { VotesForCandidate } from 'src/models/VotesForCandidate';


@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  public candidates: Candidate[];
  public votesForCandidate: VotesForCandidate[];
  public votesTotal = 0;
  private hubConnection: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl(window.location.origin + '/votinghub')
                            .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public addTransferChartDataListener = () => {
    this.hubConnection.on('loadCandidates', (data: Candidate[]) => {
      this.candidates = data;
    });
  }

  public addTransferVotesForCandidateListener = () => {
    this.hubConnection.on('loadVotesCandidates', (data: VotesForCandidate[]) => {
      if (data.length > 0) {
        this.votesForCandidate = data.filter(x => x.guidSession === this.getGuidVotings());
        this.votesTotal = this.votesForCandidate
          .map(x => x.candidateVotes)
          .reduce((acc, x) => acc + x);
      } else {
        this.votesForCandidate = [];
        this.votesTotal = 0;
      }
    });
  }

  getGuidVotings(): string {
    return localStorage.getItem('idVoting');
  }
}
