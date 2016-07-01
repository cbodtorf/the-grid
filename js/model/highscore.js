/*******************************
* MODEL (highscore)
* (highscore):: highscore to be sent to server
* (collection):: connected to highscore.collection.js
********************************/

module.exports = Backbone.Model.extend({


    url: 'http://grid.queencityiron.com/api/highscore',

    defaults: {
      name        : '',
      score       : 0,
      playerType  : '',
    },

})
