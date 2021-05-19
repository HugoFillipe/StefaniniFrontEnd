import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-listar-professor',
  templateUrl: './listar-professor.component.html',
  styleUrls: ['./listar-professor.component.css']
})
export class ListarProfessorComponent implements OnInit {

  modalRef: BsModalRef;
  professoresFiltrados: Professor[];
  professorId: number;
  professores: Professor[];
  professor: Professor;
  filtroLista = ''; 

  constructor(
    private professorService: ProfessorService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {    
    this.getProfessor();    
  }
   
  get filtro(): string {
    return this.filtroLista;
  }
  
  set filtro(value: string) {
    this.filtroLista = value;
    this.professoresFiltrados = this.filtroLista ? this.filtrarProfessor(this.filtroLista) : this.professores;
  }
  
  getProfessor() { 
    this.professorService.obter().subscribe(
      (professores: Professor[]) => {
        this.professores = professores;
        this.professoresFiltrados = this.professores;
      }, error => {
        this.toastr.error(`Erro ao tentar carregar professores: ${error}`);
      }
    );
  }
  mostrarCursos(professor: any){
    alert(professor.cursos.map(curso =>curso.nome))
  }
  filtrarProfessor(filtrarPor: string): Professor[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.professores.filter(
      professor => professor.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }
  
}
