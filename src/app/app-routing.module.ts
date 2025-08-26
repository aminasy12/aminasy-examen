import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { addEvenementComponent } from './evenement/addEvenement.component ';
import { EvenementComponent } from './evenement/evenement.component';
import { ParticipantComponent } from './participant/participant.component';
import { addParticipantComponent } from './participant/addParticipant.component';

const routes: Routes = [

  {path: 'addEvenement',component:addEvenementComponent},
  {path: 'addParticipant',component:addParticipantComponent},
  {path: 'updateParticipant/:id',component:addParticipantComponent},
  {path: 'updateEvenement/:id',component:addEvenementComponent},
  {path: 'Evenement',component:EvenementComponent},
  {path: 'Participant',component:ParticipantComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
