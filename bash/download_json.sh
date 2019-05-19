#!/bin/sh
curl 'https://mtgjson.com/json/AllCards.json.zip' > AllCards.json.zip
unzip AllCards.json.zip -d static/json
rm AllCards.json.zip

curl 'https://mtgjson.com/json/AllSets.json.zip' > AllSets.json.zip
unzip AllSets.json.zip -d static/json
rm AllSets.json.zip
