import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NutriRegistroComponent } from './nutri-registro/nutri-registro.component';
import { ClienteRegistroComponent } from './cliente-registro/cliente-registro.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'registro/nutri',component:NutriRegistroComponent},
  {path:'registro/cliente',component:ClienteRegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
