(function(module){

  var tool = Module("tool");

  var LINE = '<br/>';
  var STACK_FILE = '/db/stack.json';
  var MULTIVERSE_FILE = '/json/multiverse_ids.json';
  var ALL_CARDS_FILE = '/json/AllCards.json';
  var RANKING_FILE = '/db/ratings2018.json';

  module.data = null;
  module.all_cards = null;
  module.ranking_raw = null;

  function getTimestamp(){
    // unique to the second
    return Math.floor((new Date()).getTime() / (1000));
  }
  function getLastUpdate(){
    return '20180123';
  }
  function getJSON(url, bustCache, callback){
    const timestamp = bustCache ? getTimestamp() : getLastUpdate();
    const timestampUrl = `${url}?v=${timestamp}`;
    $.getJSON(timestampUrl, callback);
  }

  module.load = function(callback, stack_file){
    callback = callback || function(){};

    stack_file = stack_file || STACK_FILE;
    var multiverse_file = MULTIVERSE_FILE;

      getJSON(stack_file, true, function(data){
        module.data = data;
        getJSON(multiverse_file, false, function(multiverse){
          module.multiverse = multiverse;
            return callback();
        });
      });
  };

  module.load_cards = function(callback, stack_file){
    var all_cards_file = ALL_CARDS_FILE;
      getJSON(all_cards_file, false, function(data){
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
      getJSON(ranking_file, true, function(data){
        module.ranking_raw = data;
        module.load(callback, stack_file);
      });
  };

})(Module('store'));
