angular.module('app.gameCtrl', [])

.controller('GameCtrl', function(Dealer, Player, Hand, Round) {

  // deal a round
  this.round = new Round();
  this.round.dealRound();

  this.gameMessages = '';

  // reset the round
  this.dealAgain = function() {
    this.betPlaced = false;
    this.round.dealRound();
    this.gameMessages = '';
  };

  // after dealer has completed round, loop through player scores and compare
  this.hitMe = function(player) {
    player.hand.push(Dealer.dealOne());
    player.score = Hand.makeScore(player.hand);

    if(player.score[0] > 21) {
      player.bank -= player.currentBet;
      this.gameMessages = 'Player has busted!';
    }
  };

  this.stick = function(player) {
    var playerTotal;
    var dealerTotal;

    if(player.score[1] > player.score[0] && player.score[1] <= 21) {
      playerTotal = player.score[1];
    } else {
      playerTotal = player.score[0];
    }

    dealerTotal = Dealer.evaluateHand(playerTotal);

    this.gameMessages = this.round.resolveHands(dealerTotal, playerTotal);
  };

  // betting
  this.increaseBet = function(player) {
    player.currentBet++;
  };

  this.decreaseBet = function(player) {
    player.currentBet--;
  };

  this.betPlaced = false;

  this.placeBet = function(player) {
    this.gameMessages = 'Player bets $' + player.currentBet;
    this.betPlaced = true;
  };

})

;

