---
layout: post
title: Make your Rails background jobs as small as possible
redirect_from:
- "/small-background-jobs"
---

I recently ran into an issue with [Literate Minuteman](http://www.literate-minuteman.com/) that reminded me of the value of keeping your Rails background jobs as small as you can.

In Minuteman, looking up the state of a book at a particular library is a relatively slow operation, and so is done periodically outside the HTTP request/response, using [Resque](https://github.com/resque/resque). For each book we want to update, we enqueue an `UpdateBook` worker with the book's id, which fetches the book and then delegates to `Book`'s `sync_copies` method.

{% highlight ruby %}
# app/workers/update_book.rb
def self.perform(book_id)
  book = Book.find(book_id)
  book.sync_copies
end
{% endhighlight %}

The book's `sync_copies` method then loops through all the available `LibrarySystem`s and asks the system in question for the current status of that book's copies:

{% highlight ruby %}
# app/models/book.rb
def sync_copies
  LibrarySystem.all.each do |system|
    copies = system.find(title, author)
    # book updating work happens here
  end
end
{% endhighlight %}

The problem with this design is that each `LibrarySystem`'s lookup is run in serial as a part of the same job. If an exception is raised by any system's `find` call, subsequent system book lookups won't happen at all. That's what I found was happening this weekend-a change in the Boston Public Library's site had caused the very first system lookup to fail, and now no books were being updated at all!

To fix this, I split the jobs out into more specific tasks-looking up the status of a book in a particular library system, instead of the status of a book in *all* library systems. `UpdateBook` simply took the library system id as a parameter and passed it to a `Book#sync_copies` method that just looked up copies in that system: 

{% highlight ruby %}
# app/workers/update_book.rb
def self.perform(book_id, library_system_id)
  book = Book.find(book_id)
  book.sync_copies(LibrarySystem.find(library_system_id))
end
{% endhighlight %}

{% highlight ruby %}
# app/models/book.rb
def sync_copies(library_system)
  copies = system.find(title, author)
  # book updating work happens here
end
{% endhighlight %}

Now, the BPL system lookups were still failing, but the other system lookups could run independently and I was free to fix the BPL lookup system in isolation.

I've simplified the code in these examples slightly to make my point more clear; you can check out the full changes [here](https://github.com/thegreatape/literate-minuteman/commit/5dbfe7a5629b88170cf65801b4c9a8ec37b44574).
