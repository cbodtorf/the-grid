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
