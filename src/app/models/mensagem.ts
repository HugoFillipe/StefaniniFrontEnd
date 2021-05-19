import { Usuario } from "./usuario";

export interface Mensagem {
    usuario: Partial<Usuario>;
}
