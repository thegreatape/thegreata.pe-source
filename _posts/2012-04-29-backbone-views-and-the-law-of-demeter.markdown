---
layout: post
title: Backbone Views and the Law of Demeter
date: 2012-04-28 19:25
comments: true
categories: 
redirect_from:
- "/backbone-views-and-the-law-of-demeter"
---

I've been getting more and more excited about [Backbone.js](http://documentcloud.github.com/backbone/) over the last few months. One of the greatest things about the framework is that it's so unopinionated and modular that you can do anything between writing your whole app using Backbone idioms or applying just one or two pieces to an existing app. I'm particularly interested in how Backbone Views encourage cleaner separation between Javascript components on a page, without even using any other Backbone components. Let's explore this a bit.

## Javascript Soup ##
I was lucky enough to attend [Sarah Mei's great talk on Backbone.js](http://speakerdeck.com/u/sarahmei/p/using-backbonejs-with-rails) at RailsConf this year. She rather aptly described the phases a Rails app moves through in its usage of Javascript: from the "what Javascript?" view helpers like `link_to_remote` and friends, to adding just a bit of extra functionality in that one view with a few lines of real JS, to what she terms a "jQuery Explosion". You know, when that little unobtrusive enhancement somehow became a five-hundred line stateful nightmare that's hard to modify and harder to test? Her thesis is that this right here is Backbone's sweet spot: non-trivial existing Javascript apps that are beginning to age and struggle due to lack of structure.

One of the patterns that comes out of poorly structured Javascript is violating the Law of Demeter. The Law of Demeter concerns loose coupling: it states (loosely) that each component of a program should only talk to its immediate "friends"- that is, other components of the program closely related to the current component. This has been generalized to "use only one dot" (meaning `a.doSomething()` is probably ok, but `a.b.doSomething()` is using too much knowledge of `a`'s implementation). In client-side Javascript, this can be applied by thinking of a page component's DOM elements as out of the reach of other page components. Your navigation widget might communicate with your breadcrumb widget by event binding or direct method calls, but shouldn't be reaching in and monkeying with the other's DOM elements directly.

## How Backbone Helps ##
Backbone Views encourage better patterns in a couple ways:

#### Scoped Event Binding By Default ####

Let's look at a trivial Backbone View that represents a navigation bar.

{% highlight javascript %}
App.NavigationView = Backbone.View.Extend({
  el: '#nav',
  events: {
    "click li.item a": "navigate"
  },
  navigate: function(evt){
    // ...
  }
})
{% endhighlight %}

This view binds to the existing element on the page with the id `nav` - this element becomes the view's root. All elements under it can be considered direct properties of the view, and only this view should directly manipulate them. The `events` property in the view's configuration options here binds click events on elements matching the selector `li.item` to the view's `navigate` method. _This is automatically scoped to only match elements that are descendents of the View's root element_. We'll only ever match events from our private DOM elements, and other Backbone components on the page won't match events from our elements.

You can get the same effect with something like `$('#nav li.item a').click( /* nav  function */ )`, but this requires more discipline and doesn't have the same effect of keeping all of our component's event concerns in one place. It also establishes a common pattern of event handling across all our page components: convention over configuration.

#### Scoped Selectors ####

Setting up scoped event binding is great for maintaining our limited knowledge and encapsulation with regard to event handling, but once it's time to actually modify those DOM elements, we need a way to do those operations with the same limitations.

Backbone provides a convenient way to make a query scoped to just the view's elements: the `this.$` function. Nothing fancy going on here: in a Backbone View, the root element of the View's DOM is bound to `this.el`, so `this.$` is just sugared-up `$(this.el).find`. Let's take our navigation bar example from above again. We'll make it set a current location field when you click on a navigation link.

{% highlight javascript %}
App.NavigationView = Backbone.View.Extend({
  el: '#nav',
  events: {
    "click li.item a": "navigate"
  },
  navigate: function(evt){
    var location = $(evt.target).text()
    this.$('.location').text(location)
  }
})
{% endhighlight %}

Nothing much surprising going on here: we grab the text from the link and plunk it down inside the element with class `location`. But consider what we got by using the view's scoped selector instead of a document-wide query: 

* We know we're only modifying the DOM elements this view directly owns.

* Our event handling code here doesn't have to care if there's more than one instance of NavigationView on the page. Multiple instances require extra care without a wrapping view- you'd need to know whose location element to modify and how to pick the right one.

* This built-in knowledge of the component's root also eliminates fragile traversals from the event's element to the piece you want to modify. No more temptation to do stuff like `$(e.target).prev().children('.location')` in your event handlers, only to have them break when you alter your structure.

* Even better, with this pattern, use of queries outside of `this.$` can serve as a useful warning sign that you're stepping outside the limits of knowledge that your component should have.

## We're Just Getting Started ##

Backbone offers a ton of ways to structure and modularize your Javascript code. You can represent your application's state as Collections of as validated Models, write single-page apps with Routers, even render your HTML entirely client-side with various kind of JS templating - all of which can be pretty intimidating when you're staring at years of jQuery soup and wondering where the hell to start. One of Backbone's most important features, however, is that you don't have to jump in whole hog. Teasing apart the code for individual page components into Backbone Views that respect the Law of Demeter has some immediate benefits and is a great jumping-off point for bringing some much-needed structure to your app's Javascript. 

