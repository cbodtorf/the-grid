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
