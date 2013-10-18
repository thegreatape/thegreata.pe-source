---
layout: post
title: "Print-friendly bookmarklet for programs on TheSquatRack.com"
date: 2013-06-30 00:25
comments: true
sharing: true
footer: true
---

One of my hobbies is repeatedly picking up heavy things and putting them back down.

I wanted to be able to print out some of the lifting program templates from [TheSquatRack](http://thesquatrack.com) (currently in beta, but if you ask nicely, they'll let you in), so I wrote a little bookmarklet to strip out most of the page in order to fit the template itself on one printed page. Just drag the link below to your bookmark bar, fill out the program template, and click the bookmark when you're ready to print.

{% raw %}
<a href="javascript:$('body').append('&lt;style&gt;body { font-size: 12px; } .table-condensed th, .table-condensed td { padding: 0px } h2 { display: inline-block; } .programTable { width: 90%; display: inline-table; } h1, .navbar, .footer-push, #footer, #roundNearest, #gzcl-btnA, .nav-tabs, #content &gt; strong, #content &gt; blockquote, #measurements label[for=roundNearest], #program-permalink, caption { display: none; } #measurements .control-group { display: inline-block; margin-bottom: 0px; } #content, #body-wrap { margin: 0px; } .container, #measurements { margin: 0px; padding: 0px; } .container { width: 1220px; } a[href^=http]:after { content:\'\'; } &lt;/style&gt;')">TSR - Print Format</a>
{% endraw %}
