import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validator,
  Validators,
  FormArray
} from '@angular/forms';
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {
  private forma: FormGroup;
  private usuario: Object = {
    nombreCompleto: {
      nombre: 'Daniel',
      apellido: 'Ramirez'
    },
    correo: 'barrientosd9@gmail.com',
    pasatiempos: ['Ir al gimnasio']
  };

  constructor() {
    this.forma = new FormGroup({
      nombreCompleto: new FormGroup({
        nombre: new FormControl('', [
          Validators.required,
          Validators.minLength(3)
        ]),
        apellido: new FormControl('', Validators.required)
      }),
      correo: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
      ]),
      pasatiempos: new FormArray([
        new FormControl('Correr', Validators.required)
      ]),
      username: new FormControl('', Validators.required, this.existeUsuario),
      password1: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required)
    });

    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind(this.forma)
    ]);

    // this.forma.valueChanges.subscribe(data => console.log(data));
    this.forma.controls['username'].valueChanges.subscribe(data =>
      console.log(data)
    );

    this.forma.controls['username'].statusChanges.subscribe(data =>
      console.log(data)
    );
    // this.forma.setValue(this.usuario);
  }

  private noIgual(control: FormControl): { [s: string]: boolean } {
    const forma: any = this;
    return control.value !== forma.controls['password1'].value
      ? { noiguales: true }
      : null;
  }

  private agregarPasatiempos() {
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }
  private guardarCambios() {
    console.log(this.forma);
    // this.forma.reset({
    //   nombreCompleto: {
    //     nombre: '',
    //     apellido: ''
    //   },
    //   correo: ''
    // });
  }

  private existeUsuario(control: FormControl): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'strider') {
          resolve({ existe: true });
        } else {
          resolve(null);
        }
      }, 3000);
    });
  }
}
