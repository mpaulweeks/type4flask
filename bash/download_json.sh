#!/bin/sh
curl 'https://mtgjson.com/json/AllCards.json.zip' > AllCards.json.zip
unzip AllCards.json.zip -d static/json
rm AllCards.json.zip

curl 'https://mtgjson.com/json/AllPrintings.json.zip' > AllPrintings.json.zip
unzip AllPrintings.json.zip -d static/json
rm AllPrintings.json.zip
