import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Heroe } from '../../interfaces/heroe.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { HeroeService } from '../../services/heroe.service';
import { RouterModule } from '@angular/router';
import Swal, { SweetAlertType } from 'sweetalert2';
@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit, DoCheck {
  heroe: Heroe = {
    nombre: '',
    bio: '',
    casa: 'Marvel'
  };

  isNuevo: boolean;
  id: string;

  constructor(
    private _heroeService: HeroeService,
    private router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isNuevo = true;
    this._activatedRoute.params.subscribe(parametros => {
      this.id = parametros['id'];
      if (this.id !== 'nuevo') {
        this.isNuevo = false;
        this._heroeService
          .geHeroe(this.id)
          .subscribe(heroe => (this.heroe = heroe));
      }
    });
  }

  ngDoCheck() {
    this.isNuevo = this.id !== 'nuevo' ? false : true;
  }

  guardar() {
    // console.log(this.heroe);

    if (this.id !== 'nuevo') {
      this._heroeService.actualizarHeroe(this.heroe, this.id).subscribe(
        data => {
          console.log(data);
          this.mensajeResultado('Se actualizó con éxito', 'success');
        },
        error => {
          console.error(error);
        }
      );
    } else {
      this._heroeService.nuevoHeroe(this.heroe).subscribe(
        data => {
          this.router.navigate(['/heroe', data.name]);
          this.mensajeResultado('Creación del heroe exisitosa', 'success');
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  agregarNuevo(forma: NgForm) {
    this.router.navigate(['/heroe', 'nuevo']);
    forma.reset({
      casa: 'Marvel'
    });
  }

  mensajeResultado(titulo: string, tipo: SweetAlertType) {
    Swal({
      type: 'success',
      title: titulo,
      showConfirmButton: false,
      timer: 1500
    });
  }
}
