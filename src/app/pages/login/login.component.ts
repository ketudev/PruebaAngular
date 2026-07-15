import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  usuario: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router) { }

  login() {
    if (this.usuario === 'admin' && this.password === '1234') {
      this.error = '';
      const sesionUsuario = {
        usuario: this.usuario,
        password: this.password,
        fechaLogin: new Date()
      };
      localStorage.setItem('sesion', JSON.stringify(sesionUsuario));

      this.router.navigate(['/pedidos']);
    } else {
      this.error = 'Usuario o contraseña incorrectos';
    }
  }

}