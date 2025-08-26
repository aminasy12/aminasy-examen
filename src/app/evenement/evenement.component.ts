import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EvenementService } from '../service/evenement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Evenement } from '../model/evenement';
import Swal from 'sweetalert2';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit {


  compteur = 0;
  valueSearch:string ="";
  evenement :Evenement = {
      'id': '0',
      'nom':'',
      'date': new Date(),
      'lieu':'',
      'description':'',
      'organisateur':''
  }

  evenements : Evenement[] = [];


  constructor(private evenementService : EvenementService,
    
  ){

  }


  deleteEvenement(id:string) {
    Swal.fire({
      title: "Etes vous sure de vouloir supprimer ?",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non"
    }).then((result) => {
    
      if (result.isConfirmed) {
          this.evenementService.deleteEvenement(id).subscribe(
            ()=>{
              this.allEvenement();
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
      this.evenement ={
        'id': '0',
      'nom':'',
      'date': new Date(),
      'lieu':'',
      'description':'',
      'organisateur':''
    }
  }

  recharge(p:Evenement){
    this.evenement = p;
  }

  ngOnInit(): void {
    this.allEvenement();
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
  getEvenementNom(id: string): string {
    const evenement = this.evenements.find(e => e.id === id);
    return evenement ? evenement.nom : "Non défini";
  }

  generatePDF() {
    const doc = new jsPDF();

    // Titre du document
    doc.setFontSize(18);
    doc.text('Rapport des Événements', 20, 10);

    // Tableau des participants
    autoTable(doc, {
      startY: 20,
      head: [['ID', 'Nom', 'Lieu', 'Date', 'Description', 'Organisateur']],
      body: this.evenements.map(p => [
        p.id,
        p.nom.toUpperCase(),
        p.lieu,
        p.date ? new Date(p.date).toLocaleDateString() : 'N/A',
        p.description,
        p.organisateur,
      ]),
    });
    
    // Sauvegarde du fichier
    doc.save('Rapport_Evenement.pdf');
    
  }


}