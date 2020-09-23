import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DateManagement } from 'src/data/data';
import { Candidate } from 'src/models/Candidate';
import { Router } from '@angular/router';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
  providers: [DateManagement]
})
export class ManagementComponent implements OnInit {

  @ViewChild('inputName', {static: false}) inputName: ElementRef;

  data = [];
  constructor(private dateManagment: DateManagement,
              private router: Router) { }

  ngOnInit() {
    this.dateManagment.getData().subscribe(result => {
        this.data = result;
      }, error => console.error(error));
  }

  remove(item: Candidate) {
    this.dateManagment.remove(item).subscribe(result => {
      console.log('remove' + result);
      this.data = result;
     });
  }

  add(name: string) {
   this.dateManagment.add(name).subscribe(result => {
     this.data = result;
   });
   this.inputName.nativeElement.value = '';
  }

  returnToVoting() {
    this.router.navigate(['/voting', localStorage.getItem('idVoting')]);
  }
}
