import json

out = {}
with open("AllSets.json") as json_file:
    sets = json.load(json_file)
for card_set in sets.values():
    for card in card_set["cards"]:
        name = card["name"].lower()
        mid = card.get("multiverseid")
        if mid:
            out[name] = mid

with open("multiverse_ids.json", "w") as json_file:
    json.dump(out, json_file)