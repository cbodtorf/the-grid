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
        'click .char': 'characterSelect',
        'focus .char': 'characterSelect',
    },

    enterTheGrid() {
        let input = document.getElementById('name');
        if (input.value !== '') {
          this.model.changeUser(input.value);
          input.value = '';
          this.model.trigger('play');
          this.model.trigger('submit');
          location.href = "#game";
        }
    },

    characterSelect() {
      let images = document.querySelectorAll('.char');
      let char = document.activeElement;
      images.forEach(function(e){
        e.classList.remove('sel');
      })
      this.model.changeCharacter(char.id);
      char.classList.toggle('sel');
    },


    render() {
        let user = this.el.querySelector('#user');
        user.innerHTML = this.model.get('username');

        let char = this.model.get('character');
        let charClass = document.getElementById('charClass')
        charClass.innerHTML = char;
        // char.id.classList.toggle('sel');
    },

});
