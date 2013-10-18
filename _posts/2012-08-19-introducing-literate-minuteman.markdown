---
layout: post
title: "Introducing Literate Minuteman"
date: 2012-08-19 17:37
comments: true
categories: 
---

It's a little odd to be writing an introduction to something I've been actively working on and using for the better part of a year. I think I've fallen into the trap of wanting to add just one more thing and polishing that one feature before showing the world what I've made. 

So, hello world. Here's [Literate Minuteman](http://minuteman.zen-hacking.com). It's a free service to check the books on your [Goodreads](http://www.goodreads.com) to-read list against your local library's catalogue, letting you know which books are available and where, right now. 

You can use it to see which books the whole library system has, or those at just a particular branch, or those at a particular set of branches—for example, those closest to your house. You can also use custom lists from Goodreads; instead of my to-read list, I'm using a list that has everything I've been meaning to read, but don't actually own.

Right now, the supported library systems are the BPL and Minuteman networks in the greater Boston area and the Orange County system in North Carolina. This is simply because I live in Boston and have friends and family in Orange County, so that's what I've written so far! I've tried to create a set of helpers to make it pretty easy to add new libraries: it just requires a bit of Ruby code and the library to have a publicly accessible catalog search on the web. Both [pull requests on Github](https://github.com/thegreatape/literate-minuteman) and alcoholic bribes are encouraged ways to get your local library supported. 

There's a ton of improvements I'm working on, particularly:

* Better mobile support. The site's workable on a smartphone right now, but the design could be more responsive and badly needs offline support. The Cambridge main library's science fiction section is in the basement and, as far as I can tell, was built inside a Faraday cage for all the cell phone signal I get in there. I've got [work on this](https://github.com/thegreatape/literate-minuteman/tree/backbone) underway right now.

* Call number support. No reason to have to go to a terminal or card catalog while at the library find out where the book is.

* Support for services like [PaperBackSwap](http://paperbackswap.com). There's an ISBN-importing Javascript thing I use to import my Goodreads wishlist to PaperBackSwap, but I have to remember to run it manually. This should be easier.

If it sounds like Literate Minuteman tickles your fancy, [give it a whirl](http://minuteman.zen-hacking.com) and let me know what I can do to make it more useful for you; this is very much a labor of love.
