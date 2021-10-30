import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NutriRegistroComponent } from './nutri-registro/nutri-registro.component';
import { ClienteRegistroComponent } from './cliente-registro/cliente-registro.component';
import { VistaAdminComponent } from './vista-admin/vista-admin.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'registro/nutri',component:NutriRegistroComponent},
  {path:'registro/cliente',component:ClienteRegistroComponent},
  {path:'vista/admin',component:VistaAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
