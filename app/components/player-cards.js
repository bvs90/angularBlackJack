angular.module('app.playerCards', [])
  .directive('playerCards', function() {
    return {
      restrict: 'E',
      controller: 'playerCardsCtrl as playerCards',
      templateUrl: 'app/components/player-cards.html'
    };
  })

  .controller('playerCardsCtrl', function() {

  })

;
