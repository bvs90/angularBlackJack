angular.module('app.hand', [])

.service('Hand', function() {

  this.makeScore = function(cards) {
    var handTotal = 0,
        altHandTotal = 0;

    for(var i = 0; i < cards.length; i++) {
      var card = cards[i];

      if(card.flipped) {
        if(card.value2) {
          handTotal += card.value1;
          altHandTotal += card.value2;
        } else {
          handTotal += card.value1;
          altHandTotal += card.value1;
        }
      }
    }

    return [handTotal, altHandTotal];
  };

})

;
