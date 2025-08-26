import { Pipe, PipeTransform } from '@angular/core';
import { Participant } from '../model/participant';

@Pipe({
  name: 'filtreParticipant'
})
export class FiltreParticipantPipe implements PipeTransform {

  transform(participants: Participant[],value: any): Participant[] {
    if(value.length != 0){
     return  participants.filter((a)=> a.nom.includes(value) || a.prenom.includes(value) || a.telephone.includes(value));
    }
    return participants;
  }

}
