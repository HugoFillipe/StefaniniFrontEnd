import { ListarProfessorComponent } from './pages/private/professor/listar-professor/listar-professor.component';
import { CadastroAlunoComponent } from './pages/private/aluno/cadastro-aluno/cadastro-aluno.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListarCursosComponent } from './pages/private/cursos/listar-cursos/listar-cursos.component';
import { ListarAlunoComponent } from './pages/private/aluno/listar-aluno/listar-aluno.component';
import { CadastroCursoComponent } from './pages/private/cursos/cadastro-curso/cadastro-curso.component';
import { AreaProfessorComponent } from './pages/private/professor/area-professor/area-professor.component';
import { AreaAlunoComponent } from './pages/private/aluno/area-aluno/area-aluno.component';
import { TituloComponent } from './components/titulo/titulo.component';
import { ProfessorCadastroComponent } from './pages/public/cadastro/professor-cadastro/professor-cadastro.component';
import { AlunoCadastroComponent } from './pages/public/cadastro/aluno-cadastro/aluno-cadastro.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { HttpInterceptorService } from './interceptors/http-interceptor.service';
import { HomeComponent } from './pages/private/home/home.component';
import { CadastroComponent } from './pages/public/cadastro/cadastro.component';
import { LoginComponent } from './pages/public/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/public/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ProfessorComponent } from './pages/private/professor/professor-cursos/professor.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SenhaAlterarComponent } from './pages/private/senha/senha-alterar/senha-alterar.component';
import { FieldErrorsComponent } from './components/field-errors/field-errors.component';

export function tokenGetter() {
  return localStorage.getItem('jwttoken');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    FooterComponent,
    PaginaNaoEncontradaComponent,
    HeaderComponent,
    AlunoCadastroComponent,
    ProfessorCadastroComponent,
    TituloComponent,
    AreaAlunoComponent,
    AreaProfessorComponent,   
    CadastroCursoComponent,
    ListarProfessorComponent,
    ListarAlunoComponent,
    ListarCursosComponent,
    ProfessorComponent,
    CadastroAlunoComponent,
    SenhaAlterarComponent,
    FieldErrorsComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    TooltipModule.forRoot(),
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),    
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
  ],
  providers: [
    HttpInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
