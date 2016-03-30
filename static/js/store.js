(function(module){

	var tool = Module("tool");

	var LINE = '<br/>';
	var STACK_FILE = '/db/stack.json';
	var MULTIVERSE_FILE = '/static/json/multiverse_ids.json';
	var ALL_CARDS_FILE = '/static/json/AllCards.json';
	var RANKING_FILE = '/db/ratings.json';

	module.data = null;
	module.all_cards = null;
	module.ranking_raw = null;

	module.load = function(callback, stack_file){
		callback = callback || function(){};

		stack_file = stack_file || STACK_FILE;
		var multiverse_file = MULTIVERSE_FILE;

	    $.getJSON(stack_file, function(data){
			module.data = data;
			$.getJSON(multiverse_file, function(multiverse){
				module.multiverse = multiverse;
	    		return callback();
			});
	    });
	};

	module.load_cards = function(callback, stack_file){
		var all_cards_file = ALL_CARDS_FILE;
	    $.getJSON(all_cards_file, function(data){
	    	var lower_data = {};
	    	for (var key in data){
	    		lower_data[key.toLowerCase()] = data[key];
	    	}
			module.all_cards = lower_data;
			module.load(callback, stack_file);
	    });
	};

	module.load_ranking = function(callback, stack_file){
		var ranking_file = RANKING_FILE;
	    $.getJSON(ranking_file, function(data){
			module.ranking_raw = data;
			module.load(callback, stack_file);
	    });
	};
	
})(Module('store'));
