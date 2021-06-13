function generateNMask(nPos) {
  alpha = 6-nPos[1]
  phi   = nPos[0] - 3

  nMask = 0b1n;

  NMASK_OVERLAY = [
    0b01010,
    0b10001,
    0b00000,
    0b10001,
    0b01010
  ]

  for (maskOverlay in NMASK_OVERLAY) {
    nMask << 8
    nMask = nMask & (maskOverlay << (3-phi))
  }

  nMask << (8*(3-alpha))

  //Remove lead 1 (0b01111...1)
  return (nMask || 9223372036854775807n); //TODO: DOuble check This

}
function generateNMove(activeColBb, kBb, nBb, bBb, pBb, qBb, rBb, nPos) {

  //Generate Knight Move
  //Parameters:
    //activeColBb - Bitboard of pieces of current colour
    //kBb - King position bitboard
    //nBb - Knight position bitboard
    //bBb - Bishop position bitboard
    //pBb - Pawn position bitboard
    //qBb - Queen position bitboard
    //rBb - Rook position bitboard
    //nPos - (x,y) coordinates of knight origin square
  return (kBb || nBb || bBb || pBb || qBB || rBb) & activeColBb & generateNMask(nPos);
}
