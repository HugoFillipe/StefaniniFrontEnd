import { Aula } from './../models/aula';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL = 'http://localhost:3000/stefanini/curso';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  constructor(private http: HttpClient) {}  

  obter(): Observable<Aula[]> {
    return this.http.get<Aula[]>(URL);
  }

  listarAulaById(id: number): Observable<Aula> {
    return this.http.get<Aula>(`${URL}/${id}`);
  }
  
  incluir(curso: Aula): Observable<Aula> {
    return this.http.post<Aula>(URL, curso);
  }

  alterar(aula: Aula): Observable<Aula> {
    return this.http.put<Aula>(`${URL}/${aula.id}`, aula);
  }

  excluir(id: number): Observable<any> {
    return this.http.delete(`${URL}/${id}`);
  }

  excluirAula(cursoId: number, aulaId: number): Observable<any> {
    return this.http.delete(`${URL}/${cursoId}/${aulaId}`);
  }

}
