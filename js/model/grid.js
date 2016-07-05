/*******************************
* MODEL
* (grid):: to keep track of grid position
* (player):: to store player info
********************************/

let Highscore = require('./highscore');


module.exports = Backbone.Model.extend({

    rand1n10() {
      return Math.floor(Math.random() * 10) +1;
    },

    url: 'http://grid.queencityiron.com/api/highscore',

    defaults: {

        X           : Math.floor(Math.random() * 10) +1,
        Y           : Math.floor(Math.random() * 10) +1 ,
        prevXY      : '',
        name        : 'Thor',
        playerType  : '',
        energy      : 20,
        mod         : 1,
        score       : 0,
        gridArr     : [],
    },

    scoreLogic(mod) {
      let point = this.rand1n10() * mod;
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
      this.logPrevPos();
      let gas = this.consumeEnergy();
      if (this.get('Y') < 10 && gas === undefined) {
            this.set('Y', this.get('Y') +1);
            // console.log(this.get('prevXY'));
        }
    },
    down() {
      this.logPrevPos();
      let gas = this.consumeEnergy();
      if (this.get('Y') > 1 && gas === undefined) {
            this.set('Y', this.get('Y') -1);
        }
    },
    left() {
      this.logPrevPos();
      let gas = this.consumeEnergy();
      if (this.get('X') > 1 && gas === undefined) {
            this.set('X', this.get('X') -1);
        }
    },
    right() {
      this.logPrevPos();
      let gas = this.consumeEnergy();
      if (this.get('X') < 10 && gas === undefined) {
            this.set('X', this.get('X') +1);
        }
    },

    logPrevPos() {
      let x = this.get('X');
      let y = this.get('Y');
      this.set('prevXY',`y${y}x${x}`);
    },

    // take input from player view
    changeUser(input) {
        this.set('name', input);
    },

    changeCharacter(char) {
        this.set('playerType', char);

        // sets attributes based on ship playerType
        if (char === 'Small') {this.set('energy', 20); this.set('mod', 1.3)}
        else if (char === 'Big') {this.set('energy', 25); this.set('mod', 1)}
        else if (char === 'Gargantuan') {this.set('energy', 30); this.set('mod', 0.8)}
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

    gridCreate(rows) {
      let arr = [];

      for (var i=0;i<rows;i++) {
           arr[i] = [];
        }
      this.set('gridArr', arr);
      return arr;

    }

});
