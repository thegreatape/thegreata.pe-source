---
layout: post
title: 'The Elements Of Computing Systems: Resisting An Avengers Joke'
redirect_from:
- "/resisting-an-avengers-joke"
---

Out of the wiring swamp, on to the [dizzying but invisible depths](https://plus.google.com/+JeanBaptisteQueru/posts/dfydM2Cnepe) of software abstraction.

I was actually a little surprised that there was a full chapter devoted to writing an assembler—it’s just mechanically translating assembly code to machine code, word for word, right? As it turns out, while command translation itself is super straightforward, location labels for branching and variable declaration added a little fun. We wound up with a two pass design: a first pas to allow for memory address allocation for each variable and label, then a second pass to generate the machine code itself.

The system isn’t self hosting—that is, we now don’t use the tools we’re writing to directly build the next level of software (which would laborious, since we haven't built an operating system yet, much less a text editor!). This means we get to use whatever outside-of-Hack language we want to build the assembler. So now instead of fighting with HDL, I’m writing Ruby! I write Ruby most of the day for work and have for the last seven years or so.  It’s DARN NICE for text chomping.

Onwards!
