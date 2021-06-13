function getPgn() {
  document.getElementsByClassName("download")[0].click();
  let pgn = document.getElementsByName("pgn").value;
  document.getElementsByClassName("share-menu-close")[0].children[0].click();
  return pgn;
}
