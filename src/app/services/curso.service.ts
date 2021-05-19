import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso';

const URL = 'http://localhost:3000/stefanini/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private http: HttpClient) { }

  obter(): Observable<Curso[]> {
    return this.http.get<Curso[]>(URL);
  }
  
  listarCursoById(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${URL}/${id}`);
  }
  
  incluir(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(URL, curso);
  }

  alterar(curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${URL}/${curso.id}`, curso);
  }

  excluir(id: number) {
    return this.http.delete(`${URL}/${id}`);
  }

  public excluirCurso(professorId: number, cursoId: number): Observable<any> {
    return this.http.delete(`${URL}/${professorId}/${cursoId}`);
  }
  

}
