#!/bin/sh
kill `< server.pid` 
cat /dev/null > server.pid
