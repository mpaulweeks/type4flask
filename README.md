# type4flask

Website with info about my personal Type 4 Stack

Most sorting/graphing/logic done via js in browser (originally built as purely static website)

Webserver built in Python3 using Bottle

- http://www.type4stack.com
- http://type4.mpaulweeks.com

### to update cards

- copy over new files for AllCards.json and AllSets.json
- ```python script/multiverse_gen.py```
- add to git and push to `deploy`
- ssh into server, cd into `type4flask/`
- `git pull`
- refresh the page

### todo

- Look into ways to simplify update process
  - Stop storing all json files in git?
  - Tell server to pull latest files straight from mtgjson?
- Refactor db/rating to save space (group by username)
- Leverage flask templates
- Load db server side to prevent browser caching issues
- Admin pages require password?
- Support custom stacks:
    - Context switch via cookie and admin page
    - Store in same db, just modify status “table”
