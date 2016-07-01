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
},{"./router":5}],2:[function(require,module,exports){
/*******************************
* MODEL
* (grid):: to keep track of grid position
* (player):: to store player info
********************************/

let Highscore = require('./highscore');


module.exports = Backbone.Model.extend({

    rand1n10: Math.floor(Math.random() * 10) +1,
    
    url: 'http://grid.queencityiron.com/api/highscore',

    defaults: {

        X           : this.rand1n10,
        Y           : this.rand1n10,
        name        : 'Thor',
        playerType  : '',
        energy      : 20,
        mod         : 1,
        score       : 0,
    },

    scoreLogic(mod) {
      let point = this.rand1n10 * mod;
      this.set('score', Math.ceil((this.get('score') + point)));
    },

    // direction refactor
    // upRight(player) {
    //     let gas = this.consumeEnergy();
    //     if (this.get(player) < 10 && gas === undefined) {
    //         this.set(player, this.get(player) +1);
    //       }
    // },
    //
    // downLeft(player) {
    //     let gas = this.consumeEnergy();
    //     if (this.get(player) > 1 && gas === undefined) {
    //         this.set(player, this.get(player) -1);
    //       }
    // },

    up() {
      let gas = this.consumeEnergy();
      if (this.get('Y') < 10 && gas === undefined) {
            this.set('Y', this.get('Y') +1);
        }
    },
    down() {
      let gas = this.consumeEnergy();
      if (this.get('Y') > 1 && gas === undefined) {
            this.set('Y', this.get('Y') -1);
        }
    },
    left() {
      let gas = this.consumeEnergy();
      if (this.get('X') > 1 && gas === undefined) {
            this.set('X', this.get('X') -1);
        }
    },
    right() {
      let gas = this.consumeEnergy();
      if (this.get('X') < 10 && gas === undefined) {
            this.set('X', this.get('X') +1);
        }
    },

    // take input from player view
    changeUser(input) {
        this.set('name', input);
    },

    changeCharacter(char) {
        this.set('playerType', char);

        // sets attributes based on ship playerType
        if (char === 'light') {this.set('energy', 20); this.set('mod', 1.3)}
        else if (char === 'medium') {this.set('energy', 25); this.set('mod', 1)}
        else if (char === 'heavy') {this.set('energy', 30); this.set('mod', 0.8)}
    },

    consumeEnergy() {
        this.set('energy', this.get('energy') -1);
        this.scoreLogic(Number(this.get('mod')));
    },

    canMove() {
      if (this.get('energy') <= 0) {
        this.trigger('energyDepletion');
        this.get({
          name: 'name'
        })
         return true;
       }
       return false;
    },


});

},{"./highscore":4}],3:[function(require,module,exports){
/*******************************
* Collection (highscore)
* (model):: highscore
* (role):: fetch array of highscores from server
********************************/

let HighscoreModel = require('./highscore');


module.exports = Backbone.Collection.extend({

    url     : 'http://grid.queencityiron.com/api/highscore',
    model   : HighscoreModel,

})

},{"./highscore":4}],4:[function(require,module,exports){
/*******************************
* MODEL (highscore)
* (highscore):: highscore to be sent to server
* (collection):: connected to highscore.collection.js
********************************/

module.exports = Backbone.Model.extend({


    url: 'http://grid.queencityiron.com/api/highscore',

    defaults: {
      name        : '',
      score       : 0,
      playerType  : '',
    },

})

},{}],5:[function(require,module,exports){
// module imports

let GridModel = require('./model/grid');
let GameView = require('./view/game');
let PlayerView = require('./view/player');
let GameOverView = require('./view/gameover');
let HighscoreCollection = require('./model/highscore.collection')
let HighscoreModel = require('./model/highscore')

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

        // EVENT LISTENER for submiting score
        this.game.model.once('energyDepletion', this.submitScore.bind(this));

        // EVENT LISTENER for activating ARROW keys
        this.player.model.on('play', this.start.bind(this));

        // EVENT LISTENER for ENTER key to submit name
        window.addEventListener("keyup", this.enterKey, false);

    },

    routes: {
        'player'      : 'playerTime',
        'game'        : 'gameTime',
        'gameover'    : 'gameOverTime',
        ''            : 'playerTime',
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
        if(this.player.model.get('playerType') === '') {
            location.href = "#player";
        };

        this.game.el.classList.remove('hidden');
        this.player.el.classList.add('hidden');
    },

    gameOverTime() {
        if(this.player.model.get('score') === 0) {
            location.href = "#player";
        };

        this.gameOver.el.classList.remove('hidden');
        this.game.el.classList.add('hidden');
        this.player.el.classList.add('hidden');
    },

    enterKey(e) {
          let input = document.getElementById('name');

          if (e.which === 13 && input.value !== '') { /*enter*/
          // enter clicks button to access href
          $('button').click();
          input.value = '';
        }
    },

      // END GAME __ triggered from running out of energy in GRIDMODEL
    submitScore() {
      let self = this.game.model;
        // to highscore model
        hsmodel = new HighscoreModel({
          name: self.get('name'),
          score: self.get('score'),
          playerType: self.get('playerType'),
        })
          //save user score in highscore server
        console.log(hsmodel);
        hsmodel.save();


        for(let i = 0; i< 2000;i++) {
          //waste some time yay!
        };
          //change to game over screen
        location.href = "#gameover";
          // saving context to access gameover screen in fetch function
        let that = this.gameOver;

          // get the highscore data and smack it on the screen
        let highScore = new HighscoreCollection();
        highScore.fetch({
            url: 'http://grid.queencityiron.com/api/highscore',
            success() {
                that.render(highScore.models);
            }
        })
    },

    /*******************************************************************************
    * finds ARROWS function in GAMEVIEW and binds it there. (is on WINDOW otherwise)
    ********************************************************************************/
    start() {
      window.addEventListener("keyup", this.game.arrows.bind(this.game), false);
    },

})

},{"./model/grid":2,"./model/highscore":4,"./model/highscore.collection":3,"./view/game":6,"./view/gameover":7,"./view/player":8}],6:[function(require,module,exports){
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
            //couldn't figure out how to remove event listener so I had to block it
           if (this.model.canMove()){
             return
           }

      else if (e.which === 38) {this.model.up();} /*up*/
      else if (e.which === 40) {this.model.down();} /*down*/
      else if (e.which === 37) {this.model.left();} /*left*/
      else if (e.which === 39) {this.model.right();} /*right*/
    }, /* end of arrows */


    render() {
      let x = this.el.querySelector('#xCoord');
      x.innerHTML = this.model.get('X');

      let y = this.el.querySelector('#yCoord');
      y.innerHTML = this.model.get('Y');

      let energy = this.el.querySelector('#energy');
      energy.innerHTML = this.model.get('energy');

      let score = document.getElementById('scoreG');
      score.innerHTML = this.model.get('score');

    },

});

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
/*******************************
* VIEW (player)
* (grid):: input for name
********************************/

