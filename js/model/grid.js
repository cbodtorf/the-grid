/*******************************
* MODEL
* (grid):: to keep track of grid position
* (player):: to store player info
********************************/

module.exports = Backbone.Model.extend({
    // Initial values

    defaults: {

        playerX: 1,
        playerY: 1,
        username: 'Thor',
    },

    // direction refactor ????
    // dPad(player, change) {
    //     if (this.get(`'${player}'`) >=1 && <=10) {
    //         this.set(`'${player}'`, this.get(`'${player}'`) `${change}1`);
    //       }
    // },
    //direction functions
    up() {
      if (this.get('playerY') < 10) {
            this.set('playerY', this.get('playerY') +1);
        }
    },
    down() {
      if (this.get('playerY') > 1) {
            this.set('playerY', this.get('playerY') -1);
        }
    },
    left() {
      if (this.get('playerX') > 1) {
            this.set('playerX', this.get('playerX') -1);
        }
    },
    right() {
      if (this.get('playerX') < 10) {
            this.set('playerX', this.get('playerX') +1);
        }
    },

    // take input from player view
    changeUser(input) {
      this.set('username', input);
    }

});
