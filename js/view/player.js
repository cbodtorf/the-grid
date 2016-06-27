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
