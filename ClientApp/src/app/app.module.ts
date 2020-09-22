import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CardVoteComponent } from './card-vote/card-vote.component';
import { ModalComponent } from './modal/modal.component';
import { ManagementComponent } from './management/management.component';
import { VotingComponent } from './voting/voting.component';
import { LocationStrategy } from '@angular/common';

@NgModule({
   declarations: [
      AppComponent,
      NavMenuComponent,
      HomeComponent,
      CounterComponent,
      FetchDataComponent,
      CardVoteComponent,
      ModalComponent,
      ManagementComponent,
      VotingComponent
   ],
   imports: [
      BrowserModule.withServerTransition({"appId": "ng-cli-universal"}),   
      HttpClientModule,
      FormsModule,      
      RouterModule.forRoot([
         { path: '', component: HomeComponent, pathMatch: 'full' },
         { path: 'voting/:id', component: VotingComponent, pathMatch: 'full'},
         { path: 'management', component: ManagementComponent },      
      ], {
         onSameUrlNavigation: 'reload'
      })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
