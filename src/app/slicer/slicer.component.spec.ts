import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlicerComponent } from './slicer.component';
import { SizeModel } from '../size/size.model';
import { SizeComponent } from '../size/size.component';
import { SlabComponent } from '../slab/slab.component';
import { PiecesComponent } from '../pieces/pieces.component';
import { FormsModule } from '@angular/forms';

describe('SlicerComponent', () => {
  let component: SlicerComponent;
  let fixture: ComponentFixture<SlicerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ SlicerComponent, SizeComponent, SlabComponent, PiecesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlicerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detect overlaps', () => {
    // arrange
    let piece1 = new SizeModel(5, 20);
    piece1.x = 5;
    piece1.y = 0;
    piece1.sorted = true;
    let piece2 = new SizeModel(6, 6);
    let piece3 = new SizeModel(10, 2);
    piece3.x = 5;
    piece3.y = 0;

    // act
    let result1 = component.doPiecesOverlap(piece1, piece2);
    let result2 = component.doPiecesOverlap(piece1, piece3);
    let result3 = component.doPiecesOverlap(piece2, piece3);

    // assert
    expect(result1).toBe(true);
    expect(result2).toBe(true);
    expect(result3).toBe(true);
  });

  it('should return true for overlaps', () => {
    // arrange
    let piece1 = new SizeModel(100, 30);
    piece1.sorted = true;
    let piece2 = new SizeModel(100, 30);
    piece2.x = 101;
    let slab = new SizeModel(300, 100);
    component.pieces.push(piece1);
    component.pieces.push(piece2);
    component.slab = slab;

    // act
    let result1 = component.doesPositionOverlapSortedPieces(piece2,0,0);
    let result2 = component.doesPositionOverlapSortedPieces(piece2, 200,200);

    // assert
    expect(result1).toBe(true);
    expect(result2).toBe(false);
  });

  it('should not have overlaps when no pieces exist', () => {
    // arrange

    // act
    var result = component.doesPositionOverlapSortedPieces(new SizeModel(1,1),0,0);

    // assert
    expect(result).toBe(false);
  });

  it('should position pieces', () => {
    // arrange
    let piece1 = new SizeModel(100, 30);
    let piece2 = new SizeModel(100, 30);
    let piece3 = new SizeModel(100, 30);
    let slab = new SizeModel(300, 100);
    component.pieces.push(piece1);
    component.pieces.push(piece2);
    component.pieces.push(piece3);
    component.slab = slab;

    // act
    component.sizeLeftSort();

    // assert
    expect(piece1.x).toBe(0);
    expect(piece1.x).toBe(0);
    expect(piece2.x).toBe(101);
    expect(piece2.y).toBe(0);
  });
});
