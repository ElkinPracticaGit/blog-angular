//FORMULARIO (Crear / Editar)
//Función: formulario con validaciones


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

import { HomeService, Registro } from '../../../home/services/home.service';

@Component({
  selector: 'app-form-content',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CardModule
  ],
  templateUrl: './form-content.component.html',
  styleUrls: ['./form-content.component.scss']
})
export class FormContentComponent implements OnInit {

  form!: FormGroup;
  editando = false;
  registroId!: number;

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    //Formulario reactivo
    //Campos obligatorios y con validación de correo
    this.form = this.fb.group({
      id: [null],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(1)]]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editando = true;
      this.registroId = Number(idParam);
      const registro = this.homeService.getRegistroById(this.registroId);
      if (registro) {
        this.form.patchValue(registro);
      }
    }
  }

  guardar(): void {
    if (this.form.invalid) return;

    const registro: Registro = {
      ...this.form.value,
      id: this.editando ? this.registroId : Date.now()
    };

 

    if (this.editando) {
//Actualizar en LocalStorage
      this.homeService.updateRegistro(registro);
    } else {
//Guarda en LocalStorage
      this.homeService.addRegistro(registro);
    }

    this.router.navigate(['/home']);
  }
//Cancelar
  cancelar(): void {
    this.router.navigate(['/home']);
  }
}