module.exports = Backbone.View.extend({

    initialize() {
        this.model.on('change', this.render, this);
    },

    events: {
        'click #enter'        : 'enterTheGrid',
        'click #changeName'   : 'nameChange',
        'click .char'         : 'characterSelect',
        'focus .char'         : 'characterSelect',
    },

    enterTheGrid() {
          let hiddenCheck = document.getElementById('enter');

          if (!hiddenCheck.classList.contains('hidden')) {
            this.model.trigger('play');
            location.href = "#game";
          }
    },

    nameChange() {
      let input = document.getElementById('name');
      if (input.value !== '') {
        this.model.changeUser(input.value);
        input.value = '';
      }
    },

    characterSelect() {
      let images = document.querySelectorAll('.char');
      let showEnter = document.getElementById('enter');
      let char = document.activeElement;

      //reset selection on view
      images.forEach(function(e){
        e.classList.remove('sel');
      })
      this.model.changeCharacter(char.id);
      char.classList.toggle('sel');
      showEnter.classList.remove('hidden');
    },


    render() {
        let user = this.el.querySelector('#user');
        user.innerHTML = this.model.get('name');

        let char = this.model.get('playerType');
        let charClass = document.getElementById('charClass')
        charClass.innerHTML = char;
    },

});

},{}]},{},[1])