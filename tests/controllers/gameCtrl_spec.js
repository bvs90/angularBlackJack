describe('Game Controller', function() {
  var mockRound,
    mockDealer,
    mockHand,
    mockPlayer;

  mockRound = function() {
    return {
      dealRound: angular.noop,
      resolveHands: function() { return; }
    };
  };

  mockDealer = {
    dealOne: angular.noop,
    evaluateHand: angular.noop
  };

  mockHand = {
    makeScore: function() {
      return [22];
    }
  };

  mockPlayer = {
    hand: [],
    score: [11,21],
    currentBet: 10
  };

  beforeEach(module('app.gameCtrl'));

  beforeEach(inject(function($controller) {
    gameCtrl = $controller('GameCtrl', {
      Dealer: mockDealer,
      Player: angular.noop,
      Hand: mockHand,
      Round: mockRound
    });

  }));

  it('should have a round set', function() {
    expect(gameCtrl.round).toBeDefined();
  });

  it('should have no gameMessages', function() {
    expect(gameCtrl.gameMessages).toBe('');
  });

  describe('dealAgain method', function() {
    it('should reset the betting status', function() {
      gameCtrl.dealAgain();
      expect(gameCtrl.betPlaced).toBe(false);
    });

    it('should deal a new round', function() {
      spyOn(gameCtrl.round, 'dealRound');
      gameCtrl.dealAgain();
      expect(gameCtrl.round.dealRound).toHaveBeenCalled();
    });

    it('should reset the game messages', function() {
      gameCtrl.dealAgain();
      expect(gameCtrl.gameMessages).toBe('');
    });
  });

  describe('hitMe method', function() {
    it('should set the game message if the player has busted', function() {
      gameCtrl.hitMe(mockPlayer);
      expect(gameCtrl.gameMessages).toBe('Player has busted!');
    });
  });

  describe('stick method', function() {
    it('should set the game message based on the player and dealer score', function() {
      spyOn(gameCtrl.round, 'resolveHands');
      gameCtrl.stick(mockPlayer);
      expect(gameCtrl.round.resolveHands).toHaveBeenCalled();
    });
  });

  describe('increaseBet method', function() {
    it('should increase the player bet by 1', function() {
      gameCtrl.increaseBet(mockPlayer);
      expect(mockPlayer.currentBet).toBe(11);
    });
  });

  describe('decreaseBet method', function() {
    it('should decrease the player bet by 1', function() {
      gameCtrl.decreaseBet(mockPlayer);
      expect(mockPlayer.currentBet).toBe(10);
    });
  });

  describe('placeBet method', function() {
    it('should set the game message', function() {
      gameCtrl.placeBet(mockPlayer);
      expect(gameCtrl.gameMessages).toBe('Player bets $10');
    });

    it('should set the betting status', function() {
      gameCtrl.placeBet(mockPlayer);
      expect(gameCtrl.betPlaced).toBe(true);
    });
  });

});
