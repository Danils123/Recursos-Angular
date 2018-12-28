import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-virtual',
  templateUrl: './virtual.component.html',
  styleUrls: ['./virtual.component.css']
})
export class VirtualComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  public personas = Array(500).fill(0);
  constructor() {}

  ngOnInit() {}

  irFinal() {
    this.viewport.scrollToIndex(this.personas.length);
  }

  irInicio() {
    this.viewport.scrollToIndex(0);
  }
}
