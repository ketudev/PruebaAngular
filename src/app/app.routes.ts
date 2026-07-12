import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component'
import { LoginComponent } from './pages/login/login.component'
import { AboutComponent } from './pages/about/about.component'


export const routes: Routes = [
    {path:'', component:InicioComponent},
    {path:'login', component:LoginComponent},
    {path:'about', component:AboutComponent},
    ];
