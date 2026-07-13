import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd} from '@angular/router'; // <-- Importamos NavigationEnd
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // TRUCO DE MAGIA: Cada vez que cambie la página (Ruta), Angular obligará
    // al Navbar a refrescar sus botones según el localStorage actual.
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Esto le avisa a Angular que hubo un cambio de página y debe redibujar el Navbar
    });
  }

  // Esta función la usará el HTML para saber si muestra o esconde "Pedidos"
  isLoggedIn(): boolean {
    return localStorage.getItem('sesion') !== null;
  }

  // Función para el botón de salir
  logout() {
    localStorage.removeItem('sesion'); // Borramos el JSON de sesión
    this.router.navigate(['/']);   // Rebotamos al usuario al inicio
  }
}