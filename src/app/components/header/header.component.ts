import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.usuario = this.authService.getUsuario();
    });
  }

  showHeader() {
    return this.authService.isAuthenticated();
  }
   
  logout() {
    localStorage.removeItem('jwttoken');
    this.toastr.show('Log Out');
    this.router.navigate(['login']);
  }

  userName() {
    var user = JSON.parse(localStorage.getItem('user'));
    var nome = user.tipo == 1 ? 'Professor:  ': 'Aluno:  ' + user.nome;
    return nome;
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  entrar() {
    this.router.navigate(['/login']);
  }  

}
