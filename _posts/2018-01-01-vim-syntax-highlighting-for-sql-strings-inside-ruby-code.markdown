---
layout: post
title: Vim syntax highlighting for SQL strings inside Ruby code
image:
  thumb: ruby-sql-after.png
---


Working in Rails, it’s not uncommon to have database queries that are better off expressed without using ActiveRecord. This usually means stuffing the SQL query itself into a string, and then running it against the database using `ActiveRecord::Base.connection.execute`. Unfortunately, these queries tend to be on the large and complex side, so having a big blob of un-highlighted SQL in the middle of your Ruby code isn’t the nicest thing.

However, there’s a loose convention on many Rails projects to denote such queries as [heredoc]([https://infinum.co/the-capsized-eight/multiline-strings-ruby-2-3-0-the-squiggly-heredoc) strings starting with `<<~SQL`. I wanted to see if I could set up Vim to highlight that kind of heredoc in Ruby as SQL instead of a string. Turns out it’s possible!

## TL;DR
Put the following in `~/.vim/after/syntax/ruby.vim`

{% highlight vim %}
{% raw %}
unlet b:current_syntax
syn include @SQL syntax/sql.vim
syn region sqlHeredoc start=/\v\<\<[-~]SQL/ end=/\vSQL/ keepend contains=@SQL
let b:current_syntax = "ruby"
{% endraw %}
{% endhighlight %}

Before:

![Without syntax highlighting](/images/ruby-sql-before.png)

After:

![With syntax highlighting](/images/ruby-sql-after.png)

## Explanation
We’re using the vim [after directory](http://learnvimscriptthehardway.stevelosh.com/chapters/42.html#vimafter) to run some extra syntax highlight rules for Ruby after the regular `syntax/ruby.vim` rules have been run. We load up the sql syntax rules into a syntax group called `@SQL`, then tell Vim that any region starting with a SQL heredoc string and ending with the terminating "SQL" should be highlighed by those imported syntax rules. Not bad for a couple of lines.

So what’s with the `unlet` / `let` business? Turns out that most Vimscript syntax files have a guard clause at the top that will bail out if `b:current_syntax` is already set ([here’s the one](https://github.com/vim-ruby/vim-ruby/blob/master/syntax/ruby.vim#L13-L15) from ruby.vim). I think this is to prevent double-sourcing of the files, but I’m not 100% sure. The practical effect here is that since the sql syntax file also contains such a guard, we needed to make sure that variable was unset so that we could properly execute that file for import here. I believe that’s what going on here, anyway—this is the point where I bailed out of digging further down the rabbithole.

## Resources I found handy while figuring this out
* [This article on the VimTips wiki](http://vim.wikia.com/wiki/Different_syntax_highlighting_within_regions_of_a_file) gave me the initial idea for how this should work.
* [Learn Vimscript The Hard Way](http://learnvimscriptthehardway.stevelosh.com/chapters/45.html) has a couple great intro chapters on how Vim’s syntax highlighting works.
* [Vim syntax documentation](http://vimdoc.sourceforge.net/htmldoc/syntax.html) is the comprehensive (if dense) manual on the Vim syntax highlighting commands.
