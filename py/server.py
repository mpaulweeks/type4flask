#!/usr/bin/env python

import json
import os
from flask import (
    Flask,
    request,
    render_template,
    send_file,
)

CATEGORIES = [
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
    "is_flying",
    "is_haste",
    "is_recurring",
    "is_cycling",
    "is_reanimate",
    "is_flash_enabler",
    "is_hard_to_kill",
    "is_stack_specific",
]

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../static',
)


@app.route('/favicon.ico')
def static_favicon():
    return app.send_render_template('img/favicon.ico')


@app.route('/db/ratings.json')
def static_db_ratings():
    return send_file('../db/ratings.json')


@app.route('/db/stack.json')
def static_db_stack():
    return send_file('../db/stack.json')


@app.route('/')
def view_index():
    return render_template('index.html')


@app.route('/graph')
def view_graph():
    return render_template('graph.html')


@app.route('/ranking')
def view_ranking():
    return render_template('ranking.html')


@app.route('/rate')
def view_rate():
    return render_template('rate.html')


@app.route('/admin')
def view_admin_hub():
    return render_template('admin.html')


@app.route('/admin/category')
def view_category():
    return render_template('category.html')


@app.route('/admin/category_bulk')
def view_category_bulk():
    return render_template('category_bulk.html')


@app.route('/admin/status')
def view_status():
    return render_template('status.html')


@app.route('/admin/test')
def view_test():
    return render_template('test.html')


def get_or_create_card_by_name(db, card_name):
    lower_name = card_name.lower()
    max_id = 0
    for card in db['card']:
        max_id = max(max_id, card['id'])
        if card['name'].lower() == lower_name:
            return card
    card = {
        'id': max_id + 1,
        'name': card_name,
    }
    for category in CATEGORIES:
        card[category] = False
    db['card'].append(card)
    return card


def get_card_by_id(db, card_id):
    for card in db['card']:
        if card['id'] == card_id:
            return card
    raise Exception()


def create_status(db, card, status_code, timestamp):
    max_id = 0
    for status in db['status']:
        max_id = max(max_id, status['id'])
    status = {
        'id': max_id + 1,
        'card_id': card['id'],
        'status': status_code,
        'timestamp': timestamp,
    }
    db['status'].append(status)


@app.route('/api/status', methods=['POST'])
def status_post():
    print ("new statuss received")
    new_data = request.get_json(cache=False)
    with open("db/stack.json", "r") as current_file:
        db = json.load(current_file)
    card_names = new_data['card_names']
    for card_name in card_names:
        card = get_or_create_card_by_name(db, card_name)
        create_status(db, card, new_data['status_code'], new_data['timestamp'])
    with open("db/stack.json", "w") as current_file:
        json.dump(db, current_file, sort_keys=True, indent=4)
    return 'ok'


@app.route('/api/category', methods=['PUT'])
def category_put():
    print ("new category info received")
    changes = request.get_json(cache=False)
    with open("db/stack.json", "r") as current_file:
        db = json.load(current_file)
    for change in changes:
        card = get_card_by_id(db, change['card_id'])
        card[change['category']] = change['new_val']
    with open("db/stack.json", "w") as current_file:
        json.dump(db, current_file, sort_keys=True, indent=4)
    return 'ok'


@app.route('/api/database', methods=['POST'])
def update_database():
    print ("new db received")
    database = request.get_json(cache=False)
    with open("db/stack.json", "w") as current_file:
        json.dump(database, current_file, sort_keys=True, indent=4)
    return 'ok'


@app.route('/api/rate', methods=['POST'])
def update_ratings():
    print ("new rating received")
    with open("db/ratings.json") as current_file:
        ratings = json.load(current_file)
    record = request.get_json(cache=False)
    ratings.append(record)
    with open("db/ratings.json", "w") as current_file:
        json.dump(ratings, current_file, sort_keys=True, indent=4)
    return 'ok'


# set large post size
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024


def main():
    with open('server.pid', 'wt') as f:
        f.write(str(os.getpid()))
    app.run(
        # debug=True,
        host='localhost',
        port=6100,
    )

if __name__ == "__main__":
    main()
