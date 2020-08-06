import { SizeModel } from '../size/size.model';
import { empty } from 'rxjs';

export class SlicingLogic {
  public slab: SizeModel;
  public pieces: SizeModel[];
  public allowRotation: boolean;
  public showLog = false;
  public slabCount = 1;
  private slabSpacer = 10;

  constructor(pieces: SizeModel[], slab: SizeModel) {
    this.slab = slab;
    this.pieces = pieces;
  }

  sizeLeftSort() : number {
    let pieceList = this.pieces.sort((a, b) => b.area - a.area);
    let lastSortedPiece: SizeModel;

    // First set all pieces to unsorted. Sorted pieces are used in collision detection later on
    pieceList.forEach((obj) => {
      obj.sorted = false;
    });

    pieceList.forEach((obj) => {
      // if the piece is too big for a slab, put it to one side and leave it there
      if (this.pieceTooBig(obj)) {
        obj.x = this.slab.width + 10;
        return;
      }
      //fit the piece at the top left most corner
      let location = this.findTopLeftEmptySpace(obj);
      obj.x = location[0];
      obj.y = location[1];
      obj.sorted = true;
      lastSortedPiece = obj;
    });
    return this.slabCount;
  }

  pieceTooBig(piece: SizeModel) : boolean {
    return (piece.width > this.slab.width || piece.height > this.slab.height);
  }

  findTopLeftEmptySpace(piece: SizeModel) : [number, number] {
    // start at 0,0, check if empty
    let x = 0, y = 0;

    while(this.pieceNeedsToMove(piece, x, y)) {
      if (x == this.slab.width && y == this.slab.height) {
        x = 0;
        y = y + this.slabSpacer;
        let totalHeight = y;
        let newSlabCount = 1;
        while (totalHeight > this.slab.height) {
          totalHeight -= this.slab.height;
          newSlabCount++;
        }
        if (newSlabCount > this.slabCount)
          this.slabCount = newSlabCount;
      }
      else if (x < this.slab.width) {
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

  /*
  * Piece needs to move if it cannot fit in the given co-ordinate
  */
  pieceNeedsToMove(piece: SizeModel, x: number, y: number) : boolean {
    // to check if piece fits, we have 3 checks on the below line.
    let emptyCoord = this.isCoordinateEmpty(x,y);
    let pieceInSlab = this.isPieceInsideSlab(piece, x, y);
    let doesPieceOverlap = this.doesPositionOverlapSortedPieces(piece, x, y);
    let needsToMove = !emptyCoord || !pieceInSlab || doesPieceOverlap;
    // if it does fit, that return true
    if (needsToMove && !this.allowRotation) {
      return true;
    }
    // if it doesn't fit, try rotating the piece
    if (this.allowRotation) {
      let pieceW = piece.width;
      let pieceH = piece.height;
      piece.width = pieceH;
      piece.height = pieceW;

      // does it fit now that it is rotated?
      let rotatedAns = !this.isCoordinateEmpty(x, y) || !this.isPieceInsideSlab(piece, x, y) || this.doesPositionOverlapSortedPieces(piece, x, y);
      if (rotatedAns) {
        // if rotated piece doesn't fit, rotate it back again before returning false
        piece.width = pieceW;
        piece.height = pieceH;
        return true;
      }
    }
    return false;
  }

  /*
  * This checks if the current co-ordinate has any sorted pieces already
  */
  isCoordinateEmpty(x: number, y: number) : boolean {
    let pieces = this.pieces.filter(piece => piece.sorted === true);

    let isSpaceEmpty = true;

    pieces.forEach((obj) => {
      if ((x <= (obj.x + obj.width) && x >= obj.x && y <= (obj.y + obj.height) && y >= obj.y)) {
        isSpaceEmpty = false;
      }
    });
    return isSpaceEmpty;
  }

  /*
  * This checks is the piece was put in the current position, would it go off the end of the slab
  */
  isPieceInsideSlab(piece: SizeModel, x: number, y: number) : boolean {
    let pieceWidth = x + piece.width;
    let pieceHeight = (y + piece.height);
    let slabHeight = ((this.slab.height + this.slabSpacer) * this.slabCount) - this.slabSpacer;
    this.log("fitting piece to slab", piece, [pieceHeight, slabHeight]);

    if (pieceWidth > this.slab.width) {
      return false;
    } else if (pieceHeight > slabHeight) {
      return false;
    }
    // TODO: check for piece overlapping slab separators
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

  log(message: string, object?: any, other?: any) {
    if (this.showLog || (object  !== null && object.log === true)) {
      console.log(message, object, other);
    }
  }
}
