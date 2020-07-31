import { Component, OnInit, Input } from '@angular/core';
import { SizeModel } from '../size/size.model';

@Component({
  selector: 'app-pieces',
  templateUrl: './pieces.component.html',
  styleUrls: ['./pieces.component.sass']
})
export class PiecesComponent implements OnInit {
  @Input() pieces: SizeModel[];

  constructor() { }

  ngOnInit() {
  }

  addPiece() {
    let height = Math.floor(Math.random() * Math.floor(50)) * 10;
    let width = Math.floor(Math.random() * Math.floor(20)) * 10;
    this.pieces.push(new SizeModel(width, height));
  }
}
