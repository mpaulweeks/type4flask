#!/bin/sh
source venv/bin/activate
touch server.pid
python -m py.server
