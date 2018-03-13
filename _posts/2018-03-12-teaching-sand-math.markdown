---
layout: post
title: "The Elements Of Computing Systems: Teaching First-Grade Math To Virtual Sand"
---

Continuing my slow plod through TEoCS (also known as [nand2tetris](http://www.nand2tetris.org/)), I’ve now reached the part of building in building a computer where I’ve built something that… computes.

The *Arithmetic Logic Unit* chip is the first thing I’ve made that felt like it deserved the label “chip” instead of the mechanical-sounding “gate”.  Just like everything else so far, at its heart it’s a bunch Nand gates with a lot of wires running between them… but it feels like we’ve crossed over from simple logic reified by wires into the real start of a more general purpose computing machine. The chip has a pair of 16-bit inputs, and 6 control bits, which you manipulate to do various combinations of arithmatic, from producing a constant value, addition, subtraction, bitwise boolean operations, negation upon those inputs. We’ll apparently be implementing multiplication and division at a higher level up the stack, but that’s a still a lot for some jumped-up simulated silicon.

It was, remarkably, only 14 lines of HDL code to implement, using all the gates I’d built so far.

It would have been pretty easy to rip through this chapter and build the ALU by just blindly implementing the logical operations indicated in the chip’s truth table and control bits, but I wanted to take a step back and work out with pen and paper *how* the chip actually accomplished a bunch of this math. It wasn’t obvious at all to me that, “ok, negate the y bus’s bits, then add them to x and then negate the result of that” comes out to `x-y`. But it does, and I’ve at least moved past taking it on faith after working out a few of these operations out with ink and dead trees. Pretty elegant design!

A few tidbits that were helpful for me as I worked through this chapter:

* You can use the literal values `true` or `false` if you want a wired to be always on or off.  This eluded me for a bit (heh heh heh).

* The tests will produce a (relatively) easy to read output file as they go. At least on OS X, it’s difficult to see the entirety of this output in the simulator’s UI, but it’s also available in a file in the current project directory with the `.out` extension. You can eyeball or diff each of its lines versus the test script’s `.cmp` file to start seeing where things have gone wrong.

* Examining the state of each internal pin of the chip in the hardware simulator is a great debugging technique. I found plenty of bugs by just running the test script, waiting for it to fail on a particular case, then stepping through what each internal pin/bus’s value should have been on paper.
