import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Model from './model/Model.js';
import App from './App';

// default puzzle to use
import { puzzleInformation_2_4, puzzleInformation_4_8, puzzleInformation_8_8 } from './model/Puzzle.js'; 
import { Up, Down, Left, Right } from './model/Model.js';
import { movePiece } from './controller/Controller.js';

import { puzzleInformation_2_4 as testInformation } from './model/TestPuzzle.js'; 

var actualPuzzle = JSON.parse(JSON.stringify(puzzleInformation_2_4));   // parses string into JSON object, used below.

test('No moves when model created', () => {
  var model = new Model(actualPuzzle);

  expect(model.numMoves).toBe(0)
});

test('Properly renders 0 moves', () => {
  const { getByText } = render(<App />);
  const movesElement = getByText(/number moves: 0/i);
  expect(movesElement).toBeInTheDocument();
});

test('Access GUI', () => {
  const { getByText } = render(<App />);

  const leftButton = screen.getByTestId('leftbutton');
  const rightButton = screen.getByTestId('rightbutton');
  const canvasElement = screen.getByTestId('canvas');

  // initially, this button
  expect(leftButton.disabled).toBeTruthy()
  expect(rightButton.disabled).toBeTruthy()


  // where I click the mouse and this enables some of the buttons
  // 25 125 25 22
  fireEvent.click(canvasElement, { screenX: 25, screenY: 125, clientX:25, clientY: 22} )

  // now this button is NOT disabled
  expect(leftButton.disabled).toBeTruthy()
  expect(rightButton.disabled).toBeFalsy()

   // make a left move
   fireEvent.click(leftButton);

   // no longer can go further left.
   expect(leftButton.disabled).toBeTruthy()

  const resetButton = screen.getByTestId('resetbutton');
  expect(leftButton.disabled).toBeTruthy()
  fireEvent.click(resetButton);

  const level3Button = screen.getByTestId('level3button');
  fireEvent.click(level3Button);
  expect(leftButton.disabled).toBeTruthy()

  const level2Button = screen.getByTestId('level2button');
  fireEvent.click(level2Button);
  expect(leftButton.disabled).toBeTruthy()

  expect(leftButton.disabled).toBeTruthy()


   const movesElement = getByText(/number moves: 0/i);
   expect(movesElement).toBeInTheDocument();
});

test('First valid moves', () => {
  var model = new Model(actualPuzzle);
  var piece1 = model.puzzle.pieces.find(p => p.label === '1')
  model.puzzle.select(piece1)
  expect(model.puzzle.selected).toBe(piece1)

  // now what moves are available? only left and right
  expect(model.available(Left)).toBe(false)
  expect(model.available(Right)).toBe(true)
  expect(model.available(Up)).toBe(false)
  expect(model.available(Down)).toBe(true)

  let newmodelr = movePiece(model, Right);
  expect(piece1.column).toBe(0)    

  var piece3_1 = newmodelr.puzzle.pieces.find(p => p.label === '3')
  newmodelr.puzzle.select(piece3_1)
  expect(newmodelr.puzzle.selected).toBe(piece3_1)
  expect(newmodelr.available(Left)).toBe(false)


});


describe('Separately define a new suite', () => {
  test('Test puzzle', () => {
    expect(testInformation).toBeTruthy()
  });
});

test('extend', () => {
  const { getByText } = render(<App />);
  const canvasElement = screen.getByTestId('canvas');
  const leftButton = screen.getByTestId('leftbutton');

  var model = new Model(actualPuzzle);
  var color = model.puzzle.pieces.find(p => p.label === '5')
  expect(color.isWinner).toBe("white")

  fireEvent.click(canvasElement, { screenX: 25, screenY: 125, clientX:25, clientY: 22} )
  fireEvent.click(leftButton );

  expect(color.isWinner).toBe("white")
});
