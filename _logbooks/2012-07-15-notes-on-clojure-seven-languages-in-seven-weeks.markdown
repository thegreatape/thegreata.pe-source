---
layout: post
title: 'Notes on Clojure: Seven Languages In Seven Weeks'
date: 2012-07-15 20:44
comments: true
categories: 
redirect_from:
- "/notes-on-clojure-seven-languages-in-seven-weeks"
---

I've been looking forward to digging into Clojure ever since I saw Rich Hickey's [keynote at RailsConf2012](http://www.confreaks.com/videos/860-railsconf2012-keynote-simplicity-matters). I'm still chewing on some of the philosophy Rich introduces in that talk, and wanting to seeing his approach to language design was a big part of why I picked up *Seven Languages In Seven Weeks* in the first place. Plus, I haven't had the chance to mess around with a Lisp since that semester in college of finding myself in the empty list...

### Basics

Clojure is a Lisp dialect that runs on the JVM, with data and code alike represented in lists. The oft-quoted complaint about "Lisp parenthesis soup" is helped by syntactic suger for Clojure's basic collection types: associative maps are denoted with `{}`s, sets use `#{}` and vectors have`[]`s. Even in just a couple days with the language, the parenthesis just become a form of whitespace when visually scanning properly indented Clojure.

These basic data structures in Clojure feel very well thought out, with Sequences serving as a common abstraction over most collections. Sequences are simply anything that implements the following interface: get the first element, get the rest of the sequence without the first element, and add an element to the front of the sequence (car, cdr, and cons for you Schemers playing along at home). Sequences can be lazy, allowing for some pretty powerful generator-like effects. 

Clojure's tools for working with these sequences are great. The usual functional suspects are there: `map`, `foldl`, and `filter`, along with a terse form for anonymous functions. There's also some new stuff: the `take` function grabs a finite number of elements from the front of a sequence- so given a lazy sequence computing the fibonacci numbers, you could get the first N with `(take N fibonaccis)`.  `interpose` works like Ruby's `join`, but works on and returns a sequence, so can be chained with other operations. Clojure also sports one of the most powerful list comprehension forms I've seen, supporting an arbitrary number of clauses and filters, even acting over multiple collections.  

### On the JVM

Rather than attempt to remain platform agnostic, Clojure seems to embrace the JVM as its host environment. Just like Scala, native Java types make appearances all over the place, though without a great deal of friction. The book didn't have the space to elaborate, but hinted at some pretty slick integration with native Java libraries. Beyond just existing code integration, Clojure gets to reap the man-centuries put into making the JVM fast, stable and possessed of one of the sophisticated garbage collectors out there.

Running on the JVM has its limitations. Without native support, Clojure has no tail recursion, although it provides a loop/recur construct for efficiently unrolling recursive calls.

Also interesting is that although Clojure binds itself tightly to the JVM, there are independent ports of the language to  [Javascript](https://github.com/clojure/clojurescript), [Python](https://github.com/halgari/clojure-py), [C](https://github.com/schani/clojurec), [.NET](https://github.com/clojure/clojure-clr) and more...


### Records and types, not objects

Clojure eschews Java's approach to object-oriented data modeling, particularly leaving behind the notion of class-based inheritance. Types are defined with `defrecord` and functions are grouped around types with `defprotocol`.  Types are immutable - instead of modifying a record in-place, you return a new, different copy. There's an emphasis on just enough abstraction over the data; types behave like maps, so you can start with a simple associative data structure and just add more behavior when you need it. 

Types can interact fully with other code on the JVM, although the implications of this are unclear to me. Can I pass Clojure records to other JVM languages and have their immutable semantics respected?

### Concurrency

Clojure's functional approach and strong push for immutatable state were designed to aid writing concurrent programs. State mutations can *only* be done inside explict transactions that prevent concurrent modifications from attempting to muck with a value at once.  The `atom` construct provides some sugar for concurrency-safe changes on a single value. 

There are a couple of different mechanics to actually executing code in parallel.  Agents can do asynchronous processing with the same thread-safe transactional access mechanics as atoms.  Reading a value from a reference, agent, or atom won't lock or block - updated values are just flipped in transactionally. So you might get an out-of-date value, but never one in an inconsistent state. Futures are another option for concurrency: they evaluate asynchronously, but reading their value returned blocks until evaluation is finished.

### Clojure runs deep

My brief tour of Clojure had me recalling the 'oh, wow' feeling I felt learning Python for the first time after a few years of Java and C++. Clojure's got some powerful ideas that I'm going to be trying to wrap my head around for a while. There's a fit-togetherness about the language that makes me want to dig into it further. This is the first language in *Seven Language In Seven Days* that made me go out and buy a book on it before I was even done with the chapter—I'll be tucking into [Clojure Programming](http://www.amazon.com/gp/product/1449394701) just as soon as I'm done with Haskell.
