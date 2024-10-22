import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8080/email';  // URL do seu backend

  constructor(private http: HttpClient) { }

  // Método para enviar os dados do formulário para o backend
  enviarDados(dados: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, dados);
  }
}
