import { Component, OnInit } from '@angular/core';
import { HeroeService } from '../../services/heroe.service';
import { Heroe } from '../../interfaces/heroe.interface';
import Swal from 'sweetalert2';
import { timeInterval } from 'rxjs/operators';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {
  heroes: any[] = [];
  loading: boolean;
  constructor(private _heroeService: HeroeService) {
    this.loading = true;
    this._heroeService.geHeroes().subscribe(data => {
      this.heroes = data;
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    });
  }

  ngOnInit() {}

  borrarHeroe(key$: string) {
    Swal({
      title: 'Estas seguro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#bd2130',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this._heroeService.borrarHeroe(key$).subscribe(respuesta => {
          if (respuesta) {
            console.log(respuesta);
          } else {
            delete this.heroes[key$];
            Swal('Deleted!', 'Your file has been deleted.', 'success');
          }
        });
      }
    });
  }
}
