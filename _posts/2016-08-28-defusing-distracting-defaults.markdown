---
layout: post
title: 'Defusing Distracting Defaults: An Experiment In Automating Better Habits'
redirect_from:
- "/defusing-distracting-defaults"
---

Ever have one of those moments where you're browsing Instagram/Facebook/Twitter/whatever, realize you've burned an hour you meant to use working on something else, close the tab in disgust... then realize you've reopened the same site without even thinking about it?

Yeah. Long, uninterrupted blocks of focus are incredibly important for creative work. But for me, good intentions alone ain't gonna get me there. 

There are plenty of distracting things blockers for OS X out there: StayFocusd, Freedom, Focus, and I'm sure tons more. But none that I tried quite worked for me, and I've been trying to think about why: 

1. _Permanently blocking distractions_: Absolute blocking works for things that I actually get no value out of (Hacker News, I'm looking at you). But the most insidious stuff are sites that I sometimes get value from: keeping up with friends on Twitter, the good parts of Reddit, and so on. I still want to use them, just... deliberately and not instead of what I mean to be working on.

2. _Fixed amount of time per day_: A fixed time allowance for distraction sounds good in theory, but it doesn't prevent me from absent-mindedly opening distractions at the start of the day, which is typically when I have the most energy I'd like to spend on something else.

3. _Scheduled blocking_: I could never figure out the right schedule that wound up helping, to be honest.

Upon reflection, I think what I wanted was a mindfulness aid. Ideally, I'd have all distractions blocked by default when I open my laptop, and have a command that I run to be able to access distractions for a set period of time, reverting to blocking everything when done: a break with an enforced time limit. I could run as many of these as I want, but each time has to be a deliberate decision.

None of the existing tools quite did this, but I was able to wire up something that did. Here's how:

## 1. Install Focus

[Focus](https://heyfocus.com/) is a great distraction blocking app for OS X and well worth your money. It has two modes: scheduled blocking or manually enabled periods of blocking, neither of which are quite what I was after.

Luckily, it's scriptable. 

## 2. Install Hammerspoon and start Focus on wake

[Hammerspoon](http://www.hammerspoon.org/) is an automation tool for OS X that can watch for events and run Lua scripts in response. It's quite powerful and the APIs are pretty extensive. I set it up to start Focus upon system wake, so even if I've disabled Focus earlier or closed my laptop in the middle of a break, when I come back, Focus is running.

{% highlight lua %}
{% raw %}
--
-- ~/.hammerspoon/init.lua
-- start Focus.app on wake
--
local wakeCallback = nil
function wakeCallback(event)
  if (event == hs.caffeinate.watcher.systemDidWake) then
    hs.execute('open focus://focus')
  end
end
wakeWatcher = hs.caffeinate.watcher.new(wakeCallback)
wakeWatcher:start()
{% endraw %}
{% endhighlight %}

## 3. Set up unfocus break script

The final piece is a script I wrote myself—it turns off blocking for a fixed period, then re-enables it at the end, keeping me from turning what I meant to be 5 minutes of break into a lost hour or two. 

Put the following somewhere on your path and make it executable:

{% highlight ruby %}
{% raw %}
#!/usr/bin/env ruby

def unfocus(remaining)
  `open focus://unfocus`
  while remaining > 0
    print ">> Unfocused, refocusing in #{format_time remaining}     \r"
    remaining -= 1
    sleep 1
  end
end

def format_time(remaining)
  "%02d:%02d" % remaining.divmod(60)
end

def refocus
  puts "\nBreak over!"
  `open focus://focus`
end

begin
  unfocus((ARGV[0] || 15).to_i * 60)
  refocus
rescue Interrupt => e
  refocus
  exit
end
{% endraw %}
{% endhighlight %}

The break defaults to 15 minutes, but you can pass a custom number as an argument to the script (so `unfocus 5` gives you a 5 minute break). When run, it'll display a countdown timer of how long your break has remaining, then exit and re-enable Focus. It'll even re-enable Focus if you accidentally kill the script while it's running.

And that's it! I've just gotten this set up today, but I'm pleased with how it's working so far. Time will tell if it's a good long-term solution for me.

_Updated Feb 26th, 2017: A previous solution here used [sleepwatcher](http://www.bernhard-baehr.de/), but it began starting slowly after upgrading to Sierra. I replaced it with with Hammerspoon._
