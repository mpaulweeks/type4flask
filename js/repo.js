var store = Module("store");

(function(module){

    module.IN_STACK = 1;
    module.GOING_IN_STACK = 2;
    module.REMOVED_FROM_STACK = 3;
    module.REJECTED_FROM_STACK = 4;

    module.CATEGORIES = [
        "is_instant",
        "is_wrath",
        "is_burn",
        "is_lifegain",
        "is_creature_fat",
        "is_creature_threat",
        "is_creature",
        "is_artifact",
        "is_enchantment",
        "is_land",
        "is_counterspell",
        "is_masticore",
        "is_draw",
        "is_removal_creature",
        "is_removal_artifact",
        "is_removal_enchantment",
        "is_removal_land",
        "is_confiscate",
        "is_morph",
        "is_recurring",
        "is_cycling",
        "is_reanimate",
        "is_flash_enabler",
        "is_hard_to_kill",
        "is_stack_specific"
    ];

    module.filter_cards_by_category = function(cards, category){
        var out = [];
        for (var i = 0; i < cards.length; i++){
            var card = cards[i];
            if (card.hasOwnProperty(category) && card[category]){
                out.push(card);
            }
        }
        return out;
    };

    module.get_card_by_name = function(card_name){
        var cards = store.data.card;
        for (var i = 0; i < cards.length; i++){
            var card = cards[i];
            if (card.name == card_name){
                console.log(card);
                return card;
            }
        }
        console.log(name + " not found!")
    };

    module.get_statuses = function(card){
        var out = [];
        var statuses = store.data.status;
        for (var i = 0; i < statuses.length; i++){
            var status = statuses[i];
            if (status.card_id == card.id){
                out.push(status);
            }
        }
        return out;
    }

    module.get_status_code = function(card, datetime){
        var card_statuses = module.get_statuses(card);
        var latest_status = card_statuses[0];
        var latest_timestamp = new Date(latest_status.timestamp);
        for (var i = 1; i < card_statuses.length; i++){
            var status = card_statuses[i];
            var timestamp = new Date(status.timestamp);
            if (timestamp > latest_timestamp && timestamp < datetime){
                latest_status = status;
                latest_timestamp = timestamp;
            }
        }
        return latest_status.status;
    };

    module.get_by_date_and_status = function(datetime, status){
        var valid_cards = [];
        var all_cards = store.data.card;
        for (var i = 0; i < all_cards.length; i++){
            var card = all_cards[i];
            if (status == module.get_status_code(card, datetime)){
                valid_cards.push(card);
            }
        }
        return valid_cards;
    };

    module.get_multiverse_id = function(card){
        return store.data.multiverse[card.name.toLowerCase()];
    };

    module.get_current_cards = function(){
        return module.get_by_date_and_status(new Date(), module.IN_STACK);
    };


})(Module('repo'));