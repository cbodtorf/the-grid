// Created by: Caleb Bodtorf
// Date: 6-27-2016

let GridModel = require('./model/grid');
let GridView = require('./view/grid');
let PlayerView = require('./view/player');
let Router = require('./router');




window.addEventListener('load', () => {
    console.log('hello');
    let router = new Router();

    let gmodel = new GridModel();

    let grid = new GridView({
        model: gmodel,
        el: document.getElementById('grid'),
    });

    let player = new PlayerView({
        model: gmodel,
        el: document.getElementById('player'),
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
            let input = document.getElementById('name');
            grid.model.changeUser(input.value);
            input.value = '';
        }
      }


});
