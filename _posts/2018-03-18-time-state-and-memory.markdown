---
layout: post
title: "The Elements Of Computing Systems: Time, State & Memory"
---

Oh boy, a clock! In this chapter of [nand2tetris](http://www.nand2tetris.org/), we started teaching our logic circuits about time and consequently, memory. We’re introduced to a single new primitive, a data flipflop: all it does is output the value of its input one clock tick ago. With that and the array of combinatorial logic gates from previous chapters, we build all the way up to 16 kilobye RAM chips! 

It was a bit disappointing that DFFs are given as primitives here. Though the book says they can be composed from Nand gates just like the rest of the chips we’ve built so far, it would have been neat to see the gory details of how one goes from combinatorial, stateless logic to sequential, time-based logic. Apparently the construction of DFFs is “intricate”, so I get pedagogically why we aren’t asked to implement them. Still, nandandflipflop2tetris just doesn’t have the same ring…

That aside, building memory chips felt like like bit twiddling and more like combining of logical components. These chips were easier to get right on the first-ish try without pen and paper; the composing of larger and larger RAM chips felt particularly simple and elegant. It did, however, take a bit for me to shift my thinking abouts values throughout a system being phased time-wise: e.g. you set inputs up, then *on the next clock tick* the outputs react.

Aside: an HDL syntax thing that I didn’t know is that you can declare pin connection twice on the gate. Like, if I wanted to hook up a DFF’s output pin to both the chip’s out pin and something else internally, you can do  `DFF(in=something, out=outb, out=out)` . The simulator won’t let you connect pins that touch the outside world to internal pins, so you can’t just use `out`. Go figure.
