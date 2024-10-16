import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface Client {
  nome: string;
  cognome: string;
  email: string;
  azienda: string;
}

const CLIENT_DATA: Client[] = [];

@Component({
  selector: 'app-clientslist',
  templateUrl: './clientslist.component.html',
  styleUrls: ['./clientslist.component.css']
})
export class ClientslistComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'cognome', 'email', 'azienda', 'actions'];
  dataSource = new MatTableDataSource<Client>(CLIENT_DATA);
  clientlistForm: FormGroup;
  isEditMode: boolean = false;
  currentIndex: number = -1;

  constructor(private fb: FormBuilder) {
    this.clientlistForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', Validators.required],
      azienda: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.clientlistForm.valid) {
      const newClient: Client = {
        nome: this.clientlistForm.get('nome')?.value,
        cognome: this.clientlistForm.get('cognome')?.value,
        email: this.clientlistForm.get('email')?.value,
        azienda: this.clientlistForm.get('azienda')?.value
      };

      if (this.isEditMode) {
        CLIENT_DATA[this.currentIndex] = newClient;
      } else {
        CLIENT_DATA.push(newClient);
      }

      this.dataSource.data = CLIENT_DATA;
      this.clientlistForm.reset();
      this.isEditMode = false;
      this.currentIndex = -1;
    }
  }

  editClient(index: number) {
    const client = CLIENT_DATA[index];
    this.clientlistForm.patchValue({
      nome: client.nome,
      cognome: client.cognome,
      email: client.email,
      azienda: client.azienda
    });
    this.isEditMode = true; 
    this.currentIndex = index;
  }


  deleteClient(index: number) {
    CLIENT_DATA.splice(index, 1);
    this.dataSource.data = CLIENT_DATA;
  }

  ngOnInit() {}
}