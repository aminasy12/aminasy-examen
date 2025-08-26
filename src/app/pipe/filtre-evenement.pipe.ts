import { Pipe, PipeTransform } from '@angular/core';
import { Evenement } from '../model/evenement';

@Pipe({
  name: 'filtreEvenement'
})
export class EvenementPipe implements PipeTransform {
  transform(evenements: Evenement[],value: any): Evenement[] {
    if(value.length != 0){
     return  evenements.filter((a)=> a.nom.includes(value) || a.organisateur.includes(value) || a.lieu.includes(value));
    }
    return evenements;
  }

}
