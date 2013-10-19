---
layout: post
published: true
title: Postgres connection errors after upgrading Ruby
---

After I recently upgraded Ruby 2.0.0 from p195 to p247, I started getting this error when starting some of my Rails projects for development:

{% highlight bash %}
{% raw %}
/Users/tmayfield/.rvm/gems/ruby-2.0.0-p247/gems/activerecord-4.0.0/lib/active_record/connection_adapters/postgresql_adapter.rb:825:in `initialize': could not connect to server: No such file or directory (PG::Error)
Is the server running locally and accepting connections on Unix domain socket "/var/pgsql_socket/.s.PGSQL.5432"?
{% endraw %}
{% endhighlight %}

The solution, as it turned out, was pretty simple: the `config/database.yml` file in the affected project was missing an explict entry for the database hostname. Adding `host: localhost` to the test and development entries got things rolling again.

A shiny nickle to anyone who can tell me why what changed between minor patchlevels of Ruby to cause this (or perhaps, why it worked before without an explict host setting).
