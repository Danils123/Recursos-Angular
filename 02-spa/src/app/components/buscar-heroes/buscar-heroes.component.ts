import { Component, OnInit } from '@angular/core';
import { Heroe, HeroesService } from '../servicios/heroes.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-buscar-heroes',
  templateUrl: './buscar-heroes.component.html',
  styles: []
})
export class BuscarHeroesComponent implements OnInit {

  heroes: Heroe[] = [];
  termino = '';

  constructor(private _heroeService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router ) {
    this.activatedRoute.params.subscribe( params =>  {
      this.termino = params['termino'];
      this.heroes = this._heroeService.buscarHeroes(params['termino']);
      console.log(this.heroes);
    });
  }

  ngOnInit() {
  }

  verHeroe( idx: number) {
    this.router.navigate(['/heroe', idx]);
  }
}
