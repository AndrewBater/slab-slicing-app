import { SizeModel } from '../size/size.model';
import { VirtualTimeScheduler } from 'rxjs';

export class SlicingLogic {
  private slab: SizeModel;
  private pieces: SizeModel[];

  constructor(pieces: SizeModel[], slab: SizeModel) {
    this.slab = slab;
    this.pieces = pieces;
  }

  sizeLeftSort() : void {
    let pieceList = this.pieces.sort((a, b) => b.area - a.area);
    let lastSortedPiece: SizeModel;

    // First set all pieces to unsorted. Sorted pieces are used in collision detection later on
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

    while(this.doesPieceFitPosition(piece, x, y)) {
      if (x == this.slab.width && y == this.slab.height)
        // TODO: need to add another slab logic here
        break;
      if (x < this.slab.width) {
        // if there is still room in the x direction, add 1 to x and try again
        x++;
      } else {
        // if there is no more room in the x direction, move back to the beginning of the line and move 1 down and try again
        x = 0;
        y++;
      }
    }
    return [x,y];
  }

  doesPieceFitPosition(piece: SizeModel, x: number, y: number) : boolean {
    // to check if piece fits, we have 3 checks on the below line.
    let ans = !this.isTopLeftEmpty(x, y) || !this.isPieceInsideSlab(piece, x, y) || this.doesPositionOverlapSortedPieces(piece, x, y);
    // if it does fit, thatreturn true
    if (ans) return true;

    // if it doesn't fit, try rotating the piece
    let pieceW = piece.width;
    let pieceH = piece.height;
    piece.width = pieceH;
    piece.height = pieceW;

    // does it fit now that it is rotated?
    let rotatedAns = !this.isTopLeftEmpty(x, y) || !this.isPieceInsideSlab(piece, x, y) || this.doesPositionOverlapSortedPieces(piece, x, y);
    if (rotatedAns) return true;

    // if rotated piece doesn't fit, rotate it back again before returning false
    piece.width = pieceW;
    piece.height = pieceH;
    return false;
  }

  /*
  * This checks if the current co-ordinate has any sorted pieces already
  */
  isTopLeftEmpty(x: number, y: number) : boolean {
    let pieces = this.pieces.filter(piece => piece.sorted === true);

    let isSpaceEmpty = true;

    pieces.forEach((obj) => {
      if (x <= (obj.x + obj.width) && x >= obj.x && y <= (obj.y + obj.height) && y >= obj.y)
        isSpaceEmpty = false;
    });
    return isSpaceEmpty;
  }

  /*
  * This checks is the piece was put in the current position, would it go off the end of the slab
  */
  isPieceInsideSlab(piece: SizeModel, x: number, y: number) : boolean {
    if (x + piece.width > this.slab.width)
      return false;
    if (y + piece.height > this.slab.height)
      return false;
    return true;
  }

  /*
  * This checks if the piece was put in the co-ordinate, would it overlap any pieces that are already sorted
  */
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

  /*
  * helper method used to determine ovelap of 2 given pieces
  */
  doPiecesOverlap(piece1: SizeModel, piece2: SizeModel) : boolean {
    return !(piece1.x + piece1.width < piece2.x || piece1.y + piece1.height < piece2.y || piece1.x > piece2.x + piece2.width || piece1.y > piece2.y + piece2.height);
  }
}
