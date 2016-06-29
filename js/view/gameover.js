/*******************************
* VIEW (gameover)
* (grid):: you dead
********************************/

module.exports = Backbone.View.extend({

  initialize() {
      this.model.on('change', this.render, this);
  },

  events: {
      'click #playAgain' : 'playAgain',
  },

  playAgain() {

  },

  render() {

  },
  
})
