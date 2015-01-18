---
layout: post
title: "Emacs and Evil-mode: Field Notes"
---

Back in December, I started experimenting with getting Emacs set up to use Vim-style modal editing. I'd started looking at learning Clojure more deeply and [CIDER](https://github.com/clojure-emacs/cider) is the most popular editing environment for Clojure, so I felt like I owed it at least a look. Additionally, there are some parts of the Emacs philosophy I agree with, namely that your tools should evolve with you and become deeply customized to you over time.

But—and this is a big but—I couldn't imagine leaving modal editing behind. Some background on my editing history: I used Emacs when I learned to program in college, writing Java, C++, Python with Emacs on various flavors of Linux. Ironically, I barely customized my setup at all beyond cargo-culting a few different keybindings and major modes. It wasn't until about five years ago that some colleagues of mine convinced me to try out Vim instead. The idea that Vim's [modal editing is a language](http://stackoverflow.com/questions/1218390/what-is-your-most-productive-shortcut-with-vim/1220118#1220118) clicked with me and sounded a lot easier on the wrists than Emacs key-chords. I spent a weekend getting up to speed with vimtutor and have been slowly customizing my way into a more harmonious environment ever since.

Fast-forward five years, and articles on evil-mode started to make the rounds. Despite some skepticism—there are many vim emulation plugins, and they are never quite right—I began to wonder if I could get the best of both worlds: a deeply customizable editing environment *and* modal editing. The Clojure community's preference for CIDER was a great excuse to try things out.

I used a couple blog posts as tutorials to start from and went from there:

* [Emacs as my leader](http://bling.github.io/blog/2013/10/27/emacs-as-my-leader-vim-survival-guide/) 
* [Towards a Vim-like Emacs](http://nathantypanski.com/blog/2014-08-03-a-vim-like-emacs-config.html)
* [From Vim to Emacs+Evil chaotic migration guide](http://juanjoalvarez.net/es/detail/2014/sep/19/vim-emacsevil-chaotic-migration-guide/)

### What I Learned: The Highlights

**Evil mode is actually that good:** Any vim user who's tried to use a vim-emulation plugin in other editors knows that they always fall jarringly short. Evil-mode... doesn't. Text objects? Check. Visual block mode? Check. Registers? Check. Macros? Check. You really can sit down with Emacs, run `(evil-mode t)` and edit text in a completely unsurprising way. This is impressive as hell.

What's more, evil-mode doesn't lock you into the default vim keybindings and in fact makes customizing pretty easy. I was able to define custom normal-mode evil keys for various language modes after just a few quick tutorials.

**Plugin management is much better than I remember**: The Emacs package manager package.el wasn't a default part of Emacs until 24.0, well after I switched to Vim. Being able to install a plugin with a single command was great, but I wanted something a bit closer to [Vundle](https://github.com/gmarik/Vundle.vim) that would help me keep my plugins synced across two laptops.

Behold: [use-package](https://github.com/jwiegley/use-package) works like Vundle with the `:ensure t` argument. It also allows you to make sure the package is required before executing your configuration code it. Weirdly, I needed to install one package with "M-x install <whatever>" before the `(use-package <whatever> :ensure t)` would install things automatically on boot. Thereafter, I could just write the use-package expression in my config file and eval it with `C-x C-e` to install and initialize things.

**Elisp isn't awful**: Emacs isn't so much configured by Elisp as it is a giant Elisp REPL. Everything, from keypressed on up, is handled by calling Elisp functions, and you can customize how Emacs works by writing further Elisp. I found it a lot easier to pick up and start writing customization code in Elisp than I did in Vimscript.

The degree to which Emacs is self-documenting was unexpectedly nice. `M-x describe-function` over an Elisp symbol will bring up its documentation. I bound this to `K` in evil-normal-mode as suggested by one of the above tutorials, and it's a really great way to pikc part sample code and figure out how it works. Similarly, `M-x describe-key` super useful for figuring out what function a particular Emacs-style shortcut is calling, and then binding it to your own evil-flavored settings.

**Nothing is quite as good as Ctrl-P**: A fast fuzzy file matcher is something I can't live without, and I struggled to find something to replace [Ctrl-P](https://github.com/kien/ctrlp.vim). The [projectile]() project management plugin can be configured to use various file matching plugins, but none of them were without issues:

* [ido-flx](https://github.com/lewang/flx) was just straight-up too slow for matching on a large project (just under 7k files). I tried setting a higher GC threshold and lowering the number of candidates needed before the fuzzy matching would kick in, per the flx [README](https://github.com/lewang/flx/blob/master/README.md), but it still was too laggy to use at work.

* [grizzl](https://github.com/grizzl/grizzl) I couldn't get working at all. I ran into [this issue](https://github.com/bbatsov/projectile/issues/200) with a `Symbol's function definition is void: exitfun` error being thrown and didn't find a solution. 

* [helm](https://github.com/emacs-helm/helm) came the closest. It was acceptably fast on a large project, though still noticeably slower than Ctrl-P. The completion algorithmwas a bit different than what I'm used to; it used spaces to break in between tokens instead of an implict `.*` after each character—so if searching for `app/models/file.rb` you'd use `ap mo fil` instead of `apmofil`. I wound up actually liking that better after a few days. Unfortunately, it would occasionally [crash the vanilla OS X build of Emacs](https://github.com/bbatsov/projectile/issues/600). This is apparently an Emacs bug and is purported to be fixed in the [emacs-mac-port build](https://github.com/railwaycat/emacs-mac-port) but I haven't stress-tested to be sure.

**Evil-matchit just didn't work with Ruby**: I write Ruby by day, and Vim's [matchit](https://github.com/tmhedberg/matchit) lets me use `%` to hop between `do`/`end` or `def`/`end` blocks in Ruby as well parentheses, curly braces and so on. It's really amazing useful for code navigation, especially so if the work you're working with doesn't exactly hew to the idea of small methods. I was delighted that the Emacs [evil-matchit](https://github.com/redguardtoo/evil-matchit) had Ruby support, but unfortunately, it just doesn't seem to work. Hitting `%` on a block inside a method would take me to the block before the selected block, or to the top of the method, or to the beginning of the line I was on—essentially anywhere that wasn't where it should have gone.

### Two Months Later

For now, I'm putting my Emacs configuration aside for a bit. I'm impressed with Evil, but feel a bit low on energy and like there's too much [yak-shaving](http://www.hanselman.com/blog/YakShavingDefinedIllGetThatDoneAsSoonAsIShaveThisYak.aspx) ahead before I'm really comfortable back in Emacs. Moreover, I want to focus on just learning Clojure and its idioms without having to wrestle with learning and customizing a totally new editing environment at the same time. I started using Tim Pope's [vim-fireplace](https://github.com/tpope/vim-fireplace) for working with Clojure, which seems to works well enough, even if it's not quite a real embedded REPL.

I do want to come back to this experiment someday. I feel like the issues I ran into should be tractable with more time and focus, and there are some plugins like [org-mode](http://orgmode.org/) that I really want to explore. The work I put in to get as far as I did is [versioned along with the rest of my dot-files](https://github.com/thegreatape/dot-files), so hopefully the next time around I can just pick up where I left off.
