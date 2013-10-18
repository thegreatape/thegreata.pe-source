---
layout: post
title: "Notes on Erlang: Seven Languages In Seven Weeks"
date: 2012-07-01 18:37
comments: true
categories: 
---

Erlang's syntax and semantics feel like modern Prolog. It's another almost-purely functional language, with all immutable variables. Basic operations are done via pattern matching with free variables and list deconstruction that make it clear why Prolog came first in the book.  Erlang also shares Prolog's bizarre-to-modern-eyes punctuation rules; I still haven't quite figured out when a statement should be terminated with a comma, period or semi-colon. 

### Practical Prolog?
Thankfully, actually *doing* anything in a functional manner felt a lot easier with Erlang than with Prolog. Erlang is dynamically typed and has anonymous functions, along with the usual raft of each/map/reduce-type helpers. There are also a couple of functional primitives I hadn't seen before: `takewhile` and `dropwhile` select or drop the all of the first items from a list that match the passed function until the first item that doesn't match. Most of these operations can be further simplified syntactically with list comprehensions that can take an arbitrary number of conditional or modifying clauses. Cool stuff.

Interestingly, there's also native syntax for binary packing and unpacking, which I suppose makes sense if Erlang was developed for telephony systems.

### Free-Range, Grass-Fed Organic Systems
Erlang's whole raison d'être is building fault-tolerant distributed systems. Like Scala, the basic concurrency primitives in Erlang are actors: lightweight processes that share nothing between them and communicate by message passing. Erlang's pattern matching works quite beautifully for interpreting and acting upon these passed messages. Message-passing itself is asynchronous, but it's fairly simple to build services that can provide a synchronous, blocking interface to actors. 

There's a marked emphasis on dealing with failure ("let it crash") instead of attempting to recover from errors.Building a process that monitors other processes and restarts them when they die is a matter of a couple lines of code. The book alludes to built-in mechanisms for setting up distributed servers, communicating between them, and even hot-swapping code in-process but doesn't go into depth due to space constraints.

I've got admit that I enjoyed my brief tour of Erlang more than I thought I would, especially after how unenthusiastic I was about Prolog. I'm still not sure I'd reach for Erlang unless I'm building a system that I know will be massively multi-server from the get-go. The actor model for concurrency is elegant as hell—but a lot of other, more familiar-feeling languages have copied it.
