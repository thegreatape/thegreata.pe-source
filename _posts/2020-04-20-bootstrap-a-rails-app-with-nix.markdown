---
layout: post
title: Bootstrapping a Rails app with Nix
---

We've started using [Nix](https://nixos.org/nix/) at work for our development environments, and I wanted to spend some time learning how to use it for my own projects. So I set up a [minimal template for a new Rails app](https://github.com/thegreatape/nix-rails-template) to help me learn.

I'm not going to go into depth about how Nix works: I'd rather highlight why I think it's cool and worth learning with a template to get running and experiment on. Jean-Philippe Cugnet wrote [a great in-depth article here](https://ejpcmac.net/blog/about-using-nix-in-my-development-workflow/) about how Nix works and how to use it as a general-purpose development environment manager, so check out his writing if you want to dive in deep.

To me, Nix is interesting for development environments because of two things:

* **Dependency Isolation**: Nix allows multiple versions of a package to co-exist on the same computer. Ever tried running multiple apps on your laptop? Maybe one requires an older version of libxml2, another a specific revision of postgres. Huge pain to deal with, and what can be a huge time sink to manage by hand is removed entirely by Nix's dependency resolution. Think of it like `chroot` with package management superpowers.

* **Runs Natively**: Lots of people use Docker to solve the dependecy isolation issue. But I work on a Mac, so Docker means running a linux VM and having to deal with slower filesystem performance between the native host and the containers running on the VM. Nix involves no virtualization, so there's no speed penalty and all my native tools are available.

I use Rails by default for most of my web project work, so I made a [small Rails app generation template that uses Nix](https://github.com/thegreatape/nix-rails-template). The specific instructions are on the [README](https://github.com/thegreatape/nix-rails-template/blob/master/README.md), but in short: it sets up an isolated Ruby and Postgres install, configures a Rails app to use them, then gives you a shell with those dependencies available. From there, you can run the database (using [overmind](https://github.com/DarthSim/overmind) for process management) and all your normal Rails commands inside that shell. Enjoy!
