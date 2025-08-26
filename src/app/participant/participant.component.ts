import { Component } from '@angular/core';
import { Participant } from '../model/participant';
import { ParticipantService } from '../service/participant.service';
import Swal from 'sweetalert2';
import { Evenement } from '../model/evenement';
import { EvenementService } from '../service/evenement.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent {


  compteur = 0;
  valueSearch:string ="";
  participant :Participant = {
      'id': '0',
      'nom':'',
      'evenementId':'',
      'prenom': '',
      'email':'',
      'telephone':'',
      'presence':''
  }
  participantForm = new FormGroup({
    id: new FormControl(''),
    nom: new FormControl('',[Validators.required]),
    prenom: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    telephone: new FormControl('',[Validators.required]),
    presence: new FormControl('',[Validators.required]),
    evenementId: new FormControl('',[Validators.required])
  });
  participants : Participant[] = [];
  
  evenements : Evenement[] = [];
  constructor(private participantService : ParticipantService, private evenementService : EvenementService,
    private route :ActivatedRoute
   
  ){

  }

  deleteParticipant(id:string) {
    Swal.fire({
      title: "Etes vous sure de vouloir supprimer ?",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non"
    }).then((result) => {
    
      if (result.isConfirmed) {
          this.participantService.deleteParticipant(id).subscribe(
            ()=>{
              this.allParticipant();
            },
            (error)=>{
              console.log(error)
            }
          )
         // this.users = this.userService.allUser();
      } 
    }); 
  }


  clear(){
      this.participant ={
        'id': '0',
      'nom':'',
      'evenementId':'',
      'prenom': '',
      'email':'',
      'telephone':'',
      'presence':''
    }
  }

  recharge(p:Participant){
    this.participant = p;
  }

  ngOnInit(): void {if (this.route.snapshot.params['id']) {
    this.getById();
  }
  this.allEvenement(); 
    this.allParticipant();
  }

  getById(){
    this.participantService.getByid(this.route.snapshot.params['id']).subscribe(
      (data: Participant)=>{
          this.participant = data;
          console.log(this.participant)
          this.participantForm.get('id')?.setValue(this.participant.id);
          this.participantForm.get('nom')?.setValue(this.participant.nom);
          this.participantForm.get('prenom')?.setValue(this.participant.prenom);
          this.participantForm.get('email')?.setValue(this.participant.email);
          this.participantForm.get('telephone')?.setValue(this.participant.telephone);
          this.participantForm.get('presence')?.setValue(this.participant.presence);
          this.participantForm.get('evenementId')?.setValue(this.participant.evenementId);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  allParticipant(){
    this.participantService.allParticipant().subscribe(
      (data :Participant[])=>{
          this.participants = data;
      },
      (error)=>{
          console.log(error);
      }
    )
  }
  getEvenementNom(id: string): string {
    const evenement = this.evenements.find(e => e.id === id);
    return evenement ? evenement.nom : "Non défini";
  }
  allEvenement(){
    this.evenementService.allEvenement().subscribe(
      (data :Evenement[])=>{
          this.evenements = data;
      },
      (error)=>{
          console.log(error);
      }
    )
  }
  generatePDF() {
    const doc = new jsPDF();

    // Titre du document
    doc.setFontSize(18);
    doc.text('Rapport des Participants et Événements', 20, 10);

    // Tableau des participants
    autoTable(doc, {
      startY: 20,
      head: [['ID', 'Nom', 'Prénom', 'Email', 'Téléphone', 'Présence', 'Événement']],
      body: this.participants.map(p => [
        p.id,
        p.nom.toUpperCase(),
        p.prenom,
        p.email,
        p.telephone,
        p.presence,
        this.getEvenementNom(p.evenementId)
      ]),
    });

    // Sauvegarde du fichier
    doc.save('Rapport_Participants.pdf');
  }
}

  


