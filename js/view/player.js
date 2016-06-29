/*******************************
* VIEW (player)
* (grid):: input for name
********************************/

module.exports = Backbone.View.extend({

    initialize() {
        this.model.on('change', this.render, this);
    },

    events: {
        'click #enter': 'enterTheGrid',
        'click #changeName': 'nameChange',
        'click .char': 'characterSelect',
        'focus .char': 'characterSelect',
    },

    enterTheGrid() {
          let hiddenCheck = document.getElementById('enter');

          if (!hiddenCheck.classList.contains('hidden')) {
            this.model.trigger('play');
            location.href = "#game";
          }
    },

    nameChange() {
      let input = document.getElementById('name');
      if (input.value !== '') {
        this.model.changeUser(input.value);
        input.value = '';
      }
    },

    characterSelect() {
      let images = document.querySelectorAll('.char');
      let showEnter = document.getElementById('enter');
      let char = document.activeElement;

      //reset selection on view
      images.forEach(function(e){
        e.classList.remove('sel');
      })
      this.model.changeCharacter(char.id);
      char.classList.toggle('sel');
      showEnter.classList.remove('hidden');
    },


    render() {
        let user = this.el.querySelector('#user');
        user.innerHTML = this.model.get('name');

        let char = this.model.get('playerType');
        let charClass = document.getElementById('charClass')
        charClass.innerHTML = char;
    },

});
