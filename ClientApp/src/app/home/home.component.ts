import { Component, OnInit } from '@angular/core';
import { DateManagement } from 'src/data/data';
import { SignalRService } from 'src/services/SignalRService';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DateManagement]
})
export class HomeComponent implements OnInit {

  watchSession: boolean;
  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
    this.watchSession = false;
  }

  initVoting(idSession: string) {
    if (idSession !== '') {
      this.router.navigate(['/voting', idSession + '&' + 'watch'], { skipLocationChange: true});
    } else {
      this.http.get(window.location.href + 'voting').subscribe(result => {
        this.router.navigate(['/voting', result['guid']], { skipLocationChange: true});
      });
    }
  }

  onWatchSession() {
    this.watchSession = !this.watchSession;
  }
}
