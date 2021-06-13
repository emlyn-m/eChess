function generateKMask(kPos) {

  alpha = 7-nPos[1];
  phi = nPos[0] - 2;

  kMask = 0b1n;

  KMASK_OVERLAY = [
    0b111,
    0b101,
    0b111
  ]

  for (maskOverlay in KMASK_OVERLAY) {
    kMask << 8;
    kMask = (kMask || (maskOverlay << phi));
  }

  kMask << (8*alpha)

}

function generateKMove(activeColBb, kBb, nBb, bBb, pBb, qBb, rBb, kPos) {
  //Generate King Move
  //Parameters:
    //activeColBb - Bitboard of pieces of current colour
    //kBb - King position bitboard
    //nBb - Knight position bitboard
    //bBb - Bishop position bitboard
    //pBb - Pawn position bitboard
    //qBb - Queen position bitboard
    //rBb - Rook position bitboard
    //kPos - (x,y) coordinates of king origin square
}
