import { SenhaService } from '../../../../services/senha.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-senha-alterar',
  templateUrl: './senha-alterar.component.html',
  styleUrls: ['./senha-alterar.component.css']
})
export class SenhaAlterarComponent implements OnInit {
  form: FormGroup;  
  user: any;
  constructor(private fb: FormBuilder,
    private service: SenhaService,
    private toastr: ToastrService,) { }
    
    ngOnInit(): void {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.validation()
    }
    
    private validation() {    
      this.form = this.fb.group({
        id:[{value:this.user.id}],
        novaSenha: ['', [Validators.required]],     
        novaSenhaConfirma: ['', [Validators.required]],
        senhaAtual: ['', Validators.required],
        rota:[{value: Number(this.user.tipo) == 2 ? 'aluno' : 'professor'}]
      });
    }
    alterarSenha() {
      this.service.alterar(this.form.value).subscribe( 
        () =>
        {
          this.toastr.success('Senha atualizada!');
        },
        (error) => {
          this.toastr.error(`Erro ao tentar alterar senha: ${error.error.message}`);
        })
      }
      validaSenha() {
        if(this.form.get('novaSenha').value && this.form.get('novaSenhaConfirma').value) {
          if( this.form.get('novaSenha').value !== this.form.get('novaSenhaConfirma').value) {
            this.form.get('novaSenhaConfirma').setValue('');
            this.form.get('novaSenha').setValue('');
            this.toastr.error('senhas não conferem!');
          }
        }
      }
    }
    