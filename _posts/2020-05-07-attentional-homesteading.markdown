---
layout: post
title: Attentional Homesteading
---

It’s funny. When people talk about how technology distracts us or hijacks our attention, the first thing that comes up is smartphones. Which, sure: they’re a hotbed of dings for your attention and apps with weaponized endless scrolling competing for a slice of your eyeballs’ time. But for me, my phone isn’t attention span enemy number one. I have push notifications nearly globally disabled and it’s pretty easy for me to leave it out of sight and reach when I want to sit down and focus. My nemesis is a little different.

It’s that damn desktop web browser url autocomplete.

I can’t do large swathes of my work without the internet; forget looking up APIs, it’s where my email client, Github, Trello etc all live. With all that necessarily happening in a browser, all the worst distractions for me are just a keystroke away. The autocomplete in most browsers sorts by most visited, so if I hit `Option-l t` and bam—there’s Twitter one `Enter` away at the top of the list.

There’s a plethora of site blocking/limiting apps out there, of course. Or just the [good old /etc/hosts trick](https://lifehacker.com/how-to-really-block-distracting-websites-with-your-ho-1831493194). I’ve tried them, and they usually have a backfiring effect: I don’t even like cake all that much, but if you told me I could *never* have it again, I’m gonna start wanting some cake. 

So, I tried a different strategy. Instead of outright blocking, I wrote a [small Firefox extension](https://github.com/thegreatape/homestead) to automatically prune a list of distracting domains from my history.  Now when I focus that browser address bar, hitting a single letter doesn’t pull up a list of distractions. I can still visit them anytime I want; I just have to type out the full url, every time. That little bit of friction goes a long way towards making visiting a particular site into a decision rather than a reflex.

Why’d I write my own? There’s a plethora of extensions that purport to do the same history scrubbing. But there’s always a risk with a third-party extension that it’ll do something malicious, like harvesting your info for sale.

It wasn’t hard. Most of the code here was readily adaptable from the tutorials, and I know Javascript moderately well. And now I’ve got a simple thing that makes the information environment that I spend a great deal of time in a bit more habitable. To me, this is software at its best: something uniquely fitted to an individual, amplifying a positive or toning down a negative. A humble Jobsian bicycle for the mind. I love the idea of individualized fleets of this kind of thing: small, personalized bits of code to help each of us live our digital lives a little more deliberately.

And this is where that ideal runs into the reality of modern platforms.

I think about the essay [An App Can Be A Home-Cooked Meal](https://www.robinsloan.com/notes/home-cooked-app/) a lot. I love the idea of little purpose-built mobile apps for myself or my friends and family. But Apple can remove an app at any time: certainly by removing it from the store or tools like Testflight, and potentially by yanking it from running devices ([they did it on the Mac platform when Zoom was misbehaving](https://techcrunch.com/2019/07/10/apple-silent-update-zoom-app/)). Android is a little more open, but anything using Google Play has to cede a similar level of control. I just can’t get excited about working in an environment where someone else can just say “nope, you don’t get to do that- even just for yourself.”

The same is true for my new browser extension. If I want to not have to manually load my extension every time I open Firefox anew, I have to get it signed by Mozilla, which does have an approval process. They can revoke it at any time, and the extension will stop working. This is for security. I get it: I literally wrote my own because of the risk of someone else’s extension doing something bad. Being able to blacklist bad actors is pretty important in the modern day and age. And Mozilla has zero reason to blacklist my little one-person extension.

But still, someone else has ultimate control over the tools I’m using to carve out better headspace for myself.

And yes: Firefox is open source, so I could in theory fork it, patch it and build a version of it just for me without these limitations. But the effort involved in doing so, let alone the ongoing effort to maintain those patches against upstream releases (which, again, security) is absolutely not worth it.

I’m acutely aware of the tradeoffs here. But it still makes a part of me sad.



