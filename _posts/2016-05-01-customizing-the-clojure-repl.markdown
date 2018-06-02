---
layout: post
title: Customizing The Clojure REPL
redirect_from:
- "/customizing-the-clojure-repl"
---

One of the things that makes Clojure great is its fantastic REPL. "REPL" stands for "read eval print loop"—it's a command-line console where you can type in Clojure code and run it. It's a great way to experiment and learn; I'll often prototype a piece of code in the REPL before moving it back over to my editor to save in my project.

### Less typing required

My Clojure REPL sessions tend to be pretty long-lived, and I'll often build up a mini-library of helper functions and imported namespaces as I go. This can get a little jarring when I have to restart the REPL session; I'll hit the up arrow to repeat my last command, only to not have it work because the code references something I'd defined in the last session that's now gone.

As a partial solution, it turns out you can customize the environment the Clojure REPL starts up with. By default, `lein repl` starts using the `user` namespace, but it's not any different than any other Clojure namespace. You can customize it by create a file in your project that describes the `user` namespace. For example, if I always want to have [Midje](https://github.com/marick/Midje)'s testing functions loaded, I can add it to the `require` part of the namespace's `ns` macro:

{% highlight clojure %}
{% raw %}
; user.clj
(ns user
 (:require [midje.repl]))
{% endraw %}
{% endhighlight %}

Now whenever I start a REPL session, all the functions from `korma.core` will be automatically required and ready to use. We can do the same thing with all the Clojure code-loading mechanisms: require, refer, alias, and use. The `user` namespace works the same as any other Clojure namespace; it just happens to be the one that our REPL loads by default.

### Helper functions

This means we can also define helper functions in our `user` namespace. For example, if I want to stop and start my [mount components](https://github.com/tolitius/mount) easily, I might define some helpers to do that (like the [Luminus](http://www.luminusweb.net/) project does in its generated starter application):

{% highlight clojure %}
{% raw %}
; user.clj
(ns user
 (:require [midje.repl]
           [mount.core :as mount]))

(defn start []
  (mount/start))

(defn stop []
  (mount/stop))

(defn restart []
  (stop)
  (start))
{% endraw %}
{% endhighlight %}

Now those functions are available every time I start my REPL:

{% highlight bash %}
{% raw %}
user=> (restart)
[2016-05-01 13:46:22,647][INFO][luminus.http-server] starting HTTP server on port 3000
{% endraw %}
{% endhighlight %}

### Keeping this stuff out of production

You probably don't want to have development-only code like REPL customization loaded in your production application. If you're using Leiningen to manage your project, you can define directories that are only loaded when the development profile is used:

{% highlight clojure %}
{% raw %}
; project.clj
:profiles
{:dev
 {:source-paths ["env/development/clj"]}
{% endraw %}
{% endhighlight %}

Now, we can move our `user.clj` from above into `env/development/clj/user.clj`, and it'll only be loaded when we start up a REPL session in our development environment.
