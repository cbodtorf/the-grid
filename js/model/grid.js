/*******************************
* MODEL
* (grid):: to keep track of grid position
* (player):: to store player info
********************************/

module.exports = Backbone.Model.extend({

  initialize() {
      this.once('end', this.endIt, this);
  },

    url: 'http://tiny-tiny.herokuapp.com/collections/cbgrid/',

    defaults: {

        playerX: 1,
        playerY: 1,
        name: 'Thor',
        playerType: '',
        energy: 20,
        mod: 1,
        score: 0,
    },

    // direction refactor
    upRight(player) {
        let gas = this.consumeEnergy();
        if (this.get(player) < 10 && gas === true) {
            this.set(player, this.get(player) +1);
          }
    },

    downLeft(player) {
        console.log('hey boy');
        let gas = this.consumeEnergy();
        if (this.get(player) > 1 && gas === true) {
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
        this.set('name', input);
    },

    changeCharacter(char) {
        this.set('playerType', char);

        // sets attributes based on ship playerType
        if (char === 'light') {this.set('energy', 20); this.set('mod', 1.2)}
        else if (char === 'medium') {this.set('energy', 25); this.set('mod', 1)}
        else if (char === 'heavy') {this.set('energy', 30); this.set('mod', 0.8)}
    },

    consumeEnergy() {
        this.set('energy', this.get('energy') -1);
    },

    endIt() {
      console.log('so close to ending it');
      if(this.get('energy') <= 0) {
        this.trigger('energyDepletion');
        this.save();
      }
    },

});
