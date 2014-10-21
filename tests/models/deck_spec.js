describe('Deck Service', function() {
  beforeEach(module('app.deck'));
  beforeEach(module('app.card'));

  var Deck,
    Card,
    mockCard;

  beforeEach(inject(function(_Deck_, _Card_) {
    Deck = _Deck_;
    Card = _Card_;
  }));

  describe('buildDeck method', function() {
    it('should create a full deck of cards', function() {
      var deck = Deck.buildDeck();
      expect(deck.length).toBe(52);
    });

    it('should have the Ace of Spades as the first card', function() {
      var deck = Deck.buildDeck();
      expect(deck[0].name).toBe('Ace');
      expect(deck[0].suit).toBe('Spades');
    });
  });

  // describe('shuffle method', function() {
  //   it('should create a deck of cards with a random card order', function() {
  //     var deck = Deck.buildDeck();
  //     var shuffledDeck = Deck.shuffle(deck);
  //     expect(shuffledDeck[0].name).not.toBe('Ace');
  //   });
  // });

  describe('getShuffledDeck method', function() {
    it('should return a shuffled deck', function() {
      spyOn(Deck, 'shuffle');
      spyOn(Deck, 'buildDeck');
      Deck.getShuffledDeck();
      expect(Deck.buildDeck).toHaveBeenCalled();
      expect(Deck.shuffle).toHaveBeenCalled();
    });
  });

});
