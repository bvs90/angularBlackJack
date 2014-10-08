angular.module('app.round', [])

.factory('Round', function(Dealer, Player, Hand) {

  var Round = function() {
    this.dealer = Dealer;
    this.players = [new Player()];
  };

  // A Game Round
  // dealer deals to player(s) and then to themself
  Round.prototype.dealRound = function() {
    var player;

    // clear hands of current players
    this.clearHands();

    // get a new deck
    this.dealer.dealGame();

    // deal each player one card
    for(var i = 0; i < this.players.length; i++) {
      player = this.players[i];
      player.hand.push(this.dealer.dealOne());
    }

    // deal each player another card
    for(var j = 0; j < this.players.length; j++) {
      player = this.players[j];
      player.hand.push(this.dealer.dealOne());
      player.score = Hand.makeScore(player.hand);
    }

    // deal two cards to the dealer
    this.dealer.hand.push(this.dealer.dealOne(), this.dealer.dealOne());
    this.dealer.hand[1].flipped = false;
    this.dealer.score = Hand.makeScore(this.dealer.hand);
  };

  Round.prototype.clearHands = function() {
    for(var i = 0; i < this.players.length; i++) {
      var player = this.players[i];
      player.hand = [];
    }

    this.dealer.hand = [];
  };


  // calculate winner(s)
  // evaluate player(s) hand(s) compared to Dealer hand
  Round.prototype.resolveHands = function(dealerScore, playerScore) {
    var player = this.players[0];

    if (dealerScore > 21) {
      player.bank += player.currentBet;
      return 'Dealer busted, Player wins $' + player.currentBet;
    } else if(dealerScore === playerScore) {
      return 'Push';
    } else if (playerScore > dealerScore) {
      player.bank += player.currentBet;
      return 'Player beats dealer!, Player wins $' + player.currentBet;
    } else {
      player.bank -= player.currentBet;
      return 'Dealer beats player';
    }
  };

  return Round;

})

;
