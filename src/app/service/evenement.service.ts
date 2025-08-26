import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evenement } from '../model/evenement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  url = 'http://localhost:8000/evenements';

  constructor(private httpClient :HttpClient) { }
  addEvenement(evenement :Evenement){
    return  this.httpClient.post(this.url,evenement);
  }
  updateEvenement(evenement :Evenement){
    return  this.httpClient.put(this.url+'/'+evenement.id,evenement)
   }
 
   allEvenement(): Observable<Evenement[]> {
     return this.httpClient.get<Evenement[]>(this.url);
   }
 
  getByid(id:string){
    return this.httpClient.get<Evenement>(this.url+"/"+id);
  }
  deleteEvenement(id:string){
    return this.httpClient.delete(this.url+'/'+id);
  }
}
