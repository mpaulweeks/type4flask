#!/usr/bin/env python3

import os
from py.bottle import (
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
    return static_file('index.html', root='html')


@get('/admin/category')
def view_category():
    return static_file('category.html', root='html')


@get('/admin/category_bulk')
def view_category_bulk():
    return static_file('category_bulk.html', root='html')


@get('/graph')
def view_graph():
    return static_file('graph.html', root='html')


@get('/ranking')
def view_ranking():
    return static_file('ranking.html', root='html')


@get('/rate')
def view_rate():
    return static_file('rate.html', root='html')


@get('/admin/status')
def view_status():
    return static_file('status.html', root='html')


@get('/admin/test')
def view_test():
    return static_file('test.html', root='html')


@post('/admin/database')
def update_database():
    database = request.json
    print (database)


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
