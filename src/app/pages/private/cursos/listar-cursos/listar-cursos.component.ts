import { AlunoService } from 'src/app/services/aluno.service';
import { Curso } from './../../../../models/curso';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CursoService } from 'src/app/services/curso.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrls: ['./listar-cursos.component.css']
})
export class ListarCursosComponent implements OnInit {

  modalRef: BsModalRef;
  public cursos: Curso[] = [];
  public cursosFiltrados: Curso[] = [];
  public cursoId = 0;

  private filtroListado = '';

  public get filtroLista(): string {
    return this.filtroListado;
  }

  public set filtroLista(value: string) {
    this.filtroListado = value;
    this.cursosFiltrados = this.filtroLista ? this.filtrarCursos(this.filtroLista) : this.cursos;
  }

  public filtrarCursos(filtrarPor: string): Curso[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.cursos.filter(
      curso => curso.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(
    private cursoService: CursoService,    
    private toastr: ToastrService,
    private alunoService: AlunoService
    
  ) { }

  public ngOnInit(): void {    
    this.carregarCursos();
  }
  
  public carregarCursos(): void {
    this.cursoService.obter().subscribe({
      next: (cursos: Curso[]) => {
        this.cursos = cursos;
        this.cursosFiltrados = this.cursos;
      },
      error: (error: any) => {
        this.toastr.error('Erro ao Carregar os Cursos', 'Erro!');
      }
    });
  }

  matriculaCurso(curso) {
    if(confirm(`tem certeza que deseja matricular no curso ${curso.nome}? `))
    this.alunoService.matricularCurso(curso.id).subscribe(mensagem =>{
      this.toastr.success(mensagem.mensagem)
    },(err) => {
      this.toastr.error(err.error.message);
    },)
  }


}
