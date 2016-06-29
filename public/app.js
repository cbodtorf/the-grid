(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/*******************************
* // Created by: Caleb Bodtorf
* // Date: 6-27-2016
********************************/

var Router = require('./router');

window.addEventListener('load', function () {
    console.log('hello');

    var router = new Router();

    Backbone.history.start();
});
},{"./router":3}],2:[function(require,module,exports){
/*******************************
* MODEL
* (grid):: to keep track of grid position
* (player):: to store player info
********************************/

module.exports = Backbone.Model.extend({

    defaults: {

        playerX: 1,
        playerY: 1,
        username: 'Thor',
        character: 'light',
        energy: 10,
    },

    // direction refactor
    upRight(player) {
        let gas = this.consumeEnergy();
        if (this.get(player) < 10 && gas === true) {
            this.set(player, this.get(player) +1);
          }
    },

    downLeft(player) {
        let gas = this.consumeEnergy();
        if (this.get(player && gas === true) > 1) {
            this.set(player, this.get(player) -1);
          }
    },

    //direction functions
      // up() {
      //   if (this.get('playerY') < 10) {
      //         this.set('playerY', this.get('playerY') +1);
      //     }
      // },
      // down() {
      //   if (this.get('playerY') > 1) {
      //         this.set('playerY', this.get('playerY') -1);
      //     }
      // },
      // left() {
      //   if (this.get('playerX') > 1) {
      //         this.set('playerX', this.get('playerX') -1);
      //     }
      // },
      // right() {
      //   if (this.get('playerX') < 10) {
      //         this.set('playerX', this.get('playerX') +1);
      //     }
      // },

    // take input from player view
    changeUser(input) {
        this.set('username', input);
    },
    changeCharacter(char) {
        this.set('character', char);
    },

    consumeEnergy() {
        if (this.get('energy') > 0) {
            this.set('energy', this.get('energy') -1);
            return true;
        } else {
          this.trigger('energyDepletion');
          return false;
        }

    }


});

},{}],3:[function(require,module,exports){
// module imports

let GridModel = require('./model/grid');
let GameView = require('./view/game');
let PlayerView = require('./view/player');
let GameOverView = require('./view/gameover');

/*******************************
* ROUTER
*
********************************/

module.exports = Backbone.Router.extend({

    initialize() {

        let gmodel = new GridModel();

        this.game = new GameView({
            model: gmodel,
            el: document.getElementById('game'),
        });

        this.player = new PlayerView({
            model: gmodel,
            el: document.getElementById('player'),
        });

        this.gameOver = new GameOverView({
            model: gmodel,
            el: document.getElementById('gameOver'),
        });

        // EVENT LISTENER for activating ARROW keys
        this.player.model.on('play', this.start.bind(this));

        // EVENT LISTENER for Running out of ENERGY
        this.game.model.on('energyDepletion', this.youDead);

        // EVENT LISTENER for ENTER key to submit name
        window.addEventListener("keyup", this.enterKey, false);

    },

    routes: {
        'player': 'playerTime',
        'game' : 'gameTime',
        'gameover' : 'gameOverTime',
        '' : 'playerTime',
    },


    /*******************************
    * ROUTE events show/hide VIEWS
    ********************************/
    playerTime() {
        this.player.el.classList.remove('hidden');
        this.gameOver.el.classList.add('hidden');
        this.game.el.classList.add('hidden');
    },

    gameTime() {
        this.game.el.classList.remove('hidden');
        this.player.el.classList.add('hidden');
    },

    gameOverTime() {
        this.gameOver.el.classList.remove('hidden');
        this.game.el.classList.add('hidden');
        this.player.el.classList.add('hidden');
    },

    // triggered from running out of energy in GRIDMODEL
    youDead() {
      location.href = "#gameover";
    },

    enterKey(e) {
          let input = document.getElementById('name');

          if (e.which === 13 && input.value !== '') { /*enter*/
          // enter clicks button to access href
          $('button').click();
          input.value = '';
        }
    },

    /*******************************************************************************
    * finds ARROWS function in GAMEVIEW and binds it there. (is on WINDOW otherwise)
    ********************************************************************************/
    start() {
      window.addEventListener("keyup", this.game.arrows.bind(this.game), false);
    },

})

},{"./model/grid":2,"./view/game":4,"./view/gameover":5,"./view/player":6}],4:[function(require,module,exports){
/*******************************
* VIEW (game)
* (grid):: keypress movement aka. TRAVERSING THE GRID
********************************/


module.exports = Backbone.View.extend({

    initialize() {
        this.model.on('change', this.render, this);
    },

    events: {

    },

    arrows(e) {
            let input = document.getElementById('name');
           if (e.which === 38) {this.model.upRight('playerY');} /*up*/
      else if (e.which === 40) {this.model.downLeft('playerY');} /*down*/
      else if (e.which === 37) {this.model.downLeft('playerX');} /*left*/
      else if (e.which === 39) {this.model.upRight('playerX');} /*right*/
    }, /* end of arrows */


    render() {
      let x = this.el.querySelector('#xCoord');
      x.innerHTML = this.model.get('playerX');

      let y = this.el.querySelector('#yCoord');
      y.innerHTML = this.model.get('playerY');

      let energy = this.el.querySelector('#energy');
      energy.innerHTML = this.model.get('energy');

    },

});

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
/*******************************
* VIEW (player)
* (grid):: input for username
********************************/

module.exports = Backbone.View.extend({

    initialize() {
        this.model.on('change', this.render, this);
    },

    events: {
        'click #enter': 'enterTheGrid',
        'click .char': 'characterSelect'
    },

    enterTheGrid() {
        let input = document.getElementById('name');
        if (input.value !== '') {
          this.model.changeUser(input.value);
          input.value = '';
          this.model.trigger('play');
          this.model.trigger('submit');
          location.href = "#game";
        }
    },

    characterSelect() {
      let images = document.querySelectorAll('.char');
      let char = document.activeElement;
      images.forEach(function(e){
        e.classList.remove('sel');
      })
      this.model.changeCharacter(char.id);
      char.classList.toggle('sel');
    },


    render() {
        let user = this.el.querySelector('#user');
        user.innerHTML = this.model.get('username');

        let char = this.model.get('character');
        let charClass = document.getElementById('charClass')
        charClass.innerHTML = char;
        // char.id.classList.toggle('sel');
    },

});

},{}]},{},[1])