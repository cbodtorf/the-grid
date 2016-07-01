/*******************************
* Collection (highscore)
* (model):: highscore
* (role):: fetch array of highscores from server
********************************/

let HighscoreModel = require('./highscore');


module.exports = Backbone.Collection.extend({

    url     : 'http://grid.queencityiron.com/api/highscore',
    model   : HighscoreModel,

})
