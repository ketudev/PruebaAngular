import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { PedidoComponent } from './pages/pedido/pedido.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'pedidos', component: PedidoComponent },
  { path: 'formulario', redirectTo: 'pedidos', pathMatch: 'full' },
  { path: '**', redirectTo: 'inicio' }
];
