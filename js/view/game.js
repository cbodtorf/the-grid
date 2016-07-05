/*******************************
* VIEW (game)
* (grid):: keypress movement aka. TRAVERSING THE GRID
********************************/


module.exports = Backbone.View.extend({

    initialize() {
        this.model.on('change', this.render, this);

        let superGrid = document.getElementById('gameboard');
        for(var y =1; y <= 10;y++){
          let row = document.createElement('DIV');
          row.id = `y${y}`;
          row.className = 'row';
          superGrid.appendChild(row);
          for(var x= 1; x <= 10; x++){
            let cell = document.createElement('DIV');
            cell.id = `${row.id}x${x}`;
            cell.className = 'col';
            row.appendChild(cell);
          }

        }
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
      let ypos = this.model.get('Y');
      let xpos = this.model.get('X');

      let x = this.el.querySelector('#xCoord');
      x.innerHTML = xpos;

      let y = this.el.querySelector('#yCoord');
      y.innerHTML = ypos;

      //position on grid
      let coords = `y${ypos}x${xpos}`;
      let gridPos = this.el.querySelector(`#${coords}`);
      
      gridPos.classList.toggle('gsel');

      let energy = this.el.querySelector('#energy');
      energy.innerHTML = this.model.get('energy');

      let score = document.getElementById('scoreG');
      score.innerHTML = this.model.get('score');


    },

});
