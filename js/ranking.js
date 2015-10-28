(function(module){

    var elo = Module("elo");

    function scoreboard_factory(){
        var api = {};
        var ledger = {};

        api.get_all = function(){
            var cards = [];
            for (var c in ledger){
                cards.push(ledger[c]);
            }
            return cards;
        };

        api.get = function(name){
            if (!ledger.hasOwnProperty(name)){
                var player = {};
                player.name = name;
                player.score = 1200;
                ledger[name] = player;
            }
            return ledger[name];
        };

        api.record = function(winner_name, loser_name){
            var winner = api.get(winner_name);
            var loser = api.get(loser_name);

            var winner_expected = elo.getExpected(winner.score, loser.score);
            var loser_expected = elo.getExpected(loser.score, winner.score);
            winner.score  = elo.updateRating(winner_expected, 1, winner.score);
            loser.score  = elo.updateRating(loser_expected, 0, loser.score);
        };

        return api;
    }

    module.process_ratings = function(ratings){
        var scoreboard = scoreboard_factory();

        ratings.forEach(function (chunk){
            var vote_data = chunk;
            if (chunk.hasOwnProperty('data')){
                vote_data = chunk.data;
            }
            vote_data.forEach(function (vote){
                var winner_name = vote.winner;
                vote.options.forEach(function (option){
                    if (winner_name != option){
                        scoreboard.record(winner_name, option);
                    }
                });
            });
        });

        return scoreboard;
    }


})(Module('ranking'));