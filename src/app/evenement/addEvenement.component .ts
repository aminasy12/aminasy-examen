import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EvenementService } from '../service/evenement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Evenement } from '../model/evenement';
import Swal from 'sweetalert2';

@Component({
  selector: 'add-evenement',
  templateUrl: './addEvenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class addEvenementComponent implements OnInit {

  submitForm = false;
  evenementForm = new FormGroup({
    id: new FormControl(''),
    nom: new FormControl('',[Validators.required]),
    date: new FormControl('',[Validators.required]),
    lieu: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    organisateur: new FormControl('',[Validators.required]),
  });

  evenement:any;


  constructor(private evenementService : EvenementService,
    private router : Router,
    private route :ActivatedRoute
  ){

  }

  ngOnInit(): void {
    if(this.route.snapshot.params['id']){
      this.getById();
    }
  }
  getById(){
    this.evenementService.getByid(this.route.snapshot.params['id']).subscribe(
      (data: Evenement)=>{
          this.evenement = data;
          console.log(this.evenement)
          this.evenementForm.get('id')?.setValue(this.evenement.id);
          this.evenementForm.get('nom')?.setValue(this.evenement.nom);
          this.evenementForm.get('date')?.setValue(this.evenement.date);
          this.evenementForm.get('lieu')?.setValue(this.evenement.lieu);
          this.evenementForm.get('description')?.setValue(this.evenement.description);
          this.evenementForm.get('organisateur')?.setValue(this.evenement.organisateur);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  get f2(){
    return this.evenementForm.controls;
  }
  addEvenement(){
      this.submitForm = true;
      if(this.evenementForm.invalid){
        return;
      }else{
        if(this.evenementForm.value['id'] == ''){
          this.evenement = this.evenementForm.value;
          this.evenement.id = this.evenement.nom.length+this.evenement.organisateur;
       
          this.evenementService.addEvenement(this.evenement).subscribe(
            ()=>{
        
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Evenement ajoute avec succes",
                showConfirmButton: false,
                timer: 1500
              });
              //Redirection
              this.router.navigateByUrl('/Evenement');
            },
            (error)=>{
              console.log("Error");
            }
          )
         // this.users = this.userService.allUser();
         
        
        }else{
          this.evenement = this.evenementForm.value;
          this.evenementService.updateEvenement(this.evenement).subscribe(
            ()=>{
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Evenement modifie avec succes",
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigateByUrl('/Evenement');
            },
            (error)=>{
              console.log(error);
            }
          )
        }
      
      }
    }

  }

