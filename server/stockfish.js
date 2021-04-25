const engineCommands = {
  "initialize": "uci\nsetoption name Hash value "

  "readyAsk": "isready"
  "readyRes": "readyok"

  "newGameAnalyse": "ucinewgame\nsetoption name UCI_AnalyseMode value true"

  "loadPos": "position startpos moves" //Moves should begin with a space and be given in long algebraic notation
  "search": "go depth "
};

//Engine constants
const HashValue = 32;
const OpeningTablePath = ""; //TODO: Download ECO, implement ECO search

function moveAnalysis(move, engineTxt, preEngineTxt) {
  //Return values:
    //Book {OPENING}: Move is a book move from the opening OPENING
    //Missed: Move is a missed win
    //Best: Move is best move
    //Brilliant: Move is a brilliant move
    //Excellent: Move is an excellent move
    //Good: Move is a good move
    //Inaccuracy: Move is an inaccuracy
    //Mistake: Move is a mistake
    //Blunder: Move is a blunder

}

function pgnToMoves(pgnStr) {
  //TODO: Convert pgn to move array
}

function analyseGame(pgn, depth) {
  //TODO: Analyse game

  theoretical = true; //Whether game so far is found in ECO

  moves = pgnToMoves(pgn)

}
