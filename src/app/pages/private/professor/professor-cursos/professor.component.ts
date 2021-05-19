import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/curso';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {

  modalRef: BsModalRef;
  professoresFiltrados: Professor[];
  professores: Professor[];
  professorId: number;
  professor: Professor;
  modoSalvar = 'incluir';
  user: any;

  formulario: FormGroup;
  bodyDeletarProfessor = '';
  filtroLista = ''; 
  cursoAtual = {id: 0, nome: '', duracao: '', idCurso: 0, indice: 0};

  constructor(
    private professorService: ProfessorService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private cursoService: CursoService,
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getProfessores();
    this.validation();
  }

  get filtro(): string {
    return this.filtroLista;
  }
  set filtro(value: string) {
    this.filtroLista = value;
    this.professoresFiltrados = this.filtroLista ? this.filtrarProfessor(this.filtroLista) : this.professores;
  }

  get modoEditar(): boolean {
    return this.modoSalvar === 'alterar';
  }

  get cursos(): FormArray {
    return this.formulario.get('cursos') as FormArray;
  }

  get f(): any {
    return this.formulario.controls;
  }

  editarProfessor(professor: Professor, template: any) {
    this.modoSalvar = 'alterar';
    this.openModal(template);
    this.professor =  {...professor};
    this.formulario.patchValue(this.professor);
  }

  novoProfessor(template: any) {
    this.modoSalvar = 'incluir';
    this.openModal(template);
  }

  validation() {
    this.formulario = this.formBuilder.group({
      id: [''],
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],     
      email: ['', [Validators.required, Validators.email]],      
      senha: ['', Validators.required],
      tipo: [1],
      cursos: this.formBuilder.array([]),
    });
  }

  public salvarCursos(): void {    
    if (this.formulario.controls.cursos.valid) {
      this.cursoService.incluir(this.formulario.value)
        .subscribe(
          () => {
            this.toastr.success('Cursos salvo com Sucesso!', 'Sucesso!');
          },
          (error: any) => {
            this.toastr.error('Erro ao tentar salvar curso.', 'Erro');
            console.error(error);
          }
        );
    }
  }

  adicionarCurso(): void {
    this.cursos.push(this.criarCurso({id: 0} as Curso));
  }

  criarCurso(curso: Curso): FormGroup {
    return this.formBuilder.group({
      id: [curso.id],
      nome: [curso.nome, Validators.required],
      descricao: [curso.descricao, Validators.required],      
    });
  }

  public retornaTituloCurso(nome: string): string {
    return nome === null || nome === '' ? 'Nome do curso' : nome;
  }

  confirmDeleteCurso(): void {
    this.modalRef.hide();
    this.cursoService.excluirCurso(this.professorId, this.cursoAtual.id)
      .subscribe(
        () => {
          this.toastr.success('Curso deletado com sucesso', 'Sucesso');
          this.cursos.removeAt(this.cursoAtual.indice);
        },
        (error: any) => {
          this.toastr.error(`Erro ao tentar deletar a aula ${this.cursoAtual.id}`, 'Erro');
          console.error(error);
        }
      );
  }

  declineDeleteCurso(): void {
    this.modalRef.hide();
  }

  excluirProfessor(professor: Professor, template: any) {
    this.openModal(template);
    if(professor.cursos.length > 0) {
      this.toastr.error('Você não pode deletar este professor, ele tem curso a ministrar.');
    } else {
      this.professor = professor;
      this.bodyDeletarProfessor = `Tem certeza que deseja excluir o Professor: ${professor.nome}, Código: ${professor.id}`;
    }
  }

  confirmeDelete(template: any) {
    this.professorService.excluir(this.professor.id).subscribe(
      () => {
        template.hide();
        this.getProfessores();
        this.toastr.success('Deletado com Sucesso.');
      }, error => {
        this.toastr.error('Error ao tentar deletar.');
      }
    );
  }
  

  salvarAlteracao(template: any) {    
    if (this.formulario.valid) {
      this.professor = (this.modoSalvar === 'incluir') ? {...this.formulario.value} : {id: this.professor.id, ...this.formulario.value};
      this.professor.tipo = 1
      this.professorService[this.modoSalvar](this.professor).subscribe(
        () => {
          template.hide();
          this.getProfessores();
          this.toastr.success('Inserido com Sucesso!');
        },
        (error) => {
          console.error(error)
          this.toastr.error(`Erro ao tentar salvar usuário: ${error.error.message}`);
        }
      );
    }
  }

  getProfessores() {
    this.professorService.obter().subscribe(
      (professores: Professor[]) => {
        this.professores = professores;
        this.professoresFiltrados = this.professores;
      }, error => {
        this.toastr.error(`Erro ao tentar carregar professores: ${error}`);
      }
    );
  }

  filtrarProfessor(filtrarPor: string): Professor[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.professores.filter(
      professor => professor.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  mostrarCursos(professor: any){
    alert(professor.cursos.map(curso =>curso.nome))
  }

  openModal(template: any) {
    this.formulario.reset();
    template.show();
  }

  public resetForm(): void {
    this.formulario.reset();
  }
  
  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched };
  }
}
