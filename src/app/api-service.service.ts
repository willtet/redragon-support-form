import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://177.153.59.127:8080/email';  // URL do seu backend

  constructor(private http: HttpClient) { }

  // Método para enviar os dados do formulário para o backend
  enviarGarantia(dados: any, options: any = {}): Observable<any> {
    return this.http.post<any>(this.apiUrl.concat("/garantia"), dados, {
      responseType: 'text',
      ...options,
    });
  }

  enviarSoftware(dados: any, options: any = {}): Observable<any> {
    return this.http.post<any>(this.apiUrl.concat("/software"), dados, {
      responseType: 'text',
      ...options,
    });
  }

  enviarDuvida(dados: any, options: any = {}): Observable<any> {
    return this.http.post<any>(this.apiUrl.concat("/duvida"), dados, {
      responseType: 'text',
      ...options,
    });
  }

  enviarParceria(dados: any, options: any = {}): Observable<any> {
    return this.http.post<any>(this.apiUrl.concat("/parceria"), dados, {
      responseType: 'text',
      ...options,
    });
  }

  enviarRevenda(dados: any, options: any = {}): Observable<any> {
    return this.http.post<any>(this.apiUrl.concat("/revenda"), dados, {
      responseType: 'text',
      ...options,
    });
  }

  enviarOutros(dados: any, options: any = {}): Observable<any> {
    console.log(dados)
    return this.http.post<any>(this.apiUrl.concat("/outros"), dados, {
      responseType: 'text',
      ...options,
    });
  }
}
