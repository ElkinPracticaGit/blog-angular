
//Se importan los componentes:

import { Routes } from '@angular/router';
// HomeContentComponent → página principal del blog
import { HomeContentComponent } from './modules/home/home-content/home-content.component';
//FormContentComponent → formulario de registro (crear / editar)
import { FormContentComponent } from './modules/form/components/form-content/form-content.component';

//Se crea el arreglo con todas las rutas del proyecto
export const routes: Routes = [

//Ruta por defecto: Cuando el usuario entra se redirige automáticamente a /home
//pathMatch: 'full' asegura que coincida exactamente
  { path: '', redirectTo: 'home', pathMatch: 'full' },

//Muestra el Home del blog
  { path: 'home', component: HomeContentComponent },
//Abre el formulario para crear un nuevo registro
  { path: 'form', component: FormContentComponent },
//Permite editar un registro existente (operación ACTUALIZAR del CRUD)
  { path: 'form/:id', component: FormContentComponent }
];
