describe('Dealer Service', function() {

  var Dealer,
    mockHand,
    mockDeck,
    shuffledDeck,
    card1,
    card2,
    card3,
    card4;

  card1 = {
    flipped: true,
    score: [5]
  };

  card2 = {
    flipped: false,
    score: [12]
  };

  card3 = {
    score: [5]
  };

  card4 = {
    score: [4]
  };

  mockDeck = {
    getShuffledDeck: function() {
      return shuffledDeck;
    }
  };

  mockHand = {
    makeScore : function(hand) {
      var res = 0;
      var altRes = 0;

      hand.forEach(function(card) {
        if(card.score[1]) {
          res += card.score[0];
          altRes += card.score[1];
        } else {
          res += card.score[0];
          altRes += card.score[0];
        }
      });

      return [res, altRes];
    }
  };

  beforeEach(module('app.dealer'));

  beforeEach(module(function($provide) {
    $provide.value('Deck', mockDeck);
    $provide.value('Hand', mockHand);
  }));

  beforeEach(inject(function(_Dealer_) {
    Dealer = _Dealer_;

    shuffledDeck = [card3, card4];
    Dealer.deck = shuffledDeck;
    Dealer.hand = [card1, card2];

  }));

  describe('dealGame method', function() {
    it('should set the deck to a new shuffled deck', function() {
      Dealer.dealGame();
      expect(Dealer.deck.length).toBe(2);
    });
  });

  describe('dealOne method', function() {
    it('should return the first card in the deck', function() {
      var card = Dealer.dealOne();

      expect(card.score[0]).toBe(5);
    });
  });

  describe('evaluateHand method', function() {
    it('should flip the dealers second card', function() {
      Dealer.evaluateHand();
      expect(Dealer.hand[1].flipped).toBe(true);
    });

    it('should set the dealers score', function() {
      Dealer.evaluateHand();
      expect(Dealer.score[0]).toBe(17);
    });

    describe('if the dealer is not holding an ace', function() {
      it('should stick if their score is greater than 17', function() {
        var score = Dealer.evaluateHand();
        expect(score).toBe(17);
      });

      it('should deal another card if their score is less than 17', function() {
        card1.score = [4];
        var score = Dealer.evaluateHand();
        expect(score).toBe(21);
      });
    });

    describe('if the dealer is holding an ace', function() {
      it('should use the alernate score if it beats the players total', function() {
        card1.score = [1,11];
        card2.score = [10];
        var score = Dealer.evaluateHand(20);
        expect(score).toBe(21);
      });

      it('should deal another card and use the primary score if it is above 16', function() {
        card1.score = [1,11];
        card2.score = [5];
        card3.score = [12];

        var score = Dealer.evaluateHand(21);
        expect(score).toBe(18);
      });
    });

  });

});

