import { ListarProfessorComponent } from './pages/private/professor/listar-professor/listar-professor.component';
import { CadastroAlunoComponent } from './pages/private/aluno/cadastro-aluno/cadastro-aluno.component';
import { ListarCursosComponent } from './pages/private/cursos/listar-cursos/listar-cursos.component';
import { ListarAlunoComponent } from './pages/private/aluno/listar-aluno/listar-aluno.component';
import { CadastroCursoComponent } from './pages/private/cursos/cadastro-curso/cadastro-curso.component';
import { AreaAlunoComponent } from './pages/private/aluno/area-aluno/area-aluno.component';
import { AreaProfessorComponent } from './pages/private/professor/area-professor/area-professor.component';
import { AlunoCadastroComponent } from './pages/public/cadastro/aluno-cadastro/aluno-cadastro.component';
import { ProfessorCadastroComponent } from './pages/public/cadastro/professor-cadastro/professor-cadastro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { HomeComponent } from './pages/private/home/home.component';
import { CadastroComponent } from './pages/public/cadastro/cadastro.component';
import { LoginComponent } from './pages/public/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/public/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ProfessorComponent } from './pages/private/professor/professor-cursos/professor.component';
import { SenhaAlterarComponent } from './pages/private/senha/senha-alterar/senha-alterar.component';

const routes: Routes = [
  
  { path: 'senha', component: SenhaAlterarComponent, canActivate: [AuthGuardService]},
  { path: 'aluno', component: AreaAlunoComponent, canActivate: [AuthGuardService]},
  { path: 'aluno-cadastro', component: CadastroAlunoComponent, canActivate: [AuthGuardService]},
  { path: 'listar-aluno', component: ListarAlunoComponent, canActivate: [AuthGuardService]},

  { path: 'area-professor', component: AreaProfessorComponent, canActivate: [AuthGuardService]},
  { path: 'professor', component: ProfessorComponent, canActivate: [AuthGuardService] },
  { path: 'listar-professor', component: ListarProfessorComponent,  canActivate: [AuthGuardService]},
  { path: 'cadastro-cursos', component: CadastroCursoComponent, canActivate: [AuthGuardService]},

  { path: 'cadastro-cursos/:id', component: CadastroCursoComponent, canActivate: [AuthGuardService]},  
  { path: 'listar-cursos', component: ListarCursosComponent, canActivate: [AuthGuardService]},
  { path: '', canActivate: [AuthGuardService], component: HomeComponent },

  { path: 'cadastro-professor', component: ProfessorCadastroComponent, },
  { path: 'cadastro-aluno', component: AlunoCadastroComponent, },
  { path: 'nova-conta',  component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PaginaNaoEncontradaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
