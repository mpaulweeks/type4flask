
function test_ranking(callback){

    var TEST_FILE = "json/stack/2015-10-04.json";
    var tester = Module("tester").create("ranking", callback);
    var store = Module("store");
    var ranking = Module("ranking");

    function tests(){

        var ratings = store.ranking_raw;
        var scoreboard = ranking.process_ratings(ratings);
        tester.assert(
            "Teferi is doing well",
            scoreboard.get('Teferi, Mage of Zhalfir').score > 0,
            JSON.stringify(scoreboard)
        );

        tester.close();
    };

    store.load_ranking(tests, TEST_FILE);
}