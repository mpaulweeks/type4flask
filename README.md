# type4flask

Website with info about my personal Type 4 Stack

Most sorting/graphing/logic done via js in browser (originally built as purely static website)

Webserver built in Python3 using Bottle

- http://www.type4stack.com
- http://type4.mpaulweeks.com

### todo

- Refactor db/rating to save space (group by username)
- Leverage flask templates
- Load db server side to prevent browser caching issues
- Admin pages require password?
- Support custom stacks:
    - Context switch via cookie and admin page
    - Store in same db, just modify status “table”
