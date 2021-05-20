const eChessApiUrl = "https://chess.emlyn.xyz/api/analyse"

function listenForClicks() {
  document.addEventListener("click", (e) => {
    //TODO: Get pgn from active tab

    function reportError(err) {
      console.error(`Error: ${err}`)
    }
  })
}

function sanToUci(sanArr) {
  whiteMove = true //Boolean : True - White, False - Black

  boardState = [
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["r", "n", "b", "q", "k", "b", "n", "r"]
  ] //Top Left (0, 0) = A8
  //TODO: Look into using bitboards

  uciArray = [];

  for (move in sanArr) {
    newMove = move.replace('x', '')
    destSq = newMove.slice(-2)

    uciMove = ""

    if (newMove == "O-O") {
      uciMove = `e${whiteMove*-7+8}h${whiteMove*-7+8}`
    } else if (newMove = "O-O-O") {
      uciMove = `e${whiteMove*-7+8}a${whiteMove*-7+8}`
    } else {

      if (isPawnMove) {

        //Check for promotion
        switch(newMove.length) {
          case 5:
            //Capture and promotion
          case 4:
            //No capture, promotion
            uciMove = newMove.charAt(0)+(newMove.charAt(1)-1)+newMove; //Prepend former square
            uciMove = uciMove.replace("=", "").toLowerCase();

            //TODO: Update board state

            break;
          case 3:
            //Capture, no promotion
          case 2:
            //No capture or promotion
        }

      } else {

        switch (newMove.length) {
          case 5:
            //TODO: Update board state
            uciMove = newMove.slice(-4);
            break;
          case 4:
            //TODO: Stuff
            break;
          case 3:
            //TODO: Stuff
        }

      }

    }

    uciArray.push(uciMove);
    whiteMove = !(whiteMove);
  }
}
