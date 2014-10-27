ddescribe('Round factory', function() {
  var mockDealer,
    mockPlayers,
    mockHand;

  mockDealer = {
    hand: [1,2,3],
    dealGame: angular.noop,
    dealOne: function() {
      return mockDeck[0];
    }
  };

  mockPlayers = function() {
    return {
      hand: [],
      currentBet: 10
    };
  };

  mockHand = {
    makeScore: angular.noop
  };

  mockDeck = [
    { flipped: true },
  ];

  beforeEach(module('app.round'));

  beforeEach(module(function($provide) {
    $provide.value('Dealer', mockDealer);
    $provide.value('Player', mockPlayers);
    $provide.value('Hand', mockHand);
  }));

  beforeEach(inject(function(_Round_) {
    Round = _Round_;
    round = new Round();
  }));

  it('should have a dealer', function() {
    expect(round.dealer).toBeDefined();
  });

  it('should have players', function() {
    expect(round.players).toBeDefined();
  });

  describe('dealRound method', function() {
    it('should reset the hands of the players', function() {
      spyOn(round, 'clearHands');
      round.dealRound();
      expect(round.clearHands).toHaveBeenCalled();
    });

    it('should set a player hand to two cards', function() {
      round.dealRound();
      expect(round.players[0].hand.length).toBe(2);
    });

    it('should set the hand of the dealer to two cards', function() {
      round.dealRound();
      expect(round.dealer.hand.length).toBe(2);
    });
  });

  describe('clearHands method', function() {
    beforeEach(function() {
      round.clearHands();
    });

    it('should empty all the players hands', function() {
      expect(round.players[0].hand).toEqual([]);
    });

    it('should empty the dealer hand', function() {
      expect(round.dealer.hand).toEqual([]);
    });
  });

  describe('resolveHands method', function() {
    it('should bust the dealer if their score is over 21', function() {
      var message = round.resolveHands(22,20);
      expect(message).toBe('Dealer busted, Player wins $10');
    });

    it('should be a push if the player and dealer scores are equal', function() {
      var message = round.resolveHands(20,20);
      expect(message).toBe('Push');
    });

    it('should be a win for the player if their score beats the dealer', function() {
      var message = round.resolveHands(20,21);
      expect(message).toBe('Player beats dealer!, Player wins $10');
    });

    it('should be a win for the dealer if their score beats the player', function() {
      var message = round.resolveHands(20,19);
      expect(message).toBe('Dealer beats player');
    });
  });

});
