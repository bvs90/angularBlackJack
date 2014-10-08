angular.module('app.gameCtrl', [])

.controller('GameCtrl', function(Dealer, Player, Hand, Round, Messages) {

  this.round = new Round();

  // this.gameMessages = Messages.gameMessages;

  // deal a round
  this.round.dealRound();
  console.log(this.round);

  // reset the round
  this.dealAgain = function() {
    this.betPlaced = false;
    this.round.dealRound();
    Messages.gameMessages = [];
  };

  // after dealer has completed round, loop through player scores and compare
  this.hitMe = function(player, index) {
    var playerNumber = index + 1;

    player.hand.push(Dealer.dealOne());
    player.score = Hand.makeScore(player.hand);
    if(player.score[0] > 21) {
      player.bank -= player.currentBet;
      Messages.gameMessages.push('Player ' + playerNumber + ' has busted!');
    }
  };

  this.stick = function(player, index) {
    var playerTotal;
    var dealerTotal;

    if(player.score[1] > player.score[0] && player.score[1] <= 21) {
      playerTotal = player.score[1];
    } else {
      playerTotal = player.score[0];
    }

    dealerTotal = Dealer.evaluateHand(playerTotal);

    Messages.gameMessages.push(this.round.resolveHands(dealerTotal, playerTotal));
  };

  // betting
  this.increaseBet = function(player) {
    player.currentBet++;
  };

  this.decreaseBet = function(player) {
    player.currentBet--;
  };

  this.betPlaced = false;

  this.placeBet = function(player, index) {
    var playerNumber = index + 1;

    Messages.gameMessages.push('Player ' + playerNumber + ' bets $' + player.currentBet);
    this.betPlaced = true;
  };

})

;

