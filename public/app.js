(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// Created by: Caleb Bodtorf
// Date: 6-27-2016

var GridModel = require('./model/grid');
var GridView = require('./view/grid');
var PlayerView = require('./view/player');
var Router = require('./router');

window.addEventListener('load', function () {
    console.log('hello');
    var router = new Router();

    var gmodel = new GridModel();

    var grid = new GridView({
        model: gmodel,
        el: document.getElementById('grid')
    });

    var player = new PlayerView({
        model: gmodel,
        el: document.getElementById('player')
    });

    window.addEventListener("keyup", keyUp, false);

    function keyUp(e) {
        if (e.which === 38) {
            grid.model.up();
        } else if (e.which === 40) {
            grid.model.down();
        } else if (e.which === 37) {
            grid.model.left();
        } else if (e.which === 39) {
            grid.model.right();
        } else if (e.which === 13) {
            var input = document.getElementById('name');
            grid.model.changeUser(input.value);
            input.value = '';
        }
    }
});
},{"./model/grid":2,"./router":3,"./view/grid":4,"./view/player":5}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
/*******************************
* ROUTER
*
********************************/

module.exports = Backbone.Router.extend({
  
})

},{}],4:[function(require,module,exports){
/*******************************
* VIEW (grid)
* (grid):: keypress movement aka. TRAVERSING THE GRID
********************************/


module.exports = Backbone.View.extend({

    initialize() {
        this.model.on('change', this.render, this);
    },

    events: {
  
    },


    render() {
      let x = this.el.querySelector('#xCoord');
      x.innerHTML = this.model.get('playerX');

      let y = this.el.querySelector('#yCoord');
      y.innerHTML = this.model.get('playerY');

    },

});

},{}],5:[function(require,module,exports){
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
    },

    enterTheGrid() {
        let input = document.getElementById('name');
        this.model.changeUser(input.value);
        input.value = '';
    },

    render() {
        let user = this.el.querySelector('#user');
        user.innerHTML = this.model.get('username');
    },

});

},{}]},{},[1])