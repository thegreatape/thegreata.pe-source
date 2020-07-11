---
layout: post
title: Vim syntax highlighting for SQL strings inside Python code
---

A few years ago, I shared a bit of Vimscript for [highlighting SQL strings inside Ruby code](https://thegreata.pe/articles/2018/01/01/vim-syntax-highlighting-for-sql-strings-inside-ruby-code/). Fast forward to today: I've been doing a bunch of ETL work recently using [Apache Airflow](https://airflow.apache.org/), which is written in Python. That means a bunch of SQL queries embedded in Python strings, and I wanted to see about getting some highlighting on them for easier visual parsing.

In the Ruby version, I relied on the convention of using `<<-SQL` heredoc strings to differentiate  between regular strings and ones containing SQL queries. In Python, I had to get slightly more clever: this will treat any triple quotes-delimited string as SQL if it starts with a valid SQL keyword (e.g. `select`, `alter`, etc). That might not always be true in your case, but it works pretty well for the very SQL-heavy Python work I've been doing.

Drop this in `~/.vim/after/syntax/python.vim`:

```vim
unlet b:current_syntax

syn include @SQL syntax/sql.vim
syntax region sqlPythonString 
      \ matchgroup=SpecialComment 
      \ start=~\z('''\|"""\)\_s*\(ALTER\|BEGIN\|CALL\|COMMENT\|COMMIT\|CONNECT\|CREATE\|DELETE\|DROP\|END\|EXPLAIN\|EXPORT\|GRANT\|IMPORT\|INSERT\|LOAD\|LOCK\|MERGE\|REFRESH\|RENAME\|REPLACE\|REVOKE\|ROLLBACK\|SELECT\|SET\|TRUNCATE\|UNLOAD\|UNSET\|UPDATE\|UPSERT\|WITH\)~ 
      \ end=+\z1+ 
      \ contains=@SQL

let b:current_syntax = 'python'
```

Results:

![Python string with SQL syntax highlighting applied](/images/sql-python-screenshot.png)
