#!/usr/bin/env python3

import json
import os
from py.bottle import (
    BaseRequest,
    get,
    post,
    request,
    run,
    static_file,
)


@get('/favicon.ico')
def static_favicon():
    return static_file('favicon.ico', root='static/img')


@get('/css/<filename>')
def static_css(filename):
    return static_file(filename, root='static/css')


@get('/img/<filename>')
def static_img(filename):
    return static_file(filename, root='static/img')


@get('/js/<filename>')
def static_js(filename):
    return static_file(filename, root='static/js')


@get('/js/test/<filename>')
def static_test_js(filename):
    return static_file(filename, root='static/js/test')


@get('/json/<filename>')
def static_json(filename):
    return static_file(filename, root='json')


@get('/json/test/<filename>')
def static_test_json(filename):
    return static_file(filename, root='static/json/test')


@get('/')
def view_index():
    return static_file('index.html', root='static/html')


@get('/graph')
def view_graph():
    return static_file('graph.html', root='static/html')


@get('/ranking')
def view_ranking():
    return static_file('ranking.html', root='static/html')


@get('/rate')
def view_rate():
    return static_file('rate.html', root='static/html')


@get('/admin')
def view_admin_hub():
    return static_file('admin.html', root='static/html')


@get('/admin/category')
def view_category():
    return static_file('category.html', root='static/html')


@get('/admin/category_bulk')
def view_category_bulk():
    return static_file('category_bulk.html', root='static/html')


@get('/admin/status')
def view_status():
    return static_file('status.html', root='static/html')


@get('/admin/test')
def view_test():
    return static_file('test.html', root='static/html')


@post('/api/database')
def update_database():
    print ("new db received")
    database = request.json
    with open("json/database.json", "w") as current_file:
        json.dump(database, current_file, sort_keys=True, indent=4)


@post('/api/rate')
def update_ratings():
    print ("new rating received")
    with open("json/ratings.json") as current_file:
        ratings = json.load(current_file)
    record = request.json
    ratings.append(record)
    with open("json/ratings.json", "w") as current_file:
        json.dump(ratings, current_file, sort_keys=True, indent=4)


# set large post size
BaseRequest.MEMFILE_MAX = 1024 * 1024


def main():
    with open('server.pid', 'wt') as f:
        f.write(str(os.getpid()))
    run(
        # server='cherrypy',
        host='localhost',
        port=6100,
    )

if __name__ == "__main__":
    main()
