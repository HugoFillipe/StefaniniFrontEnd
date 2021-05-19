import { Curso } from "./curso";

export interface Aluno {
  id?: number;
  email: string;
  senha: string;
  nome: string;
  tipo: number;
  idade: string;
  formacao: string;
  cursos?: Curso[];
}
