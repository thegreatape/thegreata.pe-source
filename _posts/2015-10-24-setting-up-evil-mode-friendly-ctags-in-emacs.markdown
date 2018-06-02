---
layout: post
title: Setting Up Evil-Mode Friendly Ctags in Emacs
redirect_from:
- "/setting-up-evil-mode-friendly-ctags-in-emacs"
---

Despite my [failed experiment](/emacs-and-evil-mode-field-notes/) with evil-mode back in January, I wound up switching over to evil-powered Emacs full time earlier this summer. I love having modal editing combined with truly deep extensibility, and I've been focusing my tweaking on changes that let Emacs help me explore and understand code faster.

[Ctags](http://ctags.sourceforge.net/) is a program that can parse code in many different language and generate an index of defined symbols—stuff like class names, method names, constants and so on. Text editors can be configured to use this index to do things like jump to where a particular symbol is defined (instead of just grepping for where the symbol occurs).

Here's how I set up Ctags in Emacs.

## Install Ctags

OS X ships with an older version of Ctags that can't generate a tags index in the format that Emacs expects. I installed the latest version via Homebrew:

{% highlight bash %}
{% raw %}
brew install ctags
{% endraw %}
{% endhighlight %}

## Tag Generation

Tags can be generated on the command line pretty easily—`ctags -Re` will recursively parse and index all files below the current directory, in Emacs format. However, it's handy to be able to regenerate them from within Emacs, especially if you're switching git branches and want to quickly purge stale tags. The following lets me that do for the current [projectile](http://batsov.com/projectile/) project with `M-x regenerate-tags`:

{% highlight emacs-lisp %}
{% raw %}

(defun regenerate-tags ()
  (interactive)
  (let ((tags-directory (directory-file-name (projectile-project-root))))
    (shell-command
     (format "ctags -f %s -e -R %s" tags-file-name tags-directory))))

{% endraw %}
{% endhighlight %}

Rather than re-running this on the entire project whenever a file changes, I used the `ctags-update` package to do so incrementally on save. I'm just enabling it for when I'm in `enhanced-ruby-mode` right now.

{% highlight emacs-lisp %}
{% raw %}
(use-package ctags-update
  :ensure t
  :config
  (progn
    (add-hook 'enh-ruby-mode-hook 'turn-on-ctags-auto-update-mode)))
{% endraw %}
{% endhighlight %}

## Tag Navigation

Now that we can generate and update a tags file, we can start using it to explore our code faster. I've found the following keys in normal mode:

* `gf` goes to the first match for the tag under the cursor. If I've got the symbol `User` under the cursor, I can hit `gf` and go to where the `User` class or module is defined.
* `gn` goes to the next match—if there are multiple matching tags (e.g. I've got multiple `User` classes in the same project), this cycles to the next one.
* `gb` pops me back to where I was before jumping.

{% highlight emacs-lisp %}
{% raw %}
(define-key evil-normal-state-map (kbd "gf")
  (lambda () (interactive) (find-tag (find-tag-default-as-regexp))))

(define-key evil-normal-state-map (kbd "gb") 'pop-tag-mark)

(define-key evil-normal-state-map (kbd "gn")
  (lambda () (interactive) (find-tag last-tag t)))
{% endraw %}
{% endhighlight %}

## Tag Search

Using a fuzzy matcher to search through the tags index is a great way to zip around a codebase. I use [Helm](https://emacs-helm.github.io/helm/) for as-you-type filtering for all sorts of things—emacs functions, project files, and now, tags! I bound Helm's built-in tag filter to `<leader>y`:

{% highlight emacs-lisp %}
{% raw %}
(evil-leader/set-key "y" 'helm-etags-select)
{% endraw %}
{% endhighlight %}

The default behavior of the filtering left something to be desired, however. Matching tag candidate were sorted alphabetically, which mean that if I was looking for the module Searchable, the results would look like this (with the top item selected):

{% highlight bash %}
*AuthorSearchable*
BookSearchable
Searchable
{% endhighlight %}

What I really wanted was the closest item to my search to be on top. As it turns out, the shortest string that still matches the filtering text winds up being a decent hueristic for this. I did a bit of poking around in the helm-etags source, and found an empty function that's meant to allow users to define their own custom behavior for Helm sources. Perfect!

{% highlight emacs-lisp %}
{% raw %}
(defun my-etags-sort-function (candidates source)
  (sort candidates (lambda (a b) (< (length a) (length b)))))

(defmethod helm-setup-user-source ((source helm-source))
  (when (equal (oref source :name) "Etags")
    (oset source :filtered-candidate-transformer 'my-etags-sort-function)))
{% endraw %}
{% endhighlight %}

Now, when I run the above search, the module I was looking for is on top and selected by default:

{% highlight bash %}
*Searchable*
BookSearchable
AuthorSearchable
{% endhighlight %}

There's still more to tweak—the Emacs motto, I think—but I'm pretty pleased with my tags setup so far.
