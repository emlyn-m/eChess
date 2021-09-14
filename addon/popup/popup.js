// import {Stockfish} from "./stockfish.js";

function listenForClicks() {
  document.addEventListener("click", (e) => {

    function reportError(err) {
      console.error(`Error: ${err}`)
    }
  });

  //Option selector
  let childOptions = document.getElementById("options").children;
  for (var i=0; i < childOptions.length; i++) {
    childOptions[i].addEventListener("click", (e) => {
      let siblings = document.getElementById("options").children;
      for (var j=0; j < siblings.length; j++) {
        siblings[j].classList.remove("selected");
      }
      e.currentTarget.classList.add("selected")
    });
  }

  //Theme selectors
  document.getElementById("themeNeg").addEventListener("click", async (e) => {
    let currTheme = (await browser.storage.local.get("active-theme"))["active-theme"];
    let themeList = (await browser.storage.local.get("theme-list"))["theme-list"];

    let themeIdx = themeList.indexOf(currTheme)+1 || 1;
    themeIdx -= 1
    currTheme = themeList[(themeIdx-1)%themeList.length]; //TODO: Modulo bug ((this%n)+n)%n;

    browser.storage.local.set({"active-theme": currTheme});

    document.getElementById("theme").children[1].innerText = currTheme;
  });

  document.getElementById("themePos").addEventListener("click", async (e) => {
    let currTheme = (await browser.storage.local.get("active-theme"))["active-theme"];
    let themeList = (await browser.storage.local.get("theme-list"))["theme-list"];

    let themeIdx = themeList.indexOf(currTheme)+1 || 1;
    themeIdx -= 1
    currTheme = themeList[(themeIdx+1)%themeList.length];

    browser.storage.local.set({"active-theme": currTheme});

    document.getElementById("theme").children[1].innerText = currTheme;
  });
}

async function uiInitialize(pgnData) {

  let dataSplit = pgnData.replaceAll('[', '').split(']');


  let date = dataSplit[2].substring(6).replaceAll('\"', '');

  let whiteName = dataSplit[4].substring(7).replaceAll('\"', '');
  let whiteElo  = dataSplit[8].substring(10).replaceAll('\"', '');
  document.getElementById("playerInfo").children[0].children[0].innerText = whiteName;
  document.getElementById("playerInfo").children[0].children[2].innerText = whiteElo;

  let blackName = dataSplit[5].substring(7).replaceAll('\"', '');
  let blackElo  = dataSplit[9].substring(10).replaceAll('\"', '');
  document.getElementById("playerInfo").children[1].children[0].innerText = blackName;
  document.getElementById("playerInfo").children[1].children[2].innerText = blackElo;

  let timeCtrl = dataSplit[7].substring(13, dataSplit[7].length-1);
  if (timeCtrl.includes(":")) {
    //Bonus time
    timeCtrl = (timeCtrl.split(":")[0]/60) + "|" + timeCtrl.split(":")[1];
  } else {
    timeCtrl = timeCtrl / 60 + " | 0";
  }

  //Color outline (Win/Loss)
  let winner = dataSplit[6].substring(8).indexOf(1) * 0.5;
  document.getElementById("playerInfo").children[winner].style["border-color"] = "#8de7bd";
  document.getElementById("playerInfo").children[1-winner].style["border-color"] = "#ff86b3";

  //Check Theme values exist
  if ((await browser.storage.local.get("theme-list"))[0] != "Classic") {
    browser.storage.local.set({
      "theme-list": ["Classic", "Theme2", "Theme3"]
    });
  }

  //Set Theme
  document.getElementById("theme").children[1].innerText = await browser.storage.local.get("active-theme")["active-theme"] || "Classic"

  setEval("0");
  setBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")

}

