import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ParticipantService } from '../service/participant.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Participant } from '../model/participant';
import { Evenement } from '../model/evenement';
import { EvenementService } from '../service/evenement.service';

@Component({
  selector: 'app-addParticipant',
  templateUrl: './addParticipant.component.html',
  styleUrls: ['./participant.component.css']
})
export class addParticipantComponent implements OnInit{

  submitForm = false;
  participantForm = new FormGroup({
    id: new FormControl(''),
    nom: new FormControl('',[Validators.required]),
    prenom: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    telephone: new FormControl('',[Validators.required]),
    presence: new FormControl('',[Validators.required]),
    evenementId: new FormControl('',[Validators.required])
  });
  participant:any;
  evenements : Evenement[] = [];

  constructor(private participantService : ParticipantService,
    private evenementService : EvenementService,
    private router : Router,
    private route :ActivatedRoute
  ){

  }

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.getById();
    }
    this.allEvenement(); // Chargement des événements
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

  get f2(){
    return this.participantForm.controls;
  }
  addParticipant(){
      this.submitForm = true;
      if(this.participantForm.invalid){
        return;
      }else{
        if(this.participantForm.value['id'] == ''){
          this.participant = this.participantForm.value;
          this.participant.id = this.participant.prenom.length+this.participant.nom;
       
          this.participantService.addParticipant(this.participant).subscribe(
            ()=>{
        
              Swal.fire({
                position: "center",
                icon: "success",
                title: "participant ajoute avec succes",
                showConfirmButton: false,
                timer: 1500
              });
              //Redirection
              this.router.navigateByUrl('/Participant');
            },
            (error)=>{
              console.log("Error");
            }
          )
         // this.users = this.userService.allUser();
         
        
        }else{
          this.participant = this.participantForm.value;
          this.participantService.updateParticipant(this.participant).subscribe(
            ()=>{
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Participant modifie avec succes",
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigateByUrl('/Participant');
            },
            (error)=>{
              console.log(error);
            }
          )
        }
      
      }
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
  }


