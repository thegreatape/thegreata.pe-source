---
layout: post
title: "The Elements of Computing Systems: Hardware, Complete"
---

Holy crap, we’re done with the hardware part. I built a computer!

## Chapter 4
A cool aspect of each chapter’s material being a self-contained abstraction is that the book can skip between levels for pedagogical reasons. So we wound up learning to write some programs in the machine language for our fully-built computer, before the final phase of actually wiring up the complete computer.

[![hack assembly language](/images/assembly.png)](/images/assembly.png)

It’s… definitely for machines. Messing around with the assembly language was pretty important for the next chapter. Without that experience, I don’t think I’d have understood enough of the intent behind how things are accomplished using its limited idioms. Debugging when my CPU wasn’t wired up correctly might have cost me a fair bit more hair!

Two side notes from spelunking with Hack assembly:

* [This page](http://www.marksmath.com/tecs/hack-asm/hack-asm.html) was a super useful companion for dealing with some very picky language stuff.
* There’s a part where you need to load a 16-bit word that’s all `1`s into memory to turn a part of the screen dark. You can actually only load 15-bit words in A-instructions, but the assembler will silently accept constants that are over the size you can express in 15 bits, leading to some serious headscratching.
	
## Chapter 5
Building the CPU and Memory units were the most challenging bits of HDL wiring so far. Breaking everything that needed to happen down into discrete tasks (and being well rested) was key here. Definitely went back to pen & paper here to make this work.

[![wiring the CPU on paper](/images/cpu.jpg)](/images/cpu.jpg)

All that wiring gore boiled down to only 18 lines of HDL to make a simple CPU, using all of the previously built components. Wow.

I did lots of breaking inputs down into binary to make sense of how to connect logical wires. Plotting numbers out as monospaced binary is another useful form of sketching:

[![writing out RAM addresses in binary](/images/ram-binary.png)](/images/ram-binary.png)

An added level of difficult: bus indexing works backwards from how my brain thinks, as traditional array indexes go left to right. Bus indexing, on the other hand, goes from the least significant bit to the most signicant bit… which is right to left when binary is written out. This must have accounted for at least half the bugs I created.

## Meta
It’s been three weeks since the entry before this; not exactly the pace I set out for myself at the beginning of the year. I was getting a little bored with writing a single entry for each chapter, but trying to get two chapters worth of work done in a single week *and* a write up wound up taking much longer.

I’ve also been having a hard time finding the focus to do this particular project after work, so only the real progress happens on weekends. I figured that going back to the blinking lights part of programming would stretch different brain muscles from what I’m using at work, but I think that’s demonstrably false. I’m still having fun, but probably need to either moderate my expectations of what I can do during the week, and/or get more ok with these writeups being progress updates rather than proof of commpleting milestones.
