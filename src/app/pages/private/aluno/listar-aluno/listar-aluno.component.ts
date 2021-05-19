import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from 'src/app/models/aluno';
import { AlunoService } from 'src/app/services/aluno.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-listar-aluno',
  templateUrl: './listar-aluno.component.html',
  styleUrls: ['./listar-aluno.component.css']
})
export class ListarAlunoComponent implements OnInit {
   
  modalRef: BsModalRef;
  alunosFiltrados: Aluno[];
  alunoId: number;
  alunos: Aluno[];
  aluno: Aluno;
  filtroLista = ''; 

  constructor(
    private alunoService: AlunoService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {    
    this.getAluno();    
  }
   
  get filtro(): string {
    return this.filtroLista;
  }
  
  set filtro(value: string) {
    this.filtroLista = value;
    this.alunosFiltrados = this.filtroLista ? this.filtrarAlunos(this.filtroLista) : this.alunos;
  }
  
  getAluno() { 
    this.alunoService.obter().subscribe(
      (alunos: Aluno[]) => {
        this.alunos = alunos;
        this.alunosFiltrados = this.alunos;
      }, error => {
        this.toastr.error(`Erro ao tentar carregar alunos: ${error}`);
      }
    );
  }

  filtrarAlunos(filtrarPor: string): Aluno[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.alunos.filter(
      aluno => aluno.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

}
