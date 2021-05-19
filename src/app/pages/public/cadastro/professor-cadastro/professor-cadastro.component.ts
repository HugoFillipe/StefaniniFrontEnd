import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-professor-cadastro',
  templateUrl: './professor-cadastro.component.html',
  styleUrls: ['./professor-cadastro.component.css']
})
export class ProfessorCadastroComponent implements OnInit {

  form: FormGroup;  
  professor = {} as Professor;
  
  get f() {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,    
    private router: Router,    
    private serviceProfessor: ProfessorService,
    private toastr: ToastrService,
  
  ) { }

  ngOnInit() {
    this.validation();
  }

  private validation() {    
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],     
      email: ['', [Validators.required, Validators.email]],      
      senha: ['', Validators.required],
      tipo: [1, Validators.required],
      cursos: this.fb.array([]),
    });
  }

  registrar() {
    if (this.form.valid) {      
      this.professor = {...this.form.value};      
      this.serviceProfessor.incluir(this.professor).subscribe(
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
    return {'is-invalid': campoForm.errors && campoForm.touched };
  }
  
}
