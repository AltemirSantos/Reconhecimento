import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Candidate } from 'src/models/Candidate';

@Component({
  selector: 'app-card-vote',
  templateUrl: './card-vote.component.html',
  styleUrls: ['./card-vote.component.css']
})
export class CardVoteComponent implements OnInit {
      
  @Input() candidate: Candidate;
  @Output() outputVote: EventEmitter<any> = new EventEmitter();
  
  
  constructor() { }

  ngOnInit() {    
  }

  vote() { 
    this.outputVote.emit(this.candidate);
  }

  /*
  createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);  
      return v.toString(16);  
   }); 
  }*/
}
