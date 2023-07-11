export class MoveType {
    constructor(dr, dc) {
        this.deltar = dr;
        this.deltac = dc;
    }
    
    static parse(s) {
        if ((s === "down")  || (s === "Down"))   {return Down; }
        if ((s === "up")    || (s === "Up"))     { return Up; }
        if ((s === "left")  || (s === "Left"))   { return Left; }
        if ((s === "right") || (s === "Right"))  { return Right; }
        
        return NoMove;
    }
}

export const Down = new MoveType(1, 0, "down");
export const Up = new MoveType(-1, 0, "up");
export const Left = new MoveType(0, -1, "left");
export const Right = new MoveType(0, 1, "right");
export const NoMove = new MoveType(0, 0, "*");  // no move is possible

// export class level{
//     constructor(level){
//         this.level=level
//     }
//     static parse(s) {
//         if ((s === "level1"))   { return level1; }
//         if ((s === "level1"))   { return level2; }
//         if ((s === "level1"))   { return level3; }        
//         return NoMove;
// }

// export const level1 = new MoveType(level1, "level1");
// export const level2 = new MoveType(level2, "level2");
// export const level3 = new MoveType(level3, "level3");

export class Coordinate {
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }
}
export class neighbor{
    constructor(row,column,available){
        this.row = row;
        this.column = column;
        this.available = available;
    }
}
export class Piece {
    constructor(w, h, isWinner, label, extend_order) {
        this.width = w;
        this.height = h;
        this.isWinner = isWinner;
        this.row = 0;
        this.column = 0;
        this.label = label;
        if (extend_order) {
            this.extend_order = extend_order;
        } else {
            this.extend_order = 0;
        }
    }
    
    place(row, col) {
        this.row = row;
        this.column = col;
    }
    
    move(direction) {
        this.row += direction.deltar;
        this.column += direction.deltac;
    }
    
    location() {
        return new Coordinate(this.row, this.column);
    }
    
    // return all coordinates for this piece
    *coordinates() {
        for (let r = 0; r < this.height; r++) {
            for (let c = 0; c < this.width; c++) {
                yield new Coordinate(this.row + r, this.column + c);
            } 
        }
    }
    
    // used for solving
    copy() {
        let p = new Piece(this.width, this.height, this.isWinner, this.label, this.extend_order);
        p.place(this.row, this.column);
        return p;
    }
}

export class Puzzle {
    
    constructor(numRows, numColumns, destination, finalMove) {
        this.numRows = numRows;
        this.numColumns = numColumns;
        this.destination = destination;
        this.finalMove = finalMove;
        this.selected = null;
        this.upNeighbor = null;
        this.downNeighbor = null;
        this.rightNeighbor = null;
        this.leftNeighbor = null;
        this.m = new Map();
    }

    initialize(pieces) {
        // make sure to create NEW Piece objects
        this.pieces = pieces.map(p => p.copy());
    }
    
    select(piece) {
        this.selected = piece;
    }
    
    isSelected(piece) {
        return piece === this.selected;
    }
    
    hasWon() {
        let a = 0;
        for (let p of this.pieces) {
            if (p.isWinner === "white"){
                a++; 
            }
        }
        console.log("a=",a);
        if (a === 0){
            return true;
        }
        else {return false;}
    }

    /** Determines if any piece in the puzzle covers given coordinate. */
    isCovered(coord,i) {
        for (let p of this.pieces) {
            // console.log(p.row + ' ' + p.column + ' ' + p.isWinner)
            if (p.row === coord.row && p.column === coord.column && p.isWinner === "white") {
                if(i === 0){this.upNeighbor = p;}
                if(i === 1){this.rightNeighbor = p;}
                if(i === 2){this.downNeighbor = p;}
                if(i === 3){this.leftNeighbor = p;}
                return true;
            }
        }
        return false;
    }

    availableMoves() {
        let p = this.selected;
        if (p == null) { return []; }

        // p.extend_order = this.m.get(p.label,p.lable.extend_order); 
        this.m.set(p.label,p.extend_order);
        console.log(this.m,"1");

        let moves = [];
        let coord = this.selected.location();

        let helper = [-1, 0, 1, 0, -1];
        let row = coord.row;
        let col = coord.column;
        // console.log(row + ' ' + col);
        let directs = [Up, Right, Down, Left];
        for (let i = 0; i < helper.length - 1; i++) {
            let new_row = row + helper[i];
            let new_col = col + helper[i + 1];
            if (this.isCovered(new Coordinate(new_row, new_col),i)) {
                // find corespond button and set it available
                moves.push(directs[i]);
            }
        }
        return moves;
    }

    clone() {
        let copy = new Puzzle(this.numRows, this.numColumns, this.destination, this.finalMove);
        copy.pieces = [];
        for (let p of this.pieces) {
            let dup = p.copy();
            copy.pieces.push(dup);
            if (p === this.selected) {
                copy.selected = dup;
            }
        }
        
        return copy;
    }
}

export default class Model {
    // info is going to be JSON-encoded puzzle
    constructor(info) {
        this.initialize(info);
        this.info = info;
    }
    
    initialize(info) {
        let numRows = parseInt(info.board.rows);
        let numColumns = parseInt(info.board.columns);
        let destination = new Coordinate(parseInt(info.board.destination.row), parseInt(info.board.destination.column))
        let finalMove = MoveType.parse(info.board.finalMove);
        
        var allPieces = [];
        for (let p of info.pieces) {
            allPieces.push(new Piece(parseInt(p.width), parseInt(p.height), (p.isWinner), p.label));
        }
        
        for (let loc of info.locations) {
            let coord = new Coordinate (parseInt(loc.location.row), parseInt(loc.location.column));
            
            let idx = allPieces.findIndex(piece => (piece.label === loc.piece));
            allPieces[idx].place(coord.row, coord.column);
        }
        
        this.puzzle = new Puzzle(numRows, numColumns, destination, finalMove)
        this.puzzle.initialize(allPieces);
        this.numMoves = 0;
        this.victory = false;
        
        this.showLabels = false;
    }
    
    updateMoveCount(delta) {
        this.numMoves += delta;
    }
    
    numberMoves() {
        return this.numMoves;
    }
    
    victorious() {
        this.victory = true;
    }
    
    isVictorious() {
        return this.victory;
    }

    available(direction) {
        // if no piece selected? Then none are available.
        if (!this.puzzle.selected) { return false; }
        if (direction === NoMove) { return false; }
        
        if (this.puzzle.selected.isWinner === "black" ) { return false; }

        // if the board has been extended
        let a = this.puzzle.selected;
        if (a.isWinner === "white") { return false; }
        for (let p of this.puzzle.pieces) {
            if (p.isWinner === a.isWinner && p.extend_order>a.extend_order){
                return false;
            }
        }

        let allMoves = this.puzzle.availableMoves();
        return allMoves.includes(direction);
    }
    
    copy() {
        let a = new Model(this.info);                 
        a.puzzle = this.puzzle.clone();
        a.puzzle.m = this.puzzle.m;
        // console.log(a.puzzle.m,this.puzzle.m);
        a.numMoves = this.numMoves;
        a.showLabels = this.showLabels;
        a.victory = this.victory;
        // a.puzzle.selected.extend_order = this.puzzle.selected.extend_order;
        // console.log(this.puzzle.selected.extend_order,"shunxu");
        return a;
    }
}