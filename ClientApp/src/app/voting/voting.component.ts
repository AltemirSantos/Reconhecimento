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

  //candidates = [];
  // voting = [];
  //total = 0;
  idVoting = '';
  linkVoting = '';
  watchSession: boolean = true;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(public signalRService: SignalRService, 
              private http: HttpClient,
              private route: ActivatedRoute,
              private dateManagment: DateManagement) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      var paramSplit = param['id'].split('&');
      if (paramSplit.length > 1) {
        this.watchSession = paramSplit[1] === "watch" ? false : true;
      }
      localStorage.setItem("idVoting", paramSplit[0]);
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

        this.http.get(window.location.origin + '/voting/' + this.getGuidVotings())
        .subscribe(res => {          
        })
      }, 1000)
  }

  vote(candidate) {

    var vote = {
      CandidateId: candidate.id,
      VortingGuid: this.getGuidVotings()
    };
    this.http.post(window.location.origin + '/VotesCandidates', JSON.stringify(vote), this.httpOptions).subscribe(result => {
      console.log(result);
    });
  }

  getGuidVotings(): string {    
    return localStorage.getItem("idVoting");
  }

  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  /*
  updateCount(vote) {

    var voteIndex = null;
    // find for guid in array voting
    if (this.voting.length > 0) {
      voteIndex = this.voting.findIndex(element => element.guid == vote.guid);      
    }
    // add or update counter in array
    if (voteIndex != null && voteIndex > -1) {      
      if (vote.counter == 0) {
        this.voting.splice(voteIndex, 1);
      } else {
        this.voting[voteIndex] = vote;
      }
    } else {
      this.voting.push(vote);
    }
    // sum de total votes
    this.total = this.voting.reduce((count, element) => {
      return count += element.counter;
    }, 0);
    // sort per number of vote
    this.voting.sort(function(a, b) {
      if (b.counter > a.counter) {
        return 1;
      }
      if (b.counter < a.counter) {
        return -1;
      }      
      return 0;
    });
  }   */
  
  clear() {
    //this.voting = [];
    //this.total = 0;    
  }
}
