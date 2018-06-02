---
layout: post
title: Compiling Javascript templates with Guard
date: 2012-04-02 21:02
comments: true
categories: 
redirect_from:
- "/compiling-javascript-templates-with-guard"
---

Yesterday, I released the first version of [guard-templates](https://github.com/thegreatape/guard-templates), my Guard plugin for compiling Javascript templates as you work. 
[Guard](https://github.com/guard/guard) is a nifty tool for watching a directory for changes and taking some kind of action upon the changed files - running tests, compiling SASS or Coffeescript, firing a Growl and about a billion other things. 

The idea behind guard-templates is pretty simple: let your JS templates live in their own files in your project's source tree and have Guard turn them into Javascript you can use, as soon as you save them. Some frameworks have mechanisms for this already (Rails's Asset Pipeline, for example), but I wanted something I could drop into any project regardless of the technology being used. Let's say you had the following [Handlebars](http://handlebarsjs.com/) template:

{% highlight javascript %}
{% raw %}
<div>{{example}}</div>
{% endraw %}
{% endhighlight %}

With guard-templates configured to watch .handlebars files, it'll automatically compile to a simple JS string version of the file, ready to be included in the brower:
{% highlight javascript %}
{% raw %}
MyApp.templates = {
  post: '<div>{{example}}</div>'
}
{% endraw %}
{% endhighlight %}

Bam, ready to use JS templating without gross inline string literals or Ajax requiring. But wait, there's more! My favorite JS templating language is [Jade](https://github.com/visionmedia/jade), a HAML-ish language that supports precompilation to JS functions to avoid parsing the template itself at runtime. 

{% highlight jade %}
ul
  li.first
    a(href='#') foo
{% endhighlight %}

After processing, this becomes a ready-to-call function:

{% highlight javascript %}
MyApp.templates = {
  post: function anonymous(locals, attrs, escape, rethrow) {
    // contents tuncated for brevity's sake
  }
}
{% endhighlight %}

More options and details on usage are documented over on the [project's GitHub page](https://github.com/thegreatape/guard-templates). 
Drop me a line if it's useful for you or if [something's broken](https://github.com/thegreatape/guard-templates/issues).

