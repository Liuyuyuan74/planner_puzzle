import { computeRectangle } from '../boundary/Boundary.js';
import { Up, Down, Left, Right } from '../model/Model.js';
import { puzzleInformation_2_4, puzzleInformation_4_8, puzzleInformation_8_8 } from '../model/Puzzle.js'; 
export function selectPiece(model, canvas, event) {
    const canvasRect = canvas.getBoundingClientRect();

    // find piece on which mouse was clicked.
    let idx = model.puzzle.pieces.findIndex(piece => {
        let rect = computeRectangle(piece);
        return rect.contains(event.clientX - canvasRect.left, event.clientY - canvasRect.top);
    });

    let selected = null;
    if (idx >= 0) {
      selected = model.puzzle.pieces[idx];
    } 
    // select this piece! Construct new model to represent this situation.
    model.puzzle.select(selected);

    return model.copy();
}


export function movePiece(model, direction) {
    let selected = model.puzzle.selected;
    if (!selected) { return model; }

    if (direction === Up) {
        model.puzzle.upNeighbor.isWinner = selected.isWinner;
        selected.extend_order = model.puzzle.m.get(selected.label);
        model.puzzle.upNeighbor.extend_order = selected.extend_order+1;
        model.puzzle.m.set(model.puzzle.upNeighbor.label,model.puzzle.upNeighbor.extend_order);
    }
    if (direction === Left) {
        model.puzzle.leftNeighbor.isWinner = selected.isWinner;
        selected.extend_order = model.puzzle.m.get(selected.label);
        model.puzzle.leftNeighbor.extend_order = selected.extend_order+1;
        model.puzzle.m.set(model.puzzle.leftNeighbor.label,model.puzzle.leftNeighbor.extend_order);
    }
    if (direction === Down) {
        model.puzzle.downNeighbor.isWinner = selected.isWinner;
        selected.extend_order = model.puzzle.m.get(selected.label);
        model.puzzle.downNeighbor.extend_order = selected.extend_order+1;
        model.puzzle.m.set(model.puzzle.downNeighbor.label,model.puzzle.downNeighbor.extend_order);
        console.log(model.puzzle.downNeighbor.extend_order,model.puzzle.m.set);

    }
    if (direction === Right) {
        model.puzzle.rightNeighbor.isWinner = selected.isWinner;
        selected.extend_order = model.puzzle.m.get(selected.label);
        model.puzzle.rightNeighbor.extend_order = selected.extend_order+1;
        model.puzzle.m.set(model.puzzle.rightNeighbor.label,model.puzzle.rightNeighbor.extend_order);
    }

    if (model.puzzle.hasWon()) {
        model.victorious();
    }
    model.puzzle.hasWon();
    model.updateMoveCount(+1);
    return model.copy();
}

export function chooseConfiguration(configObject){
    var actualPuzzle = getActualPuzzle(configObject);
    // console.log("222",actualPuzzle,configObject);
    return actualPuzzle;
}

function transConfiguration(configName){
    if (configName === "WoodPuzzle 2x4") {return puzzleInformation_2_4; } 
    else if (configName === "WoodPuzzle 4x8") {return puzzleInformation_4_8;} 
    else {return puzzleInformation_8_8;}
}

export function resetPuzzle(model){
    let currentConfigName = model.info.name;
    console.log("111",typeof currentConfigName,typeof model.info.name)
    return transConfiguration(currentConfigName);
}

export function getActualPuzzle(configObject){
    return JSON.parse(JSON.stringify(configObject));
}