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
    let score = document.getElementById('scoreGO');
    score.innerHTML = this.model.get('score');
  },

})
