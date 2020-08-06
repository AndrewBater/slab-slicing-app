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
  allowRotation: boolean;
  slabCount = 1;

  constructor() { }

  get slabHeight() : number {
    return this.slabCount * (this.slab.height + 10);
  }

  get slabNumber() : any[] {
    return Array.from(Array(this.slabCount),(x,i)=>i);
  }

  getSpacerHeight(location: number) : number {
    return ((this.slab.height + 10) * (location + 1)) - 10;
  }

  ngOnInit() {
    this.setupSquareModel();
  }

  setupStandardModel() {
    if (this.slab == undefined)
      this.slab = new SizeModel(3040 ,1400);
    this.pieces = new Array();
    let piece1 = new SizeModel(2500, 600);
    let piece2 = new SizeModel(1500, 600);
    let piece3 = new SizeModel(600, 600);
    let piece4 = new SizeModel(600, 100);
    let piece5 = new SizeModel(2500, 100);
    let piece6 = new SizeModel(1800, 900);
    let piece7 = new SizeModel(1500, 100);
    let piece8 = new SizeModel(1200, 100);
    this.pieces = [piece1, piece2, piece3, piece4, piece5, piece6, piece7, piece8];
  }

  setupSquareModel() {
    if (this.slab == undefined)
      this.slab = new SizeModel(101 ,101);
    this.pieces = new Array();
    let piece1 = new SizeModel(100, 100);
    this.pieces = [piece1];
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
    slicingLogic.allowRotation = this.allowRotation;
    this.slabCount = slicingLogic.sizeLeftSort();
  }

  updateSlabSize(a: any) {

  }
}