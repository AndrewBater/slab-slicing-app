import { SlicingLogic } from './slicing-logic';
import { SizeModel } from '../size/size.model';

describe('SlicingLogic', () => {
  let logic: SlicingLogic;

  it('should create an instance', () => {
    expect(new SlicingLogic(null, null)).toBeTruthy();
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
    logic = new SlicingLogic([piece1, piece2, piece3], null);

    // act
    let result1 = logic.doPiecesOverlap(piece1, piece2);
    let result2 = logic.doPiecesOverlap(piece1, piece3);
    let result3 = logic.doPiecesOverlap(piece2, piece3);

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
    logic = new SlicingLogic([piece1, piece2], slab);

    // act
    let result1 = logic.doesPositionOverlapSortedPieces(piece2,0,0);
    let result2 = logic.doesPositionOverlapSortedPieces(piece2, 200,200);

    // assert
    expect(result1).toBe(true);
    expect(result2).toBe(false);
  });

  it('should not have overlaps when no pieces exist', () => {
    // arrange
    logic = new SlicingLogic([], null);

    // act
    var result = logic.doesPositionOverlapSortedPieces(new SizeModel(1,1),0,0);

    // assert
    expect(result).toBe(false);
  });

  it('should position pieces', () => {
    // arrange
    let piece1 = new SizeModel(100, 30);
    let piece2 = new SizeModel(100, 30);
    let piece3 = new SizeModel(100, 30);
    let slab = new SizeModel(300, 100);
    logic = new SlicingLogic([piece1, piece2, piece3], slab);

    // act
    logic.sizeLeftSort();

    // assert
    expect(piece1.x).toBe(0);
    expect(piece1.x).toBe(0);
    expect(piece2.x).toBe(101);
    expect(piece2.y).toBe(0);
  });

});
