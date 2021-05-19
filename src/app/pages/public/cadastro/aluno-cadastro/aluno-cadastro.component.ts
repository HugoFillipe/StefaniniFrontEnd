import { Aluno } from './../../../../models/aluno';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlunoService } from 'src/app/services/aluno.service';


@Component({
  selector: 'app-aluno-cadastro',
  templateUrl: './aluno-cadastro.component.html',
  styleUrls: ['./aluno-cadastro.component.css']
})
export class AlunoCadastroComponent implements OnInit {

  form: FormGroup;  
  aluno = {} as Aluno;
  
  get f() {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,    
    private router: Router,    
    private alunoService: AlunoService,
    private toastr: ToastrService,
  
  ) { }

  ngOnInit() {
    this.validation();
  }

  private validation() {    
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],     
      email: ['', [Validators.required, Validators.email]],
      formacao: ['', Validators.required],
      idade: ['', Validators.required],
      tipo: ['', Validators.required],
      senha: ['', Validators.required],
      cursos: this.fb.array([])
    });
  }

  registrar() {
    if (this.form.valid) {      
      this.aluno = this.form.value;
      this.alunoService.incluir(this.aluno).subscribe(
        () => {
          this.toastr.success('Usuario salvo com sucesso!', 'Sucesso');
          this.router.navigate([`/login`]);
        },
        (error: any) => {
          console.error(error);
          this.toastr.error(`Erro ao tentar salvar usuário: ${error.error.message}`);
        }
      );
    }
  }
  
  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

}
