import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HttpClientModule} from '@angular/common/http'
import { MatIconModule } from '@angular/material/icon'
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NutriRegistroComponent } from './nutri-registro/nutri-registro.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AlertaComponent } from './alerta/alerta.component';
import { ClienteRegistroComponent } from './cliente-registro/cliente-registro.component';
import { AgregadoComponent } from './agregado/agregado.component';
import { VistaAdminComponent } from './vista-admin/vista-admin.component';
import { VistaClienteComponent } from './vista-cliente/vista-cliente.component';
import { VistaNutriComponent } from './vista-nutri/vista-nutri.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NutriRegistroComponent,
    AlertaComponent,
    ClienteRegistroComponent,
    AgregadoComponent,
    VistaAdminComponent,
    VistaClienteComponent,
    VistaNutriComponent,
  ],
  imports: [
    BrowserModule,
    MatRadioModule,
    MatCheckboxModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
