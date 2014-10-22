describe('Hand Service', function() {
  beforeEach(module('app.hand'));

  var Hand,
    mockCard1,
    mockCard2,
    cards;

  mockCard1 = {
    flipped: true,
    value1: 10
  };

  mockCard2 = {
    flipped: true,
    value1: 9
  };

  cards = [mockCard1, mockCard2];

  beforeEach(inject(function(_Hand_) {
    Hand = _Hand_;
  }));

  describe('makeScore method', function() {
    it('should return the total scores of a blackjack hand', function() {
      var result = Hand.makeScore(cards);
      expect(result).toEqual([19,19]);
    });

    it('should only add the value of a flipped card', function() {
      mockCard1.flipped = false;
      var result = Hand.makeScore(cards);
      expect(result).toEqual([9,9]);
    });

    it('should return an alternate total if a card has two different values', function() {
      mockCard1.flipped = true;
      mockCard1.value2 = 20;
      var result = Hand.makeScore(cards);
      expect(result).toEqual([19,29]);
    });
  });


});
