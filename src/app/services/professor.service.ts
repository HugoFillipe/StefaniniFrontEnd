import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from '../models/professor';

const URL = 'http://localhost:3000/stefanini/professor';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  constructor(private httpClient: HttpClient) {}

  // #pegabandeira
  obterById(id: number): Observable<Professor> {
    return this.httpClient.get<Professor>(`${URL}/${id}`);
  }
 
  obter(): Observable<Professor[]> {
    return this.httpClient.get<Professor[]>(`${URL}`);
  }

  incluir(professor: Professor): Observable<Professor> {
    return this.httpClient.post<Professor>(URL, professor);
  }

  alterar(professor: Professor): Observable<Professor> {
    return this.httpClient.put<Professor>(`${URL}/${professor.id}`, professor);
  }

  excluir(id: number): Observable<any> {
    return this.httpClient.delete(`${URL}/${id}`);
  }
}
