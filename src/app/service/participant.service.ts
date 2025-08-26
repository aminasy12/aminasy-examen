import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evenement } from '../model/evenement';
import { Observable } from 'rxjs';
import { Participant } from '../model/participant';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {


  url = 'http://localhost:8000/participants';
  
  constructor(private httpClient :HttpClient) { }
 
  addParticipant(participant :Participant){
    return  this.httpClient.post(this.url,participant);
  }
  updateParticipant(participant :Participant){
    return  this.httpClient.put(this.url+'/'+participant.id,participant)
   }
 
   allParticipant(): Observable<Participant[]> {
     return this.httpClient.get<Participant[]>(this.url);
   }
 
  getByid(id:string){
    return this.httpClient.get<Participant>(this.url+"/"+id);
  }
  deleteParticipant(id:string){
    return this.httpClient.delete(this.url+'/'+id);
  }
}
