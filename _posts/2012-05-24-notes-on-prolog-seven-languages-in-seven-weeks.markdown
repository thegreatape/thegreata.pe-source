---
layout: post
title: 'Notes on Prolog: Seven Languages in Seven Weeks'
date: 2012-05-24 20:37
comments: true
categories: 
redirect_from:
- "/notes-on-prolog-seven-languages-in-seven-weeks"
---

A quick note on setup: on OS X Lion, I had to install GNU Prolog with `brew install gnu-prolog --use-gcc` to avoid compilation errors when using Clang. 

Let's get this out of the way: Prolog is not a general purpose language. It has its niche and can do some pretty interesting stuff inside that domain, but it's not exactly suited for talking over a network or processing XML. Instead, Prolog is a declarative logic engine: you feed it knowledge and rules, then given these facts and constraints, it can be used to solve for values that fit your world of truth. You can prove statements true or false ("is a cat a mammal?") or find missing pieces to make true statements ("I need yeast, barley, water and what else to make beer? Solve for what else.").

Most of Prolog's power seems to come from defining recursive rules that operate on lists of data. You can split apart lists with the `[Head|Tail]` syntax that reminds me of messing with lists in Lisp recursively with `car`/`cdr`. Problem solving using this approach feels very much like when I used to mess around with Scheme in college, but the process of unification—making symbols on both sides of rule agree— was hard to wrap my head around. For example, rather than saying something like `result = sum([1, 2, 3])`, you'd say `sum([1, 2, 3], Result).`, with Prolog supplying the value for unbound variable `Result` that would make it equal the sum of 1, 2 and 3. I would up doing a lot more thinking than typing when working through the problem sets.

I'll be honest: Prolog was pretty unexciting to me, and I couldn't muster up a lot of enthusiasm to work through the example problems. Writing a 27-line sudoku solver by just defining the rules of sudoku is pretty cool and all- but it's a long leap from there to actually solving someone's problems in the real world. A more practical example the book gives is a scheduling problem- given a set of scientists with varying schedules and given a laboratory with equipment they need to share, find a schedule that will fit all of them. Parsing languages according to a grammar seems like another interesting application, as do some forms of AI decision-making. All the same, I can't see myself investing a lot of time in learning more about Prolog until I've got a Prolog-shaped problem in my daily work.
