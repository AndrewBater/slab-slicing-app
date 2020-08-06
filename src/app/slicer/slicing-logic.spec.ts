import { SlicingLogic } from './slicing-logic';
import { SizeModel } from '../size/size.model';

describe('SlicingLogic', () => {
  let logic: SlicingLogic;

  beforeEach(() => {
    if (logic !== undefined) logic.showLog = false;
  });

  it('should create an instance', () => {
    expect(new SlicingLogic(null, null)).toBeTruthy();
  });

  it('should make default selection fit space correctly', () => {
    // arrange
    let slab = new SizeModel(3040, 1400);
    let piece1 = new SizeModel(2500, 600);
    let piece2 = new SizeModel(1500, 600);
    let piece3 = new SizeModel(600, 600);
    let piece4 = new SizeModel(600, 100);
    let piece5 = new SizeModel(2500, 100);
    logic = new SlicingLogic([piece1, piece2, piece3, piece4, piece5], slab);
    logic.allowRotation = false;

    // act
    logic.sizeLeftSort();

    // assert
    expect(piece5.x).toBe(0);
    expect(piece5.y).toBe(1202)
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

  it('should rotate piece if it does not fit', () => {
    // arrange
    let slab = new SizeModel(500,100);
    let piece = new SizeModel(5, 300);
    logic = new SlicingLogic([piece], slab);
    logic.allowRotation = true;

    // act
    let result = logic.pieceNeedsToMove(piece, 0,0);

    // assert
    expect(result).toBe(false);
    let finishedPiece = logic.pieces[0];
    expect(finishedPiece.width).toBe(300);
    expect(finishedPiece.height).toBe(5);
  });

  it('should put piece onto second slab when there is no room on first slab', () => {
    // arrange
    let slab = new SizeModel(500,500);
    let piece1 = new SizeModel(500,500);
    let piece2 = new SizeModel(500,500);
    logic = new SlicingLogic([piece1, piece2], slab);

    // act
    logic.sizeLeftSort();

    // assert
    expect(piece1.sorted).toBe(true);
    expect(piece1.x).toBe(0);
    expect(piece1.y).toBe(0);
    expect(piece2.sorted).toBe(true);
    expect(piece2.x).toBe(0);
    expect(piece2.y).toBe(510);
  });

  it('should put two pieces onto second slab when first slab is full', () => {
    // arrange
    let slab = new SizeModel(10,10);
    let piece1 = new SizeModel(9,9);
    let piece2 = new SizeModel(5,4);
    let piece3 = new SizeModel(5,4);
    logic = new SlicingLogic([piece1, piece2, piece3], slab);

    // act
    let result = logic.sizeLeftSort();

    // assert
    expect(result).toBe(2);
    expect(piece1.sorted).toBe(true);
    expect(piece1.x).toBe(0);
    expect(piece1.y).toBe(0);
    expect(piece2.sorted).toBe(true);
    expect(piece2.x).toBe(0);
    expect(piece2.y).toBe(20);
    expect(piece3.sorted).toBe(true);
    expect(piece3.x).toBe(5);
    expect(piece3.y).toBe(20)
  });

  it('should know if piece is inside any slab', () => {
    // arrange
    let slab = new SizeModel(100, 100);
    let piece1 = new SizeModel(90,90);
    logic = new SlicingLogic([piece1], slab);
    logic.showLog = true;
    logic.slabCount = 3;

    // act
    let result1 = logic.isPieceInsideSlab(piece1, 0,0);
    let result2 = logic.isPieceInsideSlab(piece1, 0,100);
    let result3 = logic.isPieceInsideSlab(piece1, 5,222);

    // assert
    expect(result1).toBe(true);
    expect(result2).toBe(false);
    expect(result3).toBe(true);
  })

  it('should spread pieces out to multiple slabs', () => {
    // arrange
    let slab = new SizeModel(10,10);
    let piece1 = new SizeModel(9,9);
    let piece2 = new SizeModel(9,9);
    let piece3 = new SizeModel(9,9);
    let piece4 = new SizeModel(9,9);
    logic = new SlicingLogic([piece1, piece2, piece3, piece4], slab);

    // act
    //let result = logic.sizeLeftSort();

    // assert
    //expect(result).toBe(4);
  });

  it('should detect if a piece is too big for the slab', () => {
    // arrange
    let slab = new SizeModel(100, 100);
    let piece1 = new SizeModel(100,100);
    let piece2 = new SizeModel(101,5);
    let piece3 = new SizeModel(5,101);
    logic = new SlicingLogic([piece1, piece2], slab);

    // act
    let result1 = logic.pieceTooBig(piece1);
    let result2 = logic.pieceTooBig(piece2);
    let result3 = logic.pieceTooBig(piece3);

    // assert
    expect(result1).toBe(false);
    expect(result2).toBe(true);
    expect(result3).toBe(true);
  });
});
