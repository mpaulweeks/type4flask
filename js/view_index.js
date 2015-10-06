(function(module){

    var tool = Module("tool");
    var repo = Module("repo");
    var autocard = Module("autocard");

    var str_format = tool.str_format;
    function get_img_url (card){
        return tool.get_img_url(repo.get_multiverse_id(card));
    }

    var header = '<h3 class="cardlist-title">{1}</h3>';
    var cardlist = '<div class="cardlist" data-art="false">{1}</div>';
    var toggle_button = '<button class="toggle" id="toggle_{1}">toggle image view</button>';
    var card_count = '<span>{1} cards</span>';
    var cardlistdisplay = '<div id="cardlistdisplay_{1}" class="cardlistdisplay"></div>';
    var card_img_template = '<a href="http://magiccards.info/query?q={1}" target="_blank"><img class="cardimage" alt="{1}" src="{2}"><img/></a>';
    var card_text_template = '<div><a href="http://magiccards.info/query?q={1}" class="mtgcard" target="_blank">{1}</a></div>';
    var filter_table = (
        '<tr class="{5}">' +
        '<td class="text-right col-md-1">{1}</td>' +
        '<td class="text-right col-md-1">{2}%</td>' +
        '<td class="text-center"></td>' +
        '<td>{3}</td>' +
        '<td><a href="{4}">Filter</a></td>' +
        '</tr>'
    );
    var INDEX_LINK = '{1}?{2}{3}';

    var status_names = repo.STATUS_NAMES;

    //this module shouldn't persist more than one request
    var request = {};
    request.card_img = {};
    request.date = tool.now();
    request.custom_date_string = null;
    request.category = null;

    function get_img_tag(card){
        return str_format(card_img_template, card.name, get_img_url(card));
    };

    function get_text_tag(card){
        return str_format(card_text_template, card.name);
    };

    function get_cards(status){
        var cards = repo.get_by_date_and_status(request.date, status);
        var category = request.category;
        if (category){
            cards = repo.filter_cards_by_category(cards, category);
        }
        return cards;
    }

    function get_card_html(status, image){
        var card_html = "";
        var cards = get_cards(status);
        for (var i = 0; i < cards.length; i++){
            var card = cards[i];
            var tag = get_text_tag(card);
            if (image){
                tag = get_img_tag(card);
            }
            card_html += tag;
        }
        return card_html;
    };

    function toggle_images(status){
        var show_image = !request.card_img[status];
        request.card_img[status] = show_image;

        var card_html = get_card_html(status, show_image);
        var div = $("#cardlistdisplay_" + status);
        div.html(card_html);
        if (show_image){
            div.removeClass("columned");
        } else {
            div.addClass("columned");
        }
    };

    function display_status(status){
        var cards = get_cards(status);
        var header_html = str_format(header, status_names[status]);
        var inner_html = (
            str_format(toggle_button, status) +
            str_format(card_count, cards.length) +
            str_format(cardlistdisplay, status)
        );
        var list_html = str_format(cardlist, inner_html);
        $("#main_list").append(header_html + list_html);

        request.card_img[status] = true;
        $("#toggle_" + status).click(function(){
            toggle_images(status);
        });
        toggle_images(status);
        autocard.init();
    };

    function index_url(category, date_string){
        var prefix = tool.is_local ? "index.html" : "";
        var category_id = category == null ? "" : "category=" + category;
        var timestamp = date_string == null ? "" : "timestamp=" + date_string;
        if (category && timestamp){
            timestamp = "&" + timestamp;
        }
        return str_format(INDEX_LINK, prefix, category_id, timestamp);
    }

    function display_filter_row(cards, category){
        var total_cards = cards.length;
        if(category){
            cards = repo.filter_cards_by_category(cards, category);
        }
        var percentage = parseInt(100*cards.length/total_cards);
        var css_class = category == request.category ? "success" : "";
        var label = category == null ? 'Total' : category;
        var row_html = str_format(filter_table,
            cards.length, percentage, label, index_url(category, request.custom_date_string), css_class
        );
        $('#filter_categories').append(row_html);
    };

    function display_dates(){
        var html = '<div><a href="{1}">{2}</a></div>';
        var dates = repo.get_relevant_dates();
        var sorted_keys = Object.keys(dates);
        sorted_keys.sort(function (a,b){
            return dates[b] - dates[a];
        });
        for (var i = 0; i < sorted_keys.length; i++){
            var key = sorted_keys[i];
            var date = dates[key];
            var date_string = tool.str_format('{1}-{2}-{3}', date.getFullYear(), date.getMonth()+1, date.getDate());
            var url = index_url(request.category, date_string);
            var label = key;
            $('#dates').append(str_format(html, url, label));
        }
    };

    module.run = function(){
        var category = tool.read_url_param("category");
        request.category = category ? category : null;
        var timestamp = tool.read_url_param("timestamp");
        if (timestamp){
            request.date = tool.date_from_string(timestamp);
            request.custom_date_string = timestamp;
        }

        var title_date = request.custom_date_string ? request.date.toDateString() : "TODAY";
        $('#title').html("Stack as of " + title_date);

        for (var status in status_names){
            display_status(status);
        }

        var in_cards = repo.get_by_date_and_status(request.date, repo.IN_STACK);
        display_filter_row(in_cards);
        for (var i = 0; i < repo.CATEGORIES.length; i++){
            display_filter_row(in_cards, repo.CATEGORIES[i]);
        }

        display_dates();
    };

})(Module('view_index'));
