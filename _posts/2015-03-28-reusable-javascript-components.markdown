---
layout: post
title: 'Composable Components: Comparing Angular and React'
redirect_from:
- "/reusable-javascript-components"
---

Both Angular and React think you should be building client-side apps by baking new behavior into the structure of the DOM. They take very different approaches to this, with what I think are some interesting consequences.

Angular does this by teaching the old DOM new tricks: you add functionality to existing elements and create new ones entirely by defining _directives_. A directive is Javascript that defines a custom HTML element or attribute with attached behavior. This behavior is declared as a function within Angular's module system and then instantiated by adding the new element or attribute to the page's HTML.

React, instead, defines both your markup structure and behavior *as* Javascript code, in one place.

Let's contrast these approaches with an example. Say you're a horrible person running a Twitter-esque social network. Let's further say that anywhere that there's a list of tweets, you want to wrap it up in a way that puts a big promoted ad at the top. Because, again, you're an awful person.

So we want to create a reusable component that can wrap whatever lists we pass to it and inject an ad at the top. Both our examples below will create the following markup when run—a pair of tweets from the user with a prepended ad from our corporate sponsors—but the important point is that both components can be re-used to wrap arbitrary lists.

{% highlight html %}
{% raw %}
<ul>
    <li>Promoted Tweet</li>
    <li>My Tweet One</li>
    <li>My Tweet Two</li>
</ul>
{% endraw %}
{% endhighlight %}


### Angular

In Angular, you can create directives that wrap arbitrary content using a mechanism called _transclusion_. The official Angular documentation doesn't make what this does very clear: _"transclude makes the contents of a directive with this option have access to the scope outside of the directive rather than inside."_

The way to explain transclusion that makes the most sense to me is that it works like yielding to a block in Ruby or passing a function callback to another function in Javascript. It's another way to add customizable behavior to a general-use component. The `ng-transclude` attribute on the directive's template below is like the `yield` call or callback invocation; it's where the child elements of the directive are inserted into the template and processed by Angular as though they were defined in the scope outside it.

Let's see our promoted-ad-first list as an Angular directive ([JSFiddle](http://jsfiddle.net/92uz99f4/2/)) :

{% highlight html %}
{% raw %}
<div ng-app="transcludeExample">
  <div>
      <ul promoted-list>
          <li>My Tweet One</li>
          <li>My Tweet Two</li>
      </ul>
  </div>
</div>
{% endraw %}
{% endhighlight %}

{% highlight javascript %}
{% raw %}
angular.module('transcludeExample', [])
   .directive('promotedList', function(){
      return {
        restrict: 'A',
        transclude: true,
        template: '<ul>' +
                    '<li>Promoted Content</li>' +
                    '<li ng-transclude></li>' +
                  '</ul>'
      };
  })
{% endraw %}
{% endhighlight %}

### React

React views are also built by defining trees of elements that use and extend the browser's DOM, but instead of splitting the definition and use of them between HTML and Javascript, everything is done in Javascript. You can use the [JSX processor](http://facebook.github.io/react/docs/jsx-in-depth.html) with React to define your element trees in what looks like markup inline in Javascript. It's just optional syntatic sugar, and though it takes a little getting used to visually, I think it's an overall win and have used it in the example below. Just keep in mind that each piece of markup is directly translated to a function call; e.g. `<Nav color="blue" />` just becomes `React.createElement(Nav, {color:"blue"})` before it hits the browser.

To achieve the same thing as the Angular example above, in React we just pass our tweets into the promoted list component as arguments in a Javascript function call. It looks like this [JSFiddle](http://jsfiddle.net/2qydq9gs/2/):

{% highlight text %}
{% raw %}
var PromotedList = React.createClass({
    render: function() {
        return <ul>
                  <li>Promoted Tweet</li>
                  {this.props.tweets}
               </ul>
    }
});

var myTweets = [
  <li>My Tweet One</li>,
  <li>My Tweet Two</li>
]
React.render(<PromotedList tweets={myTweets} />, document.body);

{% endraw %}
{% endhighlight %}

### Why make HTML Turing-complete?

What's interesting to me here is that React doesn't require a special mechanism to pass dynamic content to a reusable component. Since both our behavior and markup structure are all defined in Javascript, our PromotedList's dynamic content is just another argument to a function call. It's... just Javascript.

The need in Angular for an explicit API to accomplish this—`ng-transclude`— is a consequence of Angular's choice to push so much of an app's behavior definition into HTML. In order to create flexible APIs, it feels like they're having to reinvent in HTML what programming languages can already do.

I get separating business logic from presentational logic, but I'm not convinced that Angular's approach is better. Maybe it's the LISPer in me.
