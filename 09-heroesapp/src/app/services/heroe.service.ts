import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Heroe } from '../interfaces/heroe.interface';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeroeService {
  heroesURL;

  constructor(private http: Http) {
    this.heroesURL = 'https://heroes-app-8d317.firebaseio.com/heroes';
  }

  nuevoHeroe(heroe: Heroe) {
    const body = JSON.stringify(heroe);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const url = `${this.heroesURL}.json`;

    return this.http.post(url, body, { headers }).pipe(
      map(res => {
        return res.json();
      })
    );
  }

  actualizarHeroe(heroe: Heroe, key$) {
    const body = JSON.stringify(heroe);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const url = `${this.heroesURL}/${key$}.json`;

    return this.http.put(url, body, { headers }).pipe(
      map(res => {
        return res.json();
      })
    );
  }

  geHeroe(key$: string) {
    const url = `${this.heroesURL}/${key$}.json`;
    return this.http.get(url).pipe(map(res => res.json()));
  }

  geHeroes() {
    const url = `${this.heroesURL}.json`;
    return this.http.get(url).pipe(map(res => res.json()));
  }

  borrarHeroe(key$: string) {
    const url = `${this.heroesURL}/${key$}.json`;
    return this.http.delete(url).pipe(map(res => res.json()));
  }
}
