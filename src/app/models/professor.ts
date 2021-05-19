import { Curso } from "./curso";

export interface Professor {
    id: number;
    email: string;
    senha: string;
    nome: string;
    tipo: number;
    cursos?: Curso[];
}
