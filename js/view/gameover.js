/*******************************
* VIEW (gameover)
* (grid):: you dead
********************************/

module.exports = Backbone.View.extend({

  initialize() {
      this.model.on("route:[gameover]", this.render, this);
  },

  events: {
      'click #playAgain' : 'playAgain',
  },

  playAgain() {
      // <a> tag covers this for now
  },

  render(data) {
    let score = document.getElementById('scoreGO');
    score.innerHTML = this.model.get('score');

    let highscores = document.getElementById('highScoreList');
    highscores.innerHTML = '';

    data.forEach(function(e,i) {

        if (i < 10) {
          let node = document.createElement('DIV');
          node.innerHTML = `
          <span class="nameHS">${e.attributes.name}</span>
          <span class="scoreHS">${e.attributes.score}</span>
          <span class="playerTypeHS">${e.attributes.playerType}</span>
        `;

        highscores.appendChild(node);
      } else {return;}

    })

  },

})
