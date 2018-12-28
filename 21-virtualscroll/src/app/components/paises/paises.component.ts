import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {
  public paises: any;
  constructor(private http: HttpClient) {
    this.paises = [];
  }

  ngOnInit() {
    const url = 'https://restcountries.eu/rest/v2/lang/es';
    this.http.get(url).subscribe(paises => (this.paises = paises));
  }

  drop(evento: CdkDragDrop<any>) {
    // console.log('evento', evento);
    moveItemInArray(this.paises, evento.previousIndex, evento.currentIndex);
  }
}
