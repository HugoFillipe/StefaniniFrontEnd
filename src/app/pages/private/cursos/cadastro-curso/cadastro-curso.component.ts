import { ProfessorService } from './../../../../services/professor.service';
import { CursoService } from './../../../../services/curso.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Curso } from 'src/app/models/curso';
import { AulaService } from 'src/app/services/aula.service';
import { Aula } from 'src/app/models/aula';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-curso',
  templateUrl: './cadastro-curso.component.html',
  styleUrls: ['./cadastro-curso.component.css']
})
export class CadastroCursoComponent implements OnInit {

  modalRef: BsModalRef;
  cursosFiltrados: Curso[];
  cursoId: number;
  cursos: Curso[];
  curso: Curso;
  modoSalvar = 'incluir';  
  form: FormGroup; 
  bodyDeletarCurso = '';  
  filtroLista = '';  
  aulaAtual = {id: 0, nome: '', duracao: '', idCurso: 0, indice: 0};
  professores: any[]= []

  constructor(
    private cursoService: CursoService,    
    private fb: FormBuilder,    
    private toastr: ToastrService,
    private modalService: BsModalService,
    private aulaService: AulaService,
    private router: Router,
    private professorService: ProfessorService  
  ) { }

  ngOnInit() {    
    this.getCursos();
    this.validation();
  }

  get aulas(): FormArray {
    return this.form.get('aulas') as FormArray;
  }

  get f(): any {
    return this.form.controls;
  }
  
  get filtro(): string {
    return this.filtroLista;
  }

  get modoEditar(): boolean {
    return this.modoSalvar === 'alterar';
  }

  set filtro(value: string) {
    this.filtroLista = value;
    this.cursosFiltrados = this.filtroLista ? this.filtrarCurso(this.filtroLista) : this.cursos;
  }

  editarCurso(curso: Curso, template: any) {
    this.professorService.obter().subscribe(professores => this.professores = professores)
    this.modoSalvar = 'alterar';
    this.openModal(template);
    this.curso = {...curso};    
    this.form.patchValue(this.curso);
    
  }

  novoCurso(template: any) {
    this.professorService.obter().subscribe(professores => this.professores = professores)
    this.modoSalvar = 'incluir';
    this.openModal(template);
  }

  public salvarAulas(): void {    
    if (this.form.controls.aulas.valid) {
      this.aulaService.incluir(this.form.value)
        .subscribe(
          () => {
            this.toastr.success('Aulas salva com Sucesso!', 'Sucesso!');
          },
          (error: any) => {
            this.toastr.error('Erro ao tentar salvar aulas.', 'Erro');
            console.error(error);
          }
        );
    }
  }

  adicionarAula(idCurso:any): void {
    this.aulas.push(this.criarAula({id: 0, idCurso:this.curso.id} as Aula));
  }
  
  criarAula(aula: Aula): FormGroup {
    return this.fb.group({
      id: [aula.id],
      nome: [aula.nome, Validators.required],
      duracao: [aula.duracao, Validators.required],
      idCurso: [aula.idCurso, Validators.required],
    });
  }

  public retornaTituloAula(nome: string): string {
    return nome === null || nome === '' ? 'Nome da aula' : nome;
  }
  
  validation() {
    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      descricao: [null, Validators.required],      
      idProfessor: [null, Validators.required],  
      aulas: this.fb.array([])
    });
  }
      
  excluirCurso(curso: Curso, template: any) {
    this.openModal(template);
    if(curso.aulas.length > 0) {
      this.toastr.error('Você não pode deletar este curso, ele tem aula programada.');
    } else {
      this.curso = curso;
      this.bodyDeletarCurso = `Tem certeza que deseja excluir o Curso: ${curso.nome}, Código: ${curso.id}`;
    }
  }

  confirmeDelete(template: any) {
    this.cursoService.excluir(this.curso.id).subscribe(
      () => {
        template.hide();
        this.getCursos();
        this.toastr.success('Deletado com Sucesso.');
      }, error => {
        this.toastr.error('Error ao tentar deletar.');
      }
    );
  }
    
  salvarAlteracao(template: any) {    
    if (this.form.valid) {
      this.curso = (this.modoSalvar === 'incluir') ? {...this.form.value} : {id: this.curso.id, ...this.form.value};
      this.cursoService[this.modoSalvar](this.curso).subscribe(
        () => {
          template.hide();
          this.getCursos();
          this.toastr.success('Inserido com Sucesso!');
        },
        (error) => {
          this.toastr.error(`Erro ao Inserir: ${error.error.message}`);
        }
      );
    }
  }
  
  getCursos() { 
    this.cursoService.obter().subscribe(
      (cursos: Curso[]) => {
        this.cursos = cursos;
        this.cursosFiltrados = this.cursos;
      }, error => {
        this.toastr.error(`Erro ao tentar carregar cursos: ${error}`);
      }
    );
  }

  filtrarCurso(filtrarPor: string): Curso[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.cursos.filter(
      curso => curso.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  public resetForm(): void {
    this.form.reset();
  }
  
  openModal(template: any) {
    this.form.reset();
    template.show();
  }  

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched };
  }
}