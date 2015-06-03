---
layout: post
title: "Extracting Testable Javascript From jQuery Soup"
---

I'm not sure where the phrase "jQuery Soup" originated, but it's an apt description of a failure mode that Javascript code can fall into as it grows. It's characterized by code that has little structure and no separation of concerns, mixing together HTTP calls, DOM manipulation, user event handling and business logic into a big pile of callbacks.

Beyond just looking ugly, soupy Javascript has a high carrying cost because it tends to be hard to change and expensive to test. With its lack of structure, code written this way can be tested only by high-level end-to-end tests, using tools like [Selenium](http://www.seleniumhq.org/) or [Poltergeist](https://github.com/teampoltergeist/poltergeist). Full-stack integration tests are important to have, but in moderation: they tend to be slow and provide very indirect feedback when something breaks.

If we want to turn our soup into something easier to change, we need to restructure it so we can write isolated unit tests against it.

## Why?

Correctly written unit tests using modern JS testing frameworks like [Mocha](http://mochajs.org/) or [Jasmine](http://jasmine.github.io/) are really freaking fast: a typical unit test should be executable in a small fraction of second and a suite of hundreds should take a handful of seconds to run. The productivity impact of speedy tests on the development feedback loop really cannot be understated: it's a lot easier to stay focused and in the zone when your tests can finish running before you switch windows from text editor to browser.

Beyond speed, isolated tests provide better locality of errors; when unit tests fail they're more likely than end-to-end tests to point you to the specific area of code that's gone wrong. They also encourage better testing of edge cases and failure modes; well-isolated tests mean there's less setup for each scenario, and so less friction for writing new test cases.

## How?

Luckily, writing unit-testable Javascript is mostly a matter of following good object-oriented design principals.

Let's look at some jQuery code that's powering a search against a JSON API. It's pretty pedestrian code, but can't be unit tested as-is. This is a very simple example so as to fit comfortably in a blog post; imagine hundreds of lines structured in the same fashion as we go along.

{% highlight coffeescript %}
{% raw %}
$ ->
  $("#search").on "click", ->
    $.ajax
      url: "/users/search"
      data: {q: $("#query").val()}
      success: (users) ->
        resultHtml = ""
        $.each users, (i, user) ->
          resultHtml += "<div>#{user.name}</div>"
        $(".results").html(resultHtml)
{% endraw %}
{% endhighlight %}

Let's refactor this code to get it under test.

### Make Your Code Instantiable In A Test Harness

The minimum requirement for testable code is to be able to run the code itself inside a test harness. Our jQuery code above is a function that's executed once upon page load: how do we run it inside something like Jasmine or Mocha?

As a first step, we can extract the function's behavior wholesale to a new object that we can create in our tests. There's more decomposing of the behavior we could do, but the objective right now is just to it running inside a test harness.

{% highlight coffeescript %}
{% raw %}
class @UserSearch
  bindForm: ->
    $("#search").on "click", ->
      $.ajax
        url: "/users/search"
        data: {q: $("#query").val()}
        success: (users) ->
          resultHtml = ""
          $.each users, (i, user) ->
            resultHtml += "<div>#{user.name}</div>"
          $(".results").html(resultHtml)
{% endraw %}
{% endhighlight %}

Now the code that's run on page load can simply create an instance of `UserSearch` and call `bindForm`:

{% highlight coffeescript %}
{% raw %}
$ ->
  new UserSearch().bindForm()
{% endraw %}
{% endhighlight %}

We can now create instances of `UserSearch` inside our test harness:

{% highlight coffeescript %}
{% raw %}
describe "UserSearch", ->
  it "can be created", ->
    expect(new UserSearch()).to.not.be.undefined;
{% endraw %}
{% endhighlight %}

Wahoo! But we can't test anything useful yet.

### Mock External Dependencies

Our code has two external dependencies we need to deal with before we can test anything useful: the DOM and the HTTP search API.

*DOM Fixtures*: Our `UserSearch` class depends on three elements being present on the page: a input to read the search query from, a button to click to submit the query, and a container to fill with search results. We can use jQuery to construct a minimal set of elements that fulfill this contract and insert it into the test runner's DOM in the `beforeEach` hook.

*HTTP search API*: `UserSearch` also depends on being able to retrieve JSON search results by hitting `/users/search` with an Ajax request. We can use [SinonJS's](http://sinonjs.org/) excellent high-level Ajax request mocking to build out a mock server that responds with fake search results.

With tools for mocking both our external dependencies, we can finally write a meaningful test:

{% highlight coffeescript %}
{% raw %}
describe "UserSearch", ->
  beforeEach ->
    @el = $('<div>
               <input id="query" />
               <button id="search">Search</button>
               <div class="results"></div>
             </div>')
    $('body').append(@el)
    @server = sinon.fakeServer.create()

  afterEach ->
    @el.remove()
    @server.restore()

  it "displays matching users", ->
    users = [
      {name: "Furiosa"},
      {name: "Max"}
    ]
    @server.respondWith(
      "GET",
      /users\/search/,
      [200, { "Content-Type": "application/json" }, JSON.stringify(users)])

    new UserSearch().bindForm()
    $("#query").val("a")
    $("#search").trigger("click")
    @server.respond()

    expect($($(".results div")[0])).to.have.$text("Furiosa")
    expect($($(".results div")[1])).to.have.$text("Max")
{% endraw %}
{% endhighlight %}

### Follow The Single-Responsibility Principal

The above test requires a lot of mocking for single test. It's also not great object-oriented design: we've just taken procedural code and wrapped an object around it for encapsulation. The Single-Responsibility Principal says that it's a good idea to have an object be responsible for a single thing. What if we split `UserSearch` into two classes: one for talking to the search API and one for managing the DOM?

Let's create a `UserStore` class to abstract away the details of fetching our search results. It'll just be responsible for talking to the backend and passing the search results along to the caller.

{% highlight coffeescript %}
{% raw %}
class @UserStore
  url: "/users/search"
  search: (query, callback) =>
    $.ajax
      url: @url
      data: {q: query}
      success: (users) ->
        callback(users)
{% endraw %}
{% endhighlight %}

We can test this by just mocking out the server Ajax response:

{% highlight coffeescript %}
{% raw %}
describe "UserStore", ->
  beforeEach ->
    @server = sinon.fakeServer.create()

  afterEach ->
    @server.restore()

  it "displays matching users", ->
    users = [
      {name: "Furiosa"},
      {name: "Max"}
    ]
    @server.respondWith(
      "GET",
      /users\/search/,
      [200, { "Content-Type": "application/json" }, JSON.stringify(users)])

    callback = sinon.spy()
    store = new UserStore()
    store.search("a", callback)
    expect(callback.calledWith(users)).to.be.truthy
{% endraw %}
{% endhighlight %}

### Inject JS Dependencies

Our `UserSearch` class now only manages the DOM and delegates the details of actually fetching the search results to its `UserStore`. Let's rename it to `UserSearchForm` to reflect its new responsibilities and take a look:

{% highlight coffeescript %}
{% raw %}
class @UserSearchForm
  constructor: ->
    @store = new UserStore()

  bindForm: =>
    $("#search").on "click", =>
      @store.search $("#query").val(), (users) ->
        resultHtml = ""
        $.each users, (i, user) ->
          resultHtml += "<div>#{user.name}</div>"
        $(".results").html(resultHtml)
{% endraw %}
{% endhighlight %}

But there's a problem here. Our tests for this class still have to include our fake Ajax server or they won't work—even though the code under test has nothing to do with HTTP requests now.

To solve this, we'll use dependency injection to pass our store in as a constructor argument. Frameworks like AngularJS makes "dependency injection" sound really complicated, but it doesn't have to be. We're just changing `UserSearchForm`'s constructor from one that creates a new instance of a specific class of store to one that takes a store as an argument:

{% highlight coffeescript %}
{% raw %}
class @UserSearchForm
  constructor: (store) ->
    @store = store
{% endraw %}
{% endhighlight %}

And the code to instantiate the form on the actual page becomes:

{% highlight coffeescript %}
{% raw %}
$ ->
  new UserSearchForm(new UserStore()).bindForm()
{% endraw %}
{% endhighlight %}

Now we can use a fake collaborator in our test instead of a real `UserStore`; we'll just use a plain Javascript object that implements the same contract that the real store honors, but (like our Ajax server mock) returns stock data.

{% highlight coffeescript %}
{% raw %}
describe "UserSearchForm", ->
  beforeEach ->
    @el = $('<div>
               <input id="query" />
               <button id="search">Search</button>
               <div class="results"></div>
             </div>')
    $('body').append(@el)

  afterEach ->
    @el.remove()

  it "displays matching users", ->
    class FakeStore
      search: (query, callback) ->
        callback([
          {name: "Furiosa"},
          {name: "Max"}
        ])

    new UserSearchForm(new FakeStore()).bindForm()
    $("#query").val("a")
    $("#search").trigger("click")

    expect($($(".results div")[0])).to.have.$text("Furiosa")
    expect($($(".results div")[1])).to.have.$text("Max")
{% endraw %}
{% endhighlight %}

## Better

The code we wound up at the end of this refactoring isn't perfect, but that's not the point. What's most important is that we've established a beachhead of tests to watch our backs while we keep improving it. All by just applying some of the simple object oriented design principals we already knew!
