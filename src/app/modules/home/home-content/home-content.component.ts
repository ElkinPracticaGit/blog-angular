
/* Función: mostrar los registros y ejecutar acciones CRUD */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

/* Importación importante: Conecta el componente con el servicio
   Usa la interfaz Registro para tipado correcto*/
import { HomeService, Registro } from '../services/home.service';

@Component({
  selector: 'app-home-content',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit {

  /*Aquí se almacenan los registros que vienen del LocalStorage*/
  posts: Registro[] = [];

  constructor(
    private homeService: HomeService,
    private router: Router
  ) {}
/*Cargar datos al iniciar:Cuando carga la página, trae los datos guardados*/
  ngOnInit(): void {
    this.posts = this.homeService.getRegistros();
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
/*Ir al formulario*/
  goToForm(): void {
    this.router.navigate(['/form']);
  }
/*Editar formulario*/
  editPost(id: number): void {
    this.router.navigate(['/form', id]);
  }
/*Eliminar registro*/

  deletePost(id: number): void {
/*Borra del LocalStorage y Vuelve a cargar la lista */
    this.homeService.deleteRegistro(id);
    this.posts = this.homeService.getRegistros();
  }
}