function setEval(advantage) {
  if (isNaN(advantage)) {
    //Forced Mate
    if (advantage.includes("-")) {
      //Forced Mate Black
      document.getElementById("eval-bar").children[0].style["height"] = "95%";
      document.getElementById("eval-bar").children[1].innerText = advantage;
      document.getElementById("eval-bar").children[2].innerText = "";
    } else {
      //Forced Mate White
      document.getElementById("eval-bar").children[0].style["height"] = "5%";
      document.getElementById("eval-bar").children[1].innerText = "";
      document.getElementById("eval-bar").children[2].innerText = advantage;
    }
  } else {
    if (advantage >= 0) { //NB: Max adv: pm9
      //Advantage white
      document.getElementById("eval-bar").children[0].style["height"] = (50 - (Math.min(advantage, 9) * 5)) + "%";
      document.getElementById("eval-bar").children[1].innerText = "";
      document.getElementById("eval-bar").children[2].innerText = "+" + Number(advantage).toFixed(2);
    } else {
      //Advantage black
      document.getElementById("eval-bar").children[0].style["height"] = (50 - (Math.max(advantage, -9) * 5)) + "%";
      document.getElementById("eval-bar").children[1].innerText = "";
      document.getElementById("eval-bar").children[2].innerText = Number(advantage).toFixed(2);
    }
  }
}

function setBoard(fenString) {
  const pieces = {
    K:"♔", Q:"♕", R:"♖", B:"♗", N:"♘", P:"♙",
    k:"♚", q:"♛", r:"♜", b:"♝", n:"♞", p:"♟",
  }

  let html = fenString
    .trim()
    .replace(/\s+.*/,"")
    .replace(/\d+/g, n => " ".repeat(n))
    .replace(/./g, char => "<td>" + (pieces[char] || char)) //Update piece values
    .replace(/^|<td>\//g,"\n  <tr>");
  html = html + "\n";
  document.getElementsByClassName("chess")[0].innerHTML = html;


}

// DEBUG BEGIN

uiInitialize('[Event "Live Chess - chess"]\
[Site "Chess.com"]\
[Date "2021.06.30"]\
[Round "?"]\
[White "alwb3"]\
[Black "itsemlyn"]\
[Result "1-0"]\
[TimeControl "60:3"]\
[WhiteElo "767"]\
[BlackElo "706"]\
[Termination "alwb3 won on time"]\
\
1. e4 d5 2. exd5 Qxd5 3. Nc3 Qa5 4. Nf3 c6 5. d3 Bg4 6. Bd2 Bxf3 7. Qxf3 Nf6 8.\
Ne4 Qh5 9. Qxh5 Nxh5 10. Be2 Nf4 11. Bxf4 f5 12. Ng3 Nd7 13. Nxf5 e6 14. Nd4 e5\
15. Bxe5 Nxe5 16. O-O Ng4 17. Bxg4 Bc5 18. Rfe1+ 1-0')

// DEBUG END

function moveText(sfCp, playerCp) {
  sfPWin =  2 / (1 + Math.exp(-0.004 * sfCp)) - 1;
  playerPWin = 2 / (1+Math.exp(-0.004 * playerCp)) - 1;

  delta = Math.abs(sfPWin - playerPWin);

  if (delta > 0.3) {
    return "Blunder";
  } else if (delta > 0.2) {
    return "Mistake";
  } else if (delta > 0.1) {
    return "Inaccuracy";
  } else {
    return "Good";
  }

}

function fenAnalysis(fenString) {
  //fenString: FEN String of current position

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

  //TODO: Call stockfish.js

}

function gameAnalysis(pgnString) {
  const engineCommands = {
    "initialize": "uci\nsetoption name Hash value ", //Suffixed by HashValue

    "readyAsk": "isready",
    "readyRes": "readyok",

    "newGameAnalyse": "ucinewgame\nsetoption name UCI_AnalyseMode value true",

    "loadPos": "position startpos moves", //Moves should begin with a space and be given in long algebraic notation
    "search": "go depth "//Suffixed by engine depth
  };

  //Engine constants
  const HashValue = 32;

}

browser.tabs.executeScript({file: "content.js"})
.then(listenForClicks);
