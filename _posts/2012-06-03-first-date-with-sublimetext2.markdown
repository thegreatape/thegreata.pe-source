---
layout: post
title: "First Date With SublimeText2"
date: 2012-06-03 13:27
comments: true
published: false
categories: 
---

First thing, enabled Vintage Mode so I won't go insane without modal editing. :w seems to save things, which is kind to my hard-wired brain. 

Movement keys don't repeat by default, need to fix or I will go nuts. Turns out this is actually a Lion "feature". `defaults write -g ApplePressAndHoldEnabled -bool false` and restart ST2 to fix.

Tried using SublimeBlockCursor for a nicer command mode cursor, but didn't quite work.

Like that config and plugins is all Python. Vimscript is 100% too baroque. 

Installed [Package Control](http://wbond.net/sublime_packages/package_control) - after which I searched for and installed the zenburn theme from inside ST2, no restart needed. Slick as fuck.

Have my entire vim setup installable in a git repo with a clone and single command. Better be able to do the same with ST2. Okay, looks like they're in with all the other packages in Application Support/Sublime Text/User. Should be able to version those at least.

Fuzzy file matching that shows the preview of what it's opening is pretty great- by default, Cmd-P, seems to be rebound to Cmd-T under Vintage

Navigate by function is nice with Cmd-R, but oh god why does it make the matched target a selection? Posted on the sublime forums about it, we'll see where that goes

Default keybindings for splitting the view and shuttling tabs back and forth make my hands do the vulcan nerve pinch thing I switched away from Emacs to avoid. But to my delight, I found that the vim-style commands work- Ctrl-w s/v!