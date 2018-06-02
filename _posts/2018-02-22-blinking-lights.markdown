---
layout: post
title: 'The Elements of Computing Systems: Putting The Blinking Lights Back In Computer
  Science'
image:
  thumb: circuit-sketch.jpg
redirect_from:
- "/blinking-lights"
---

Last week, I cracked open [The Elements of Computing Systems](http://www.nand2tetris.org/) and started working through it. It's a book with a pretty cool idea: it walks you through thirteen projects that all build upon each other to create a complete general-purpose computer. The first chapter starts with transistors and logic gates; the last has Tetris running on an operating system you wrote!

My posts about work towards this year's learning-and-doing goal have thus far been either been documenting a finished project or showcasing immediately usable tips and tricks. Working my way through this book is going to be a little different. I want to document my progress—hopefully without these posts sounding like a third-grade book report—so I'm just going to try and call out what was fun or interesting about the material as I work through it. Maybe a work journal like this will be a useful template for how to write about other longer, ongoing projects, but we'll see! This is all serving as a proxy for habit changes, which is the most important thing to me.

----

The first chapter of TEoCS has you building primitive boolean logic gates starting with just a single atom: a [Nand gate](https://en.wikipedia.org/wiki/NAND_gate). You progressively build more and more complicated gates, from the familiar Not/Or/And operators to stuff like multiplexors and n-way version of the earlier gates.

The book doesn't come with a soldering iron, so this is all wired up inside a hardware simulator program (that reminds me of being introduced to pointers machine-language first in [CS210](https://www.cs.oberlin.edu/~jdonalds/210/syllabus.html)). You wire up the gates by writing code in Hardware Definition Language: basically virtually naming all the chips and how wires connect them.  You can load into the simulator, and then change the value of various wires and see what happens. It's a baroque-looking program, but pretty useful for exploring and debugging:

[![hardware simulator](/images/xor.png)](/images/xor.png)

Delightfully, the material has a set of test scripts that you can use to put your gates through their paces and make sure you've wired up everything correctly.

Creating gates like this via code definitely stretched my brain. Sketching them out on pen and paper was was really helpful:

[![circuit sketch](/images/circuit-sketch.jpg)](/images/circuit-sketch.jpg)

Next week, we teach the circuits to do math!
