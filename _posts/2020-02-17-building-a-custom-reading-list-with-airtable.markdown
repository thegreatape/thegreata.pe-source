---
layout: post
title: Building A Custom Reading List With Airtable
---

I built a custom [book tracker](https://airtable.com/shrklkcdOzAPEO7S5/tbldD4SKQaINX1gxw/viwWA7YHSRBL7AxL8?blocks=hide) and [reading history page](https://thegreata.pe/reading/), and now I’m kind of in love with [Airtable](https://airtable.com/). 

## Airtable
Airtable is an online spreadsheet app with a relational database’s heart and wonderful first-class API support. You can build a huge array of useful stuff using their tools: [their product page](https://airtable.com/product) and [example universe](https://airtable.com/universe) is a good showcase of what Airtable can do. They’ve got an incredibly generous free plan, too: everything detailed here fits in a free account!

For hobby-stage products, I think Airtable is as big a lift in productivity as hosting platforms like Heroku.  It’s a huge force multiplier for prototyping or [building home-cooked apps](https://www.robinsloan.com/notes/home-cooked-app/) , tightly fitted to your own workflows. The first stage of this reading list was up and running on its own in a couple minutes after just setting up the Airtable base, with a spreadsheet-like interface to my data that was powerful and visually pleasing.  More importantly, it /was already useful and useable/. I used the first stage as-is for a week, to track my read books and note ones I’d like to read in the future. I got a sense of what working with the modeling was like, and could remove and alter fields with no ceremony. Before I imported my full reading history or wrote a single line of code, I knew the structure was well set up for my personal use.

This is all heavily inspired by Simon Hørup Eskildsen’s work, both [Minimum Viable Airtable](https://sirupsen.com/minimum-viable-airtable/) and his excellent [airrecord](https://github.com/sirupsen/airrecord) Ruby gem. Big thanks to him for the spark that made me start all this.

## Book Tracking
Why build my own reading tracker, after a decade or so on Goodreads? I wanted: 

* An easier way to filter my to-read list by author background. Specifically, reading a lot of authors with diverse backgrounds is important to me, so I wanted my to read list to be able to show me a single page of all the books that aren’t by straight white dudes.
* The flexibility to show reading history and stats on my personal site exactly how I wanted them.  I do a summary of author backgrounds among the year’s books in my yearly review posts. This was a somewhat manual process, and I wanted to be able have the breakdowns automatically tracked and summarized for the current and past years.

I only wrote code here for the second part: the reading history page. Just building a [filtered Airtable view](https://airtable.com/shrklkcdOzAPEO7S5/tbldD4SKQaINX1gxw/viwavLuE5fkC10RCp?blocks=hide) was good enough for the to-read list by author background, and I didn’t need to go any further than that! 

For the reading history page, a little context: this site is written in [Jekyll](https://jekyllrb.com/) and hosted on Github Pages. There’s a limited set of plugins you can use with Pages’ basic Jekyll integration, so I use two repos: a [source repo](https://github.com/thegreatape/thegreata.pe-source) with the Jekyll code and markdown for blog posts, and a [built files repo](https://github.com/thegreatape/thegreatape.github.io) with the compiled HTML to be served. I use a simple [publish script](https://github.com/thegreatape/thegreata.pe-source/blob/master/publish.sh) to sync content between them.

The reading page is built with a relative small amount of code. I have [a Ruby script](https://github.com/thegreatape/thegreata.pe-source/blob/master/sync_reading.rb) to query my Airtable’s API for my reading history, to which it does some light processing and dumps the results out to a single JSON file. The [template for the reading page](https://github.com/thegreatape/thegreata.pe-source/blob/master/_layouts/reading.haml) simply loads that file and renders out the page with some straightforward Haml. This process is run on my laptop right now—maybe someday I’ll automate it, but at a couple books a month, remembering to run a single shell script after updating my Airtable reading records isn’t exactly a huge burden.
