
/** Redraw entire canvas from model. */

// Scaling Constants for Canvas
var BOXSIZE = 50;
const OFFSET = 8;

/** Represents a rectangle. */
export class Rectangle {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }

    /** Does the (x,y) point exist within the rectangle. */
    contains(x, y) {
      return x >= this.x && x <= (this.x + this.width) && y >= this.y && y <= (this.y + this.height);
  }
}

/** Map piece into rectangle in puzzle view. */
export function computeRectangle(piece) {
    let c = piece.location();
    return new Rectangle(BOXSIZE*c.column + OFFSET, BOXSIZE*c.row + OFFSET, 
                         BOXSIZE*piece.width - 2*OFFSET, BOXSIZE*piece.height - 2*OFFSET);
  }

/** Draw puzzle. */
export function drawPuzzle (ctx, puzzle, showLabels) {
  
    ctx.shadowColor = 'black';
    
    let selected = puzzle.selected;
    
    puzzle.pieces.forEach(piece => {
        let rect = computeRectangle(piece);
        ctx.fillStyle = piece.isWinner;
        ctx.fillText(piece.extend_order,BOXSIZE*piece.column + OFFSET,BOXSIZE*piece.row + OFFSET);


        //ctx.shadowBlur = 10;
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    })

}

export function redrawCanvas(model, canvasObj, appObj) {
    const ctx = canvasObj.getContext('2d');
    if (ctx === null) { return; }    // here for testing purposes...
    
    // clear the canvas area before rendering the coordinates held in state
    ctx.clearRect( 0,0, canvasObj.width, canvasObj.height);  

    if (model.puzzle) { 
        drawPuzzle (ctx, model.puzzle, model.showLabels);
    }
}

