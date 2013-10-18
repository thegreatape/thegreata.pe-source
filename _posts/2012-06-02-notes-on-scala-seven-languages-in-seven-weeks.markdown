---
layout: post
title: "Notes on Scala: Seven Languages In Seven Weeks"
date: 2012-06-16 12:53
comments: true
categories: 
---

After Prolog's brain-bending, it was a bit of a relief to tackle Scala and return to a more familiar general-purpose language with a C-descended syntax.

### Java++?

Scala seems to be attempting, in many ways, to be a better Java. It runs on the JVM and interoperates with Java freely - you can literally mix and match Scala and Java files in a single project, with all the classes involved able to call into each other without any translation layer. Many of the design choices made seem to attempt to solve Java's problems, while still remaining compatible: 

* Scala, like Java, is strongly and statically typed, but does away with much of the ceremony around type declaration. Types are often simply inferred by the compiler, with no need to declare them.
* Scala has Java's classical object inheritance model, but there are syntactic shortcuts for many parts of the system. Stuff like: constructors with no parameters can just be expressed as bare code after the class definition line, and short functions can be expressed on one line.
* Class methods and interfaces are present in Scala, but are actually separated out more cleanly into companion object declarations. Things defined with the `Object` keyword are straight-up class method structs, but `Trait`s actually behave more like Ruby mixins than Java interfaces.

This level of improvement feels akin to CoffeeScript vs. Javascript: pretty great stuff, some nice improvements, but nothing that will affect the macro-level patterns one uses to write code or one's overall productivity.

### LISP-y Behavior 

Here's where Scala actually adds something to its Java roots: it supports real functional programming right alongside OOP. Scala has first-class, anonymous functions with lexical closures and a nice terse syntax for expressing them. Working with Scala's collections will feel natural to Rubyists: you'll find yourself happily mapping and folding along.

Scala's concurrency model ties neatly into its functional nature. Rather than threads that share data and must deal with locking and concurrent access, Scala (like Io) uses asynchronous actors with no shared state These actors communicate via messages, the receiving of which can take advantage of some of the very powerful pattern matching at the core of the language These aren't just case statements, but can do matching with conditional guards, regular expressions and even singleton types declared just for message-passing.

Scala's typing model is clearly built to aid both concurrency and function programming - the choice of `val` vs. `var` when declaring a variable determines whether the variable is mutable or not. Given that immutability is so important for FP and parallel programming, that Scala has mutable variables at all feels like a compromise to interoperate with Java.

### Friction

Though Scala seems to be trying to do away with the syntactic bulk of Java (and the cognitive overhead associated with it), it certainly comes with its own set of baggage and ceremonies. For example, when extending a class via inheritance, you *must* use the `override` keyword anywhere the original classes signatures are overridden, even constructor parameters. Even at a syntax level, there's a lot going on, even if it doesn't contribute to lines-of-code-bloat like Java: a `<-` here means dereference something enumerable in a loop and there a `->` means mapping a key to a value in Map creation shorthand. Types get odd at times as well: `Any` is everything's superclass (ok) and `Nothing` is a subclass of everything (wat).

Then there's the XML literals. I think it's ultimately a gimmick: if you're slicing and slicing a lot of XML files, having XPath querying built into your language can be nice, but do we really need support for this at a syntactic level? And because the web isn't generally valid XML, using this for HTML screen-scraping is a non-starter. I just don't get why this sort of thing isn't a user-space library.

I've got mixed-to-negative feelings of Scala after this little first date with the language. If I were stuck on a big Java project and needed a better tool I could use without chucking the existing codebase, I might reach for Scala - but I'm not, and the language does doesn't hang together well enough for me to consider putting a lot of time into learning more about it.
