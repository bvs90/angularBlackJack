angular.module('app.dealer', [])

.service('Dealer', function(Deck, Hand) {

  this.dealGame = function() {
    // card duties
    this.deck = Deck.getShuffledDeck();
  };

  // deck actions
  this.dealOne = function() {
    return this.deck.shift();
  };

  // own hand actions
  this.hit = function() {
    this.dealOne();
  };

  this.stick = function() {};

  // current hand
  this.hand = [];
  this.score = null;

  // evaluate current hand once it is the dealers turn
  this.evaluateHand = function() {
    // flip the dealers second card and update score
    this.hand[1].flipped = true;
    this.score = Hand.makeScore(this.hand);

    // if score is less than 17 on both scores, has to hit
    if (this.score[0] <= 17 && this.score[1] <= 17) {
      this.hand.push(this.dealOne());
      return this.evaluateHand();
    } else if (this.score[0] > 17) {
      // if score(s) are 17 or higher - has to stick
      if (this.score[1] > 21) {
        return this.score[0];
      } else {
        return this.score[1];
      }
    }
    // if score gets above 21 -> dealer has busted
    // handled in round evaluator
  };


})

;
