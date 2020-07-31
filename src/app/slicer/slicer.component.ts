import { Component, OnInit } from '@angular/core';
import { SizeModel } from '../size/size.model';
import { observable } from 'rxjs';

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

  updateSlabSize(event) {
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

  sizeLeftSort() : void {
    let pieceList = this.pieces.sort((a, b) => b.area - a.area);
    let lastSortedPiece: SizeModel;

    pieceList.forEach((obj) => {
      obj.sorted = false;
    });

    pieceList.forEach((obj) => {
      //fit the piece at the top left most corner
      let location = this.findTopLeftEmptySpace(obj);
      obj.x = location[0];
      obj.y = location[1];
      obj.sorted = true;
      lastSortedPiece = obj;
    });
  }

  findTopLeftEmptySpace(piece: SizeModel) : [number, number] {
    // start at 0,0, check if empty
    let x = 0, y = 0;
    // if (lastSortedPiece != null) {
    //   x = lastSortedPiece.x + lastSortedPiece.width;
    //   y = lastSortedPiece.y;
    // }
    while(this.doesPieceFitPosition(piece, x, y)) {
      if (x == this.slab.width && y == this.slab.height)
        // need to add another slab
        break;
      if (x < this.slab.width)
        x++;
      else {
        x = 0;
        y++;
      }
    }
    return [x,y];
  }

  doesPieceFitPosition(piece: SizeModel, x: number, y: number) : boolean {
    //check if piece fits
    let ans = !this.isTopLeftEmpty(x, y) || !this.isPieceInsideSlab(piece, x, y) || this.doesPositionOverlapSortedPieces(piece, x, y);
    if (ans) return true;
    // check if rotated piece fits
    let pieceW = piece.width;
    let pieceH = piece.height;
    piece.width = pieceH;
    piece.height = pieceW;
    let rotatedAns = !this.isTopLeftEmpty(x, y) || !this.isPieceInsideSlab(piece, x, y) || this.doesPositionOverlapSortedPieces(piece, x, y);
    if (rotatedAns) return true;
    piece.width = pieceW;
    piece.height = pieceH;
    return false;
  }

  isTopLeftEmpty(x: number, y: number) : boolean {
    let pieces = this.pieces.filter(piece => piece.sorted === true);

    let isSpaceEmpty = true;

    pieces.forEach((obj) => {
      if (x <= (obj.x + obj.width) && x >= obj.x && y <= (obj.y + obj.height) && y >= obj.y)
        isSpaceEmpty = false;
    });
    return isSpaceEmpty;
  }

  isPieceInsideSlab(piece: SizeModel, x: number, y: number) : boolean {
    if (x + piece.width > this.slab.width)
      return false;
    if (y + piece.height > this.slab.height)
      return false;
    return true;
  }

  doesPositionOverlapSortedPieces(piece: SizeModel, x: number, y: number) : boolean {
    piece.x = x;
    piece.y = y;
    let anyOverlaps = false;
    let sortedPieces = this.pieces.filter(piece => piece.sorted === true);
    sortedPieces.forEach((obj) => {
      if (this.doPiecesOverlap(piece, obj)) {
        anyOverlaps = true;
      }
    });
    return anyOverlaps;
  }

  doPiecesOverlap(piece1: SizeModel, piece2: SizeModel) : boolean {
    return !(piece1.x + piece1.width < piece2.x || piece1.y + piece1.height < piece2.y || piece1.x > piece2.x + piece2.width || piece1.y > piece2.y + piece2.height);
  }
}