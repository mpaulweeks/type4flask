#!/bin/sh
./bash/download_json.sh

python script/multiverse_gen.py

git add .
git commit -m 'update mtg.json'
git push
