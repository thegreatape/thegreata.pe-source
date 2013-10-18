---
layout: post
title: "Notes on Io: Seven Languages In Seven Weeks"
date: 2012-05-20 05:19
comments: true
categories: 
---

I realized recently that though I'd learned a number of new technologies over the last few years, it had been far too long since I learned a new language. I picked up Bruce Tate's [Seven Languages In Seven Weeks](http://pragprog.com/book/btlang/seven-languages-in-seven-weeks) a month ago to remedy this, and wanted to jot down some notes as I went on my Magical Mystery Tour of programming languages.

Quick aside: The books starts with Ruby. I've been writing Ruby on and off since 2007, and professionally with Rails for the last year, so I have a reasonable grasp on the language already. I didn't do the exercises, but was impressed with the author's approach. Each language is split into three days- Ruby's chapter goes very quickly from syntax and type system basics all the way down to Ruby's flavor of metaprogramming. Relative newcomers to Ruby (especially in the Rails world) would do well to work through this chapter- you might just come away with a much better understand of how all that Rails magic actually works.

On to Io.

## What Moving Parts? 

Io's core syntax is the simplest thing this side of Scheme. All the hard rules are contained in a scant few pages of this chapter. Everything else is malleable to a pretty ludicrous degree.

Everything in Io is an object; objects, in turn, are just sets of named slots. Slots can contain either methods or data. All interaction is done via message-passing: `Foo bar` sends the message `bar` to object `Foo` - either returning the data in slot `bar` on `Foo` or calling the method `bar` on `Foo`, depending on what's in the slot.

Io, like Javascript, is prototype based. You clone existing objects rather than instantiating new ones from class templates. Messages are passed up the prototype chain to the object's parent if the object itself doesn't know how to handle the message. If you're fuzzy on prototype-based inheritance in Javascript, read this chapter. It'll help even if you're using a library or transpiled JS language that mocks class-based inheritance for you.

Interestingly, types in Io are just themselves objects. Creating an object with a lowercase name gives the resulting object a `type` slot with a reference to the cloned object; objects with uppercase names don't get this `type` slot and get treated as types by convention only. Cloning `Meat` from `Food` would create an object you'd likely use as a type, but cloning `bacon` from `Meat` would simply give you an object with a type of `Meat`.   

## Bending Reality

And you thought Ruby was great for making DSLs? Io lets you redefine and extend everything from the built-in operator table to the semantics of message-passing between objects. Everything is open for reflection - I'm used to object level reflection from Ruby et al, but the message level reflection that lets you get the target and sender of the message inside the call was new and cool.

The last section of this chapter takes you through defining a JSON-ish syntax for map literals and a lispy-looking way to define XML tags, each in around 20 lines of code. It's pretty indicative of what you can do with the language that I managed to break vim-io's syntax highlighting with completely valid, executable code while working on these examples.

I'm honestly a bit wary of all this. I've seen beautiful APIs created by metaprogramming in Ruby, but I've also seen my fair share of coding horrors done with the same. I'd like to be able to rely on at least some common rules when using someone else's code and not worry that it's just subtly altered the environment everything else runs in.

## All At Once

Io's concurrency features are slick as hell. There's no preemptive multitasking here - no locks, no threads, no worries about concurrent state-modification. Everything is done through user-level cooperative coroutines. 

The mechanics of using coroutines are as simple as the language's syntax. Any message can be converted to an asynchronous actor by prefixing it with @@. The message passing then returns nil and the execution of the method goes on in the background: `blender liquify` can be converted to a background job by just changing it to `blender @@liquify`. A coroutine can call `yield` to voluntarily give control back to another coroutine- useful for running two jobs in parallel with interdependent steps.

Prepending a single @ to a message returns a future instead of nil. You can store the future and go about your business while the object in question does its async business out of band. When the caller needs the result, they pass messages to the future as though its result had already returned. If the result is ready, everything proceeds as normal; otherwise, the current coroutine blocks until the future returns. Apparently there's also automatic deadlock detection - Io will automatically raise an exception if one is detected instead of hanging.

I really like the idea of futures for the low-hanging fruit involved in something like rendering a page that needs 5 database queries worth of data. Each query is independent of the others, so you just kick them off in the background, grab the futures returned and start your rendering, accessing the future-query results as needed. You're still bound by the length of the longest query, but there's no reason to wait for the preceding one to return before calling the next.

Up next, Prolog. At this rate, it's going to be "Seven Languages in Seven Months". But I'm having fun.
