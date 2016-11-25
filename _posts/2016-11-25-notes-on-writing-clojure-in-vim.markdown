---
layout: post
title: "Notes On Writing Clojure In Vim"
---

There a lot of things I like about Clojure as a language, but it requires a lot of tooling setup to not have a bad time. There's a big chunk of the Clojure community that uses Emacs and the admittedly fantastic [CIDER](https://github.com/clojure-emacs/cider) environment, but Vim salwarts who don't want to ditch years of editor customization aren't left out in the cold. It took a little more digging and research, but I managed to put together a Vim/Clojure setup with the fast feedback loop that's so important to productive Clojure dev.

What follows is annotated bits from my .vimrc - you can see the ([full source here](https://github.com/thegreatape/dot-files/blob/master/vimrc)). I'm using [Vundle](https://github.com/VundleVim/Vundle.vim) to manage my plugins.

{% highlight vim %}
Plugin 'tpope/vim-classpath'
Plugin 'tpope/vim-fireplace.git'
Plugin 'guns/vim-clojure-static.git'

autocmd Filetype clojure nmap <buffer> gf <Plug>FireplaceDjump
{% endhighlight %}

These plugins are the bare minimum you need to get going. They'll give you syntax highlighting, indentation and a bunch of useful IDE-like tools. To get the most out of these, you'll want to start a repl session in another window or tab; fireplace will automatically connect to it if present. The shortcuts I use the most:

* `K` - show docs for the function under the cursor.
* `gf` - go to source for symbol under the cursor. great for zipping around your project or diving down into a libraries source. (remapped above as `gf`, it's `[C-d` by default)
* `cpr` - evals the current buffer into the connected repl; if in a clojure.test buffer, runs the tests and prints any failures to the quickfix buffer.

{% highlight vim %}
Plugin 'guns/vim-sexp'
Plugin 'tpope/vim-sexp-mappings-for-regular-people'
{% endhighlight %}

I think structural editing of s-expressions is one of the underrated perks of working in a lisp. You can a long ways with Vim's built-in text objects (like `ci(` for change-inside-parenthesis), but these plugins let you do more advanced stuff like pushing symbols in and out of s-expresions and smartly moving expression boundaries.

{% highlight vim %}
Plugin 'guns/vim-slamhound'

autocmd Filetype clojure nnoremap <buffer> <leader>sh :Slamhound<cr>
{% endhighlight %}

[Slamhound](https://github.com/technomancy/slamhound) is an editor agnostic tool for managing Clojure namespaces' require statements—run it on a file and it'll remove unused imports and add requires for un-imported symbols. I bound it to `<leader>sh`.

{% highlight vim %}
Plugin 'dgrnbrg/vim-redl'
autocmd Filetype clojure imap <buffer> <Up> <Plug>clj_repl_uphist.
autocmd Filetype clojure imap <buffer> <Down> <Plug>clj_repl_downhist.
{% endhighlight %}

The Clojure community seems a little hostile to breakpoint debuggers for some reason, but I find them really useful. vim-redl gives you two useful things: a pretty good in-Vim repl (start one in the current file's namespace with `:ReplHere`) and actual, factual breakpoint debugging. See the project's README for the setup, but once included in your lein profile, you can use `redl.core/break` and `redl.core/continue` to debug functions run within Vim's repl session. I rebound `<Up>` and `<Down>` in insert mode to page through the command history.

{% highlight vim %}
Plugin 'kien/rainbow_parentheses.vim'
let g:rbpt_colorpairs = [
  \ ['blue',        '#FF6000'],
  \ ['cyan',        '#00FFFF'],
  \ ['darkgreen',   '#00FF00'],
  \ ['LightYellow', '#c0c0c0'],
  \ ['blue',        '#FF6000'],
  \ ['cyan',        '#00FFFF'],
  \ ['darkgreen',   '#00FF00'],
  \ ['LightYellow', '#c0c0c0'],
  \ ['blue',        '#FF6000'],
  \ ['cyan',        '#00FFFF'],
  \ ['darkgreen',   '#00FF00'],
  \ ['LightYellow', '#c0c0c0'],
  \ ['blue',        '#FF6000'],
  \ ['cyan',        '#00FFFF'],
  \ ['darkgreen',   '#00FF00'],
  \ ['LightYellow', '#c0c0c0'],
  \ ]
let g:rbpt_max = 16

autocmd BufEnter *.cljs,*.clj,*.cljs.hl RainbowParenthesesActivate
autocmd BufEnter *.cljs,*.clj,*.cljs.hl RainbowParenthesesLoadRound
autocmd BufEnter *.cljs,*.clj,*.cljs.hl RainbowParenthesesLoadSquare
autocmd BufEnter *.cljs,*.clj,*.cljs.hl RainbowParenthesesLoadBraces
{% endhighlight %}

Rainbow parentheses give you different colored parens by depth of nesting, which is a nice way to eyeball when you've got inbalanced s-expressions. The default colors didn't play great with my color scheme ([jellybeans](https://github.com/nanotech/jellybeans.vim)), so I customized the colors a bit here.

{% highlight vim %}
function! IsFireplaceConnected()
  try
    return has_key(fireplace#platform(), 'connection')
  catch /Fireplace: :Connect to a REPL or install classpath.vim/
    return 0 " false
  endtry
endfunction

function! NreplStatusLine()
  if IsFireplaceConnected()
    return 'nREPL Connected'
  else
    return 'No nREPL Connection'
  endif
endfunction

function! SetBasicStatusLine()
  set statusline=%f   " path to file
  set statusline+=\   " separator
  set statusline+=%m  " modified flag
  set statusline+=%=  " switch to right side
  set statusline+=%y  " filetype of file
endfunction

autocmd Filetype clojure call SetBasicStatusLine()
autocmd Filetype clojure set statusline+=\ [%{NreplStatusLine()}]  " REPL connection status
autocmd BufLeave *.cljs,*.clj,*.cljs.hl  call SetBasicStatusLine()
{% endhighlight %}

And lastly, I did a little customization of the status line to show whether or not Fireplace was connected to a running Clojure repl. All of the tools above will work without being connected to existing repl process—but because of the JVM's startup time, running one of their commands cold will freeze Vim while a new process is spun up to eval the code to do whatever you just asked. Running the same command with a warm repl connected is basically instant. I added some functions add either `nREPL Connected` or `No nREPL Connection` to the status line so that I remember to start a new repl before I hit K to look up some docs... and grind my teeth while Vim freezes for 10 seconds.
