import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EvenementComponent } from './evenement/evenement.component';
import { EvenementPipe } from './pipe/filtre-evenement.pipe';
import { addEvenementComponent } from './evenement/addEvenement.component ';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ParticipantComponent } from './participant/participant.component';
import { FiltreParticipantPipe } from './pipe/filtre-participant.pipe';
import { addParticipantComponent } from './participant/addParticipant.component';





@NgModule({
  declarations: [
    AppComponent,
    addEvenementComponent,
    EvenementComponent,
    EvenementPipe,
    ParticipantComponent,
    FiltreParticipantPipe,
    addParticipantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
