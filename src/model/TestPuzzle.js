const puzzleInformation_2_4 = 
{
  "name": "WoodPuzzle 2x4",
  "board" : {
     "rows" : "2",
     "columns" : "4",
     "target" : "B",
     "destination" : {
       "row" : "3",
       "column" : "1"
     },
     "exit" : {
       "start"    : "1",
       "end"      : "2"
     },
     "finalMove" : "Down"
  },
  "pieces" : [
    { "label" : "1",
      "isWinner" : "red",
      "width" : "1",
      "height" : "1"
    },
    { "label" : "2",
      "isWinner" : "white",
      "width" : "1",
      "height" : "1"
    }, 
  ],
  "locations" : [
    { "piece" : "1",
      "location" : {
         "row"    : "0", 
         "column" : "0" 
      }
    },
    { "piece" : "2",
      "location" : {
         "row"    : "0", 
         "column" : "1" 
      }
    },
  ]
};
export { puzzleInformation_2_4 };