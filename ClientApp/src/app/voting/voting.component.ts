import { Component, OnInit } from '@angular/core';
import { DateManagement } from 'src/data/data';
import { SignalRService } from 'src/services/SignalRService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css'],
  providers: [DateManagement]
})
export class VotingComponent implements OnInit {

  idVoting = '';
  linkVoting = '';
  watchSession = true;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public signalRService: SignalRService,
              private http: HttpClient,
              private route: ActivatedRoute,
              private dateManagment: DateManagement) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const paramSplit = param['id'].split('&');
      if (paramSplit.length > 1) {
        this.watchSession = paramSplit[1] === 'watch' ? false : true;
      }
      localStorage.setItem('idVoting', paramSplit[0]);
    });
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
    this.signalRService.addTransferVotesForCandidateListener();
    this.startHttpRequest();
  }

  private startHttpRequest = () => {
    setTimeout(() => {
      this.http.get(window.location.origin + '/candidate')
        .subscribe(res => {
        });

      this.http.get(window.location.origin + '/voting')
        .subscribe(res => {
        });
    }, 1000);
  }

  vote(candidate) {

    const vote = {
      CandidateId: candidate.id,
      VortingGuid: this.getGuidVotings()
    };
    this.http.post(window.location.origin + '/VotesCandidates', JSON.stringify(vote), this.httpOptions).subscribe();
  }

  getGuidVotings(): string {
    return localStorage.getItem('idVoting');
  }

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  clear() {
    this.http.get(window.location.origin + '/VotesCandidates/reset/' + this.getGuidVotings(), this.httpOptions).subscribe();
  }
}
