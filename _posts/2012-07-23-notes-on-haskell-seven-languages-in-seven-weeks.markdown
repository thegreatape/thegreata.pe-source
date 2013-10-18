---
layout: post
title: "Notes on Haskell: Seven Languages In Seven Weeks"
date: 2012-07-23 23:48
comments: true
categories: 
---

I'll admit I approached Haskell with a bit of trepidation: the language has a tongue-in-cheek unofficial motto of "avoid success at all costs" and a reputation of only being used by academic ivory-tower types. 

### Functional Strength

Haskell's functional programming model is pure as the driven snow: unlike some of the functional languages earlier in the book, there's no mutatable state whatsoever. Period, end of story. Like all the previous functional languages, lists of data are a first-class primitive and there are a number of tools for slicing and dicing them. The usual map/filter/fold suspects are around, as are succinct form for defining anonymous functions and some powerful list comprehension forms.

Lazy evaluation seems to be the default mode in Haskell. Under the hood, every function has a single argument—functions with multiple arguments are split into multiple functions that are then applied to each other. This allows for easy currying—saving functions with partially bound arguments for later full evaluation. These partially applied functions let you do some pretty nifty tricks, like incrementing a list via `map (+ 1) [1, 2, 3]`. Lazy evaluation also allows functions to be infinite generators without any special invocation or magic.

### Not My Type

Haskell, while strongly typed, requires surprisingly little type declaration—the type checker can infer much of what it needs from the structure of the code. You can define your own types quite easily, both in terms of other types and recursively. These recursive definitions can lead to some very terse expressions of complex concepts - a one-line tree type definition, for example. 

After all that, I have to admit that I don't totally grok Haskell's type system. Fighting with type error messages in GHC is what prevented me from doing most of the non-trivial exercises in this chapter. It's apparent that once you learn to use it well, Haskell's type system is sophisticated and very powerful—but for me, the learning curve proved greater than my enthusiasm for the language. Perhaps I'm spoiled by more dynamically-typed languages.

### Monads (Or, What Is This I Don't Even)

The book attempts to explain monads initially through an example involving drunken pirates, which is a perfectly good stand-in for my mental state while trying understand how monads work. The idea—I think—is a generally applicable way to represent state in a language that has no mutatable state. Monads seem to act as functions whose return values can work as state accumulators when chained together. Using monads under the covers, the `do` statement lets you write imperative looking code, but it's actually chained together with monads and winds up boiling down to one big function invocation. That top-level conceptual understanding is where I stopped—exactly how to implement and practically use a monad was still a mystery to me after a section's worth of examples.

### Thanks For All The Lambdas

At the end of this chapter, my trepidation unfortunately seemed justified. Perhaps it was a bit of new language burn-out or perhaps it was Haskell's vertical learning curve, but I had a hell of a time getting as much out of Haskell as I did out of the other languages the book covered.  Frustration with Haskell aside, I had a blast with *Seven Languages In Seven Weeks*. Covering big swaths of intellectual territory is always fun, and I've got a non-trivial desire to start a deep dive into Clojure soon. Time to get back to building things.
