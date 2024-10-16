import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Client{
  id:number;
  nome:string;
  cognome:string;
  azienda:string;
  userId:number;
  email:string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:3000/clients';
  constructor(private http: HttpClient) { }

  getClientsById(id: number):Observable<Client[]>{
    const url = `${this.apiUrl}?userId=${id}`;
    return this.http.get<Client[]>(url);


    
  }
  
  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }
}