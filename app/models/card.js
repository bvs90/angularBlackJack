angular.module('app.card', [])

.factory('Card', function() {

  var Card = function(name, suit, value1, value2) {
    this.flipped = true;
    this.name = name;
    this.suit = suit;
    this.value1 = value1;
    this.value2 = value2;
  };

  return Card;

})

;
