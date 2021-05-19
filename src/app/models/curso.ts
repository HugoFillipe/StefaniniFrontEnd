import { Aluno } from "./aluno";
import { Aula } from "./aula";

export interface Curso {
    id?: number;
    nome: string;
    descricao: string;
    idProfessor?: number;
    idAluno?: Aluno[];
    aulas?: Aula[];
}