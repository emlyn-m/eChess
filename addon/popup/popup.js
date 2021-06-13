const eChessApiUrl = "https://chess.emlyn.xyz/api/analyse"

function listenForClicks() {
  document.addEventListener("click", (e) => {
    //TODO: Get pgn from active tab

    function reportError(err) {
      console.error(`Error: ${err}`)
    }
  })
}

function pgnToUci(pgnStr) {

  }
}

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

function gameAnalysis() {
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
}
