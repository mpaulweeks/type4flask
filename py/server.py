#!/usr/bin/env python

import json
import os
from flask import (
    Flask,
    request,
    render_template,
    send_file,
    send_from_directory,
)

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
        debug=True,
        host='localhost',
        port=6100,
    )

if __name__ == "__main__":
    main()
