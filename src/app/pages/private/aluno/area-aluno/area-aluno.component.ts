import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-aluno',
  templateUrl: './area-aluno.component.html',
  styleUrls: ['./area-aluno.component.css']
})
export class AreaAlunoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  listar() {
    this.router.navigate(['listar-cursos']);
  }

  cadastroAluno() {
    this.router.navigate(['cadastro-novo-aluno']);
  }

  professores() {
    this.router.navigate(['listar-professor']);
  }

}
