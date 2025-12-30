/*SERVICIO – LocalStorage
Función: manejar la persistencia de datos
*/


import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


/*Interfaz Registro
Define la estructura de cada registro*/
export interface Registro {
  id: number;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
  edad: number;
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private storageKey = 'registros';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // Obtener registros
  //Lee datos desde LocalStorage
  getRegistros(): Registro[] {
    if (!this.isBrowser) return [];
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  // Guardar registro
  addRegistro(registro: Registro): void {
    if (!this.isBrowser) return;
    const registros = this.getRegistros();
    registros.push(registro);
    localStorage.setItem(this.storageKey, JSON.stringify(registros));
  }

  // Actualizar
  updateRegistro(registroActualizado: Registro): void {
    if (!this.isBrowser) return;

    const registros = this.getRegistros().map(r =>
      r.id === registroActualizado.id ? registroActualizado : r
    );

    localStorage.setItem(this.storageKey, JSON.stringify(registros));
  }

  // Eliminar
  deleteRegistro(id: number): void {
    if (!this.isBrowser) return;
    const registros = this.getRegistros().filter(r => r.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(registros));
  }

  // para editar)
  getRegistroById(id: number): Registro | undefined {
    return this.getRegistros().find(r => r.id === id);
  }
}
