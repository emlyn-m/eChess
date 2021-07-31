const pieceImg = {
  K: ,
  Q: ,
  R: ,
  B: ,
  N: ,
  P: ,
  k: ,
  q: ,
  r: ,
  b: ,
  n: ,
  p:
};

function htmlGen(fenString) {

  html = fenString
    .trim()
    .replace(/\s+.*/,"")
    .replace(/\d+/g, n => " ".repeat(n))
    .replace(/./g, char => "<td>" + (pieceImg[char] || char))
    .replace(/^|<td>\//g,"\n  <tr>");

  html = "<table id=\"chess\">" + html + "\n</table>";

}
