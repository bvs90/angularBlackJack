angular.module('app.deck', [])

.service('Deck', function(Card) {

  var suits = ['Spades', 'Clubs', 'Hearts', 'Diamonds'];
  var names = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];
  var valueMap = {
    'Ace': [1,11],
    'Two': [2],
    'Three': [3],
    'Four': [4],
    'Five': [5],
    'Six': [6],
    'Seven': [7],
    'Eight': [8],
    'Nine': [9],
    'Ten': [10],
    'Jack': [10],
    'Queen': [10],
    'King': [10]
  };

  // builds a deck of cards
  this.buildDeck = function() {
    var deck = [];

    for(var i = 0; i < suits.length; i++) {
      for(var j = 0; j < names.length; j++) {
        var card = new Card(names[j], suits[i], valueMap[names[j]][0], valueMap[names[j]][1]);
        deck.push(card);
      }
    }

    return deck;
  };

  // shuffles the cards into a new deck for dealing
  this.shuffle = function(deck) {
    var shuffledDeck = [];

    while(deck.length > 0) {
      var card = Math.floor(Math.random() * deck.length -1);
      var removed = deck.splice(card, 1);
      shuffledDeck.push(removed[0]);
    }
    return shuffledDeck;
  };

  // retrieve a new shuffled deck
  this.getShuffledDeck = function() {
    var deck = this.buildDeck();
    return this.shuffle(deck);
  };

})

;
