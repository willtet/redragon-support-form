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
  enviarGarantia(dados: any): Observable<any> {
    this.apiUrl.concat("/garantia")
    return this.http.post<any>(this.apiUrl, dados);
  }

  enviarSoftware(dados: any): Observable<any> {
    this.apiUrl.concat("/software")
    return this.http.post<any>(this.apiUrl, dados);
  }

  enviarDuvida(dados: any): Observable<any> {
    this.apiUrl.concat("/duvida")
    return this.http.post<any>(this.apiUrl, dados);
  }

  enviarParceria(dados: any): Observable<any> {
    this.apiUrl.concat("/parceria")
    return this.http.post<any>(this.apiUrl, dados);
  }

  enviarRevenda(dados: any): Observable<any> {
    this.apiUrl.concat("/revenda")
    return this.http.post<any>(this.apiUrl, dados);
  }

  enviarOutros(dados: any): Observable<any> {
    console.log(dados)
    return this.http.post<any>(this.apiUrl.concat("/outros"), dados);
  }
}
