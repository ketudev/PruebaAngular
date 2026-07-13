import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- Importante para poder usar *ngIf

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule], // <-- Lo agregamos aquí
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  
  // Aquí guardaremos el mensaje si intenta entrar estando logueado
  mensaje: string = '';

  constructor(private router: Router) {}

  // Esta función se ejecuta cuando presionan el botón
  intentarEntrar() {
    // 1. Revisamos si el JSON de sesión ya existe en la memoria
    if (localStorage.getItem('sesion')) {
      // 2. Si existe, no lo dejamos ir al login y le mostramos el mensaje
      this.mensaje = '¡Ya iniciaste sesión! Dirígete a "Hacer Pedido" en el menú superior.';
    } else {
      // 3. Si NO existe, usamos el Router para mandarlo a la página de login
      this.router.navigate(['/login']);
    }
  }
}