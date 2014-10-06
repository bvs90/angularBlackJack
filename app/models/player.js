angular.module('app.player', [])

.factory('Player', function(Hand, Dealer) {

  var Player = function() {
    this.hand = [];
    this.score = null;
    this.bank = 100;
    this.currentBet = 5;
  };

  // hands -> can have more than one if the player splits

  return Player;

})

;
