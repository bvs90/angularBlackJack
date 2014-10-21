describe('Player Factory', function() {
  beforeEach(module('app.player'));

  var Player,
      player;

  beforeEach(inject(function(_Player_) {
    Player = _Player_;
  }));

  beforeEach(function() {
    player = new Player();
  });

  it('should have a hand property initialized to an empty array', function() {
    expect(player.hand.length).toBe(0);
  });

  it('should have a score property initialized to null', function() {
    expect(player.score).toBeNull();
  });

  it('should have a bank property initialized to 100', function() {
    expect(player.bank).toBe(100);
  });

  it('should have a default bet initialized to 5', function() {
    expect(player.currentBet).toBe(5);
  });

});
