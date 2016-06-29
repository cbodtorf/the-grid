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
