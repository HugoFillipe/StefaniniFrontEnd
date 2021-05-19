import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const URL = 'http://localhost:3000/stefanini';

@Injectable({
  providedIn: 'root'
})
export class SenhaService {

  constructor(private httpClient: HttpClient) {}
 
  alterar(usuario: any): Observable<any> {
    console.log(usuario);
    
    return this.httpClient.put<any>(`${URL}/${usuario.rota.value}/alterarsenha/${usuario.id.value}`, usuario);
  }


}


