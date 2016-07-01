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
