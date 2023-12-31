This is Yuyuan Liu's individual homework

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## What to do the first time

The first time you retrieve this code, you will need to install the react scripts to work properly. To do this, type:

`npm install react-scripts --save`

This is a one-time action for this project, which downloads and retrieves the necessary artifacts.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Code Coverage

```
To generate the code coverage, launch `npm test -- --coverage` which produces a file that contains a breakdown of 

 PASS  src/App.test.js
  √ No moves when model created (3 ms)
  √ Properly renders 0 moves (89 ms)
  √ Access GUI (174 ms)
  √ First valid moves (20 ms)
  √ extend (31 ms)
  Separately define a new suite
    √ Test puzzle (1 ms)

---------------------|---------|----------|---------|---------|----------------------------------------
File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
---------------------|---------|----------|---------|---------|----------------------------------------
All files            |   75.57 |    56.47 |   75.43 |   79.16 |
 src                 |      55 |    16.66 |      50 |      55 |
  App.js             |      75 |       50 |   57.14 |      75 | 37-38,71-75
  Layout.js          |     100 |      100 |     100 |     100 |
  index.js           |       0 |      100 |     100 |       0 | 7-17
  reportWebVitals.js |       0 |        0 |       0 |       0 | 1-8
 src/boundary        |   95.45 |       75 |     100 |     100 |
  Boundary.js        |   95.45 |       75 |     100 |     100 | 51-56
 src/controller      |   63.26 |    44.44 |     100 |   65.21 |
  Controller.js      |   63.26 |    44.44 |     100 |   65.21 | 29-32,35-38,41-45,56,71-72
 src/model           |   82.11 |    62.26 |   78.57 |   87.96 |
  Model.js           |   81.63 |    62.26 |   78.57 |   87.59 | 9-13,46-48,72-73,82-84,122,134,234-238
  Puzzle.js          |     100 |      100 |     100 |     100 |
  TestPuzzle.js      |     100 |      100 |     100 |     100 |
---------------------|---------|----------|---------|---------|----------------------------------------
Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        6.273 s
Ran all test suites.

If you don't see the above input, then set the environment variable "CI" to be true, something like `set CI=true`, then rerun the example.

# play game
You can expand the tablet on the original board, with given colors. Every color can only extend in one path. 
If you have extended all the empty board, then you will win.
If you can't extend remaining boared, then you will lose.
#   p l a n n e r _ p u z z l e  
 