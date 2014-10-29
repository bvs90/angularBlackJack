angular.module('app.dealerCards', [])
  .directive('dealerCards', function() {
    return {
      restrict: 'E',
      controller: 'dealerCardsCtrl as dealerCards',
      templateUrl: 'app/components/dealer-cards.html'
    };
  })

  .controller('dealerCardsCtrl', function() {

  })

;
