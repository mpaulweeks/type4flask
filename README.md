# type4flask

Website with info about my personal Type 4 Stack

Most sorting/graphing/logic done via js in browser (originally built as purely static website)

Webserver built in Python3 using Bottle

- http://www.type4stack.com
- http://type4.mpaulweeks.com

### to update cards

```bash
# confirm the two overwrites, then it commits to git
./bash/update_json.sh
```

### todo

- host static files with nginx
- Look into ways to simplify update process
  - Stop storing all json files in git?
  - Tell server to pull latest files straight from mtgjson?
- Refactor db/rating to save space (group by username)
- Leverage flask templates
- Admin pages require password?
- Support custom stacks:
    - Context switch via cookie and admin page
    - Store in same db, just modify status “table”
