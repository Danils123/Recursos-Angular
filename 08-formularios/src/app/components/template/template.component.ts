import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: []
})
export class TemplateComponent {
  private usuario: Object = {
    nombre: 'Daniel',
    apellido: null,
    correo: undefined,
    pais: 'CND',
    sexo: 'Mujer',
    acepta: true
  };

  private paises = [
    {
      codigo: 'CRI',
      nombre: 'Costa Rica'
    },
    {
      codigo: 'ESP',
      nombre: 'España'
    },
    {
      codigo: 'USA',
      nombre: 'Estados Unidos'
    },
    {
      codigo: 'CND',
      nombre: 'Canada'
    }
  ];

  private sexos = ['Hombre', 'Mujer'];
  constructor() {}

  private guardar(forma: NgForm) {
    console.log('Formulario posteado');
    console.log('ngForm', forma);
    console.log('Valor:', forma.value);
  }
}
