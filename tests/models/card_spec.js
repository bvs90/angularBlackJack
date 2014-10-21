describe('Card Factory', function() {
  beforeEach(module('app.card'));

  var Card,
      card;

  beforeEach(inject(function(_Card_) {
    Card = _Card_;
  }));

  beforeEach(function() {
    card = new Card('Jack', 'Spades', 1, 11);
  });

  it('should have a flipped property', function() {
    expect(card.flipped).toBe(true);
  });

  it('should have a name property', function() {
    expect(card.name).toBe('Jack');
  });

  it('should have a suit property', function() {
    expect(card.suit).toBe('Spades');
  });

  it('should have a value1 property', function() {
    expect(card.value1).toBe(1);
  });

  it('should have a value2 property', function() {
    expect(card.value2).toBe(11);
  });

});
