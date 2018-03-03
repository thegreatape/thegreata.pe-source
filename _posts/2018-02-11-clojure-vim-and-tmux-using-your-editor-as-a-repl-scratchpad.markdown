---
title: "Clojure, vim, and tmux: using your editor as a repl scratchpad"
layout: post
---

I use Clojure at work, but the frequency varies—I’ll sometimes go months in between working on a project that uses it. Whenever I come back to using the language after some time away, I try to file a few sharp edges off the tooling I use around it.

Today’s goal: a better vim to repl flow for when:

1. I don’t want to simply save and source an entire file into a repl session’s memory (via [vim-fireplace](https://github.com/tpope/vim-fireplace)'s `cpr`)
2. I’m mucking around with some exploratory-type coding and the expression is getting too large to edit comfortable in the repl window itself.

Vim-fireplace has a “quasi-repl” that’s intended to let you do this kind of scratchpad code-and-eval, but it’s never worked very well for me. I usually write code inside of a [tmux](https://robots.thoughtbot.com/a-tmux-crash-course) session, with a vim window beside with a window with a shell I’m using for a repl or test running. When writing Ruby, I use [pgr0ss/vimux-ruby-test](https://github.com/pgr0ss/vimux-ruby-test) to quickly start the test for the file or line my cursor’s on. It’s super simple: rather than trying to run the test as subcommand in Vim and then show the results inside the editor, it just figures out the appropriate shell command, jams it over into the other window, and hits Enter. 

I wanted more or less this same workflow for evaluating Clojure code. If could just get Vim to send a Clojure s-expression over to a running repl wholesale at a keystroke, I could stay over in Vim editing away and run the code I’m writing without even switching windows. Lo and behold, the author of [vimux](https://github.com/benmills/vimux) had the same idea—there’s even an example config for setting this up in the project’s docs!

I’ve tweaked [the original documentation here slightly](https://github.com/benmills/vimux/blob/37f41195e6369ac602a08ec61364906600b771f1/doc/vimux.txt#L245-L273), as it had what I think was a mistake in the function (I opened a PR to change it) and I wanted to put the mappings in an autocmd group so they were only set up for Clojure files. What I would up with:


{% highlight vim %}
{% raw %}
function! VimuxSlime()
  call VimuxRunCommand(@v, 0)
endfunction

augroup clojure
  autocmd!
  " In visual mode, send the currently visually selected text to the repl with <leader>sl
  autocmd BufEnter *.cljs,*.clj,*.cljs.hl vmap <Leader>sl "vy :call VimuxSlime()<CR>
  " In normal mode, send the current block of code (that's surrounded by empty lines) to the repl with <leader>sl
  autocmd BufEnter *.cljs,*.clj,*.cljs.hl nmap <Leader>sl vip<Leader>sl<CR>
augroup END
{% endraw %}
{% endhighlight %}

Simple enough to use that hopefully I’ll remember it in between bouts with Clojure projects.
