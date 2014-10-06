angular.module('app.gameCtrl', [])

.controller('GameCtrl', function(Dealer, Player, Hand, Round) {

  this.round = new Round();

  // deal a round
  this.round.dealRound();
  console.log(this.round);

  // reset the round
  this.dealAgain = function() {
    this.round.dealRound();
    this.gameMessage = '';
  };

  // after dealer has completed round, loop through player scores and compare
  this.hitMe = function(player, index) {
    var playerNumber = index + 1;

    player.hand.push(Dealer.dealOne());
    player.score = Hand.makeScore(player.hand);
    if(player.score[0] > 21) {
      player.bank -= player.currentBet;
      this.gameMessage = 'Player ' + playerNumber + ' has busted!';
    }
  };

  this.stick = function(player, index) {
    var dealerTotal = Dealer.evaluateHand();
    var playerTotal;

    if(player.score[1] > player.score[0] && player.score[1] <= 21) {
      playerTotal = player.score[1];
    } else {
      playerTotal = player.score[0];
    }

    this.gameMessage = this.round.resolveHands(dealerTotal, playerTotal);
  };

  // this.gameMessage = Round.gameMessage();
  this.gameMessage = '';

  // betting
  this.increaseBet = function(player) {
    player.currentBet++;
  };

  this.decreaseBet = function(player) {
    player.currentBet--;
  };

})

;

