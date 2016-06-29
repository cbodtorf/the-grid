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
        if(this.player.model.get('weightClass') === '') {
            location.href = "#player";
        };

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
