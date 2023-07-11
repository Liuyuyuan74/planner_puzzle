import React from 'react';
import './App.css';
import { layout } from './Layout.js';

import Model, { Piece} from './model/Model.js';
import { redrawCanvas } from './boundary/Boundary.js'

import { puzzleInformation_2_4, puzzleInformation_4_8, puzzleInformation_8_8 } from './model/Puzzle.js'; 
import { selectPiece, movePiece, chooseConfiguration, resetPuzzle} from './controller/Controller.js';

import { Up, Down, Left, Right } from './model/Model.js';

var actualPuzzle = JSON.parse(JSON.stringify(puzzleInformation_2_4));   // parses string into JSON object, used below.

function App() {
  // initial instantiation of the Model
  const [model, setModel] = React.useState(new Model(actualPuzzle));

  const appRef = React.useRef(null);      // Later need to be able to refer to App 
  const canvasRef = React.useRef(null);   // Later need to be able to refer to Canvas

  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect (() => {
    
    /** Happens once. */
    redrawCanvas(model, canvasRef.current, appRef.current);
  }, [model])   // this second argument is CRITICAL, since it declares when to refresh (whenever Model changes)

  const handleClick = (e) => {
    console.log(e.screenX, e.screenY, e.clientX, e.clientY)
    // ^^^^^ useful for logging specific events for testing purposes
    let newModel = selectPiece(model, canvasRef.current, e);
    setModel(newModel);   // react to changes, if model has changed.
  }

  const movePieceHandler = (direction) => {
    let newModel = movePiece(model, direction);
    setModel(newModel);   // react to changes, if model has changed.
  }

  const resetHandler = (e) => {
    let newModel =new Model(chooseConfiguration(resetPuzzle(model)));
    setModel(newModel);
  }

  const chooseConfigurationHandler = (configName) =>{
    let newModel =new Model(chooseConfiguration(configName));
    setModel(newModel);
  }


  return (
    <main style={layout.Appmain} ref={appRef}>
      <canvas tabIndex="1"  
        data-testid="canvas"
        className="App-canvas"
        ref={canvasRef}
        width={layout.canvas.width}
        height={layout.canvas.height}
        onClick={handleClick} 
        />

        {/* Using '?' construct is proper React way to make image visible only when victorious. */}  
        { model.isVictorious() ? (<label data-testid="victory-label" style={layout.victory}>You've Won!"</label>) : null }

        <label data-testid="moves-label" style={layout.text}>{"number moves: " + model.numMoves}</label>
        <label data = "extend-label" style={layout.extend_label}>{Piece.extend_order}</label>

        
        <div style={layout.buttons}>
           <button data-testid="upbutton" style={layout.upbutton}     onClick={(e) => movePieceHandler(Up)} disabled={!model.available(Up)}       >^</button>
           <button data-testid="leftbutton" style={layout.leftbutton}   onClick={(e) => movePieceHandler(Left)} disabled={!model.available(Left)}   >&lt;</button>
           <button data-testid="rightbutton" style={layout.rightbutton}  onClick={(e) => movePieceHandler(Right)} disabled={!model.available(Right)} >&gt;</button>
           <button data-testid="downbutton" style={layout.downbutton}   onClick={(e) => movePieceHandler(Down)} disabled={!model.available(Down)}  >v</button>
           <button data-testid="level1button" style={layout.level1button} onClick={(e) => chooseConfigurationHandler(puzzleInformation_2_4)} >level1</button>
           <button data-testid="level2button" style={layout.level2button} onClick={(e) => chooseConfigurationHandler(puzzleInformation_4_8)} >level2</button>
           <button data-testid="level3button" style={layout.level3button} onClick={(e) => chooseConfigurationHandler(puzzleInformation_8_8)} >level3</button>
           <button data-testid="resetbutton" style={layout.resetbutton} onClick={(e) => resetHandler()} >reset</button> 
           
           {/* <button style={layout.level1button} >level1</button>
           <button style={layout.level2button} >level2</button>
           <button style={layout.level3button} >level3</button>
           <button style={layout.resetbutton} >reset</button> */}
        </div>
    </main>
  );
}

export default App;
