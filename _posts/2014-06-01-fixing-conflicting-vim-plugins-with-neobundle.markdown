---
layout: post
title: Fixing conflicting Vim plugins with NeoBundle
redirect_from:
- "/fixing-conflicting-vim-plugins-with-neobundle"
---

I started [messing around with Clojure](http://www.braveclojure.com/) this weekend and quickly discovered that something in my Vim setup was causing parentheses matching with `%` to not work quite right. The output in the statusbar showed a call to [ruby-matchit](https://github.com/vim-scripts/ruby-matchit), a plugin that lets you jump between between the start and end of blocks and method definitions in Ruby. As wonderful as that is, I certainly don't need it while editing Clojure.

As it turns out, there's a fork of the [Vundle](https://github.com/gmarik/Vundle.vim) plugin manager called [NeoBundle](https://github.com/Shougo/neobundle.vim) that supports lazy loading and initialization of plugins. You can do this with the following in your `.vimrc`:

{% highlight vim %}
NeoBundleLazy 'vim-scripts/ruby-matchit'
autocmd FileType ruby NeoBundleSource ruby-matchit
{% endhighlight %}

Switching to NeoBundle from Vundle was a breeze, and now vim-matchit only loads when I open Ruby files. Hooray!
