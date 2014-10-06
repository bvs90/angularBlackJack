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

  // current hand
  this.hand = [];
  this.score = null;

  // evaluate current hand once it is the dealers turn
  this.evaluateHand = function(playerTotal) {
    // flip the dealers second card and update score
    this.hand[1].flipped = true;
    this.score = Hand.makeScore(this.hand);


    if (this.score[0] === this.score[1]) {
      // if dealer is not holding an ace
      if (this.score[0] <= 17) {
        // has to hit if score is less than or equal to 17
        this.hand.push(this.dealOne());
        return this.evaluateHand();
      } else {
        return this.score[0];
      }
    } else {
      // if dealer is holding an ace
      if (this.score[1] > 17 && this.score[1] <= 21 && this.score[1] >= playerTotal) {
        return this.score[1];
      } else if (this.score[0] > 17) {
        return this.score[0];
      } else if (this.score[0] < 17) {
        this.hand.push(this.dealOne());
        return this.evaluateHand();
      }
    }

    // if score gets above 21 -> dealer has busted
    // handled in round evaluator
  };


})

;
