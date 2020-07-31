import { Component, OnInit } from '@angular/core';
import { SizeModel } from '../size/size.model';
import { observable } from 'rxjs';
import { SlicingLogic } from './slicing-logic';

@Component({
  selector: 'app-slicer',
  templateUrl: './slicer.component.html',
  styleUrls: ['./slicer.component.sass']
})
export class SlicerComponent implements OnInit {
  slab: SizeModel;
  pieces: SizeModel[];

  constructor() { }

  ngOnInit() {
    if (this.slab == undefined)
      this.slab = new SizeModel(1270,740);
    this.pieces = new Array();
  }

  getPiecesArea() : number {
    let area = 0;
    this.pieces.forEach((obj) => {
      area += obj.area;
    })
    return area;
  }

  findMinimumSlices() : number {
    let pa = this.getPiecesArea();
    
    let slabs = 1;

    while (pa > (this.slab.area) * slabs) {
      slabs++;
    }
    return slabs;
  }

  sortPiecesOnSlab() {
    let slicingLogic = new SlicingLogic(this.pieces, this.slab);
    slicingLogic.sizeLeftSort();
  }
}