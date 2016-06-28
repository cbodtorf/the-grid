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
