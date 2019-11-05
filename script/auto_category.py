import json
import sys

import add_category
import parse_oracle

"""
script for quickly adding new categories to stack.json

python script/auto_category.py is_planeswalker "Planeswalker -"
"""


def main(new_category, keyword):
    add_category.main(new_category)
    names = parse_oracle.main(keyword)

    with open("db/stack.json") as current_file:
        current = json.load(current_file)

    for card in current["card"]:
        if card["name"].lower() in names:
            card[new_category] = True

    with open("db/stack.json", "w") as current_file:
        json.dump(current, current_file)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print "this script takes exactly two args: category name and keyword"
    else:
        new_category = sys.argv[1]
        keyword = sys.argv[2]
        main(new_category, keyword)
