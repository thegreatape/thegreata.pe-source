!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=3)}([function(t,e,n){!function(){"use strict";var e={class:"className",contenteditable:"contentEditable",for:"htmlFor",readonly:"readOnly",maxlength:"maxLength",tabindex:"tabIndex",colspan:"colSpan",rowspan:"rowSpan",usemap:"useMap"};function n(t,e){try{return t(e)}catch(t){return e}}var r=document,o=window,i=r.documentElement,a=r.createElement.bind(r),u=a("div"),s=a("table"),c=a("tbody"),f=a("tr"),l=Array.isArray,h=Array.prototype,d=h.concat,p=h.filter,m=h.indexOf,y=h.map,g=h.push,v=h.slice,w=h.some,b=h.splice,x=/^#[\w-]*$/,k=/^\.[\w-]*$/,S=/<.+>/,O=/^\w+$/;function q(t,e){return t&&(F(e)||I(e))?k.test(t)?e.getElementsByClassName(t.slice(1)):O.test(t)?e.getElementsByTagName(t):e.querySelectorAll(t):[]}var E=function(){function t(t,e){if(t){if(D(t))return t;var n=t;if(R(t)){var i=(D(e)?e[0]:e)||r;if(!(n=x.test(t)?i.getElementById(t.slice(1)):S.test(t)?Mt(t):q(t,i)))return}else if(P(t))return this.ready(t);(n.nodeType||n===o)&&(n=[n]),this.length=n.length;for(var a=0,u=this.length;a<u;a++)this[a]=n[a]}}return t.prototype.init=function(e,n){return new t(e,n)},t}(),N=E.prototype,M=N.init;M.fn=M.prototype=N,N.length=0,N.splice=b,"function"==typeof Symbol&&(N[Symbol.iterator]=h[Symbol.iterator]),N.map=function(t){return M(d.apply([],y.call(this,(function(e,n){return t.call(e,n,e)}))))},N.slice=function(t,e){return M(v.call(this,t,e))};var L=/-([a-z])/g;function C(t){return t.replace(L,(function(t,e){return e.toUpperCase()}))}function T(t,e,n){if(n){for(var r=t.length;r--;)if(!1===e.call(t[r],r,t[r]))return t}else{r=0;for(var o=t.length;r<o;r++)if(!1===e.call(t[r],r,t[r]))return t}return t}function _(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var r=arguments.length;if(!r)return{};if(1===r)return _(M,t);for(var o=1;o<r;o++)for(var i in arguments[o])t[i]=arguments[o][i];return t}function j(t,e){var n=t&&(t.matches||t.webkitMatchesSelector||t.msMatchesSelector);return!!n&&!!e&&n.call(t,e)}function D(t){return t instanceof E}function A(t){return!!t&&t===t.window}function F(t){return!!t&&9===t.nodeType}function I(t){return!!t&&1===t.nodeType}function P(t){return"function"==typeof t}function R(t){return"string"==typeof t}function B(t){return void 0===t}function $(t){return null===t}function J(t){return!isNaN(parseFloat(t))&&isFinite(t)}function U(t){return R(t)?function(e,n){return j(n,t)}:P(t)?t:D(t)?function(e,n){return t.is(n)}:t?function(e,n){return n===t}:function(){return!1}}function W(t,e){return e?t.filter(e):t}M.each=T,N.each=function(t){return T(this,t)},N.removeProp=function(t){return this.each((function(n,r){delete r[e[t]||t]}))},M.extend=_,N.extend=function(t){return _(N,t)},M.guid=1,M.isWindow=A,M.isFunction=P,M.isNumeric=J,M.isArray=l,N.prop=function(t,n){if(t){if(R(t))return t=e[t]||t,arguments.length<2?this[0]&&this[0][t]:this.each((function(e,r){r[t]=n}));for(var r in t)this.prop(r,t[r]);return this}},N.get=function(t){return B(t)?v.call(this):this[(t=Number(t))<0?t+this.length:t]},N.eq=function(t){return M(this.get(t))},N.first=function(){return this.eq(0)},N.last=function(){return this.eq(-1)},N.filter=function(t){var e=U(t);return M(p.call(this,(function(t,n){return e.call(t,n,t)})))};var H=/\S+/g;function z(t){return R(t)&&t.match(H)||[]}function Y(t,e,n,r){for(var o=[],i=P(e),a=r&&U(r),u=0,s=t.length;u<s;u++)if(i){var c=e(t[u]);c.length&&g.apply(o,c)}else for(var f=t[u][e];!(null==f||r&&a(-1,f));)o.push(f),f=n?f[e]:null;return o}function G(t){return t.length>1?p.call(t,(function(t,e,n){return m.call(n,t)===e})):t}function V(t,e,n){if(I(t)){var r=o.getComputedStyle(t,null);return n?r.getPropertyValue(e)||void 0:r[e]}}function X(t,e){return parseInt(V(t,e),10)||0}N.hasClass=function(t){return!!t&&w.call(this,(function(e){return I(e)&&e.classList.contains(t)}))},N.removeAttr=function(t){var e=z(t);return this.each((function(t,n){I(n)&&T(e,(function(t,e){n.removeAttribute(e)}))}))},N.attr=function(t,e){if(t){if(R(t)){if(arguments.length<2){if(!this[0]||!I(this[0]))return;var n=this[0].getAttribute(t);return $(n)?void 0:n}return B(e)?this:$(e)?this.removeAttr(t):this.each((function(n,r){I(r)&&r.setAttribute(t,e)}))}for(var r in t)this.attr(r,t[r]);return this}},N.toggleClass=function(t,e){var n=z(t),r=!B(e);return this.each((function(t,o){I(o)&&T(n,(function(t,n){r?e?o.classList.add(n):o.classList.remove(n):o.classList.toggle(n)}))}))},N.addClass=function(t){return this.toggleClass(t,!0)},N.removeClass=function(t){return arguments.length?this.toggleClass(t,!1):this.attr("class","")},M.unique=G,N.add=function(t,e){return M(G(this.get().concat(M(t,e).get())))};var K=/^--/;function Q(t){return K.test(t)}var Z={},tt=u.style,et=["webkit","moz","ms"];function nt(t,e){if(void 0===e&&(e=Q(t)),e)return t;if(!Z[t]){var n=C(t),r=""+n[0].toUpperCase()+n.slice(1);T((n+" "+et.join(r+" ")+r).split(" "),(function(e,n){if(n in tt)return Z[t]=n,!1}))}return Z[t]}var rt={animationIterationCount:!0,columnCount:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0};function ot(t,e,n){return void 0===n&&(n=Q(t)),n||rt[t]||!J(e)?e:e+"px"}N.css=function(t,e){if(R(t)){var n=Q(t);return t=nt(t,n),arguments.length<2?this[0]&&V(this[0],t,n):t?(e=ot(t,e,n),this.each((function(r,o){I(o)&&(n?o.style.setProperty(t,e):o.style[t]=e)}))):this}for(var r in t)this.css(r,t[r]);return this};var it=/^\s+|\s+$/;function at(t,e){var r=t.dataset[e]||t.dataset[C(e)];return it.test(r)?r:n(JSON.parse,r)}function ut(t,e,r){r=n(JSON.stringify,r),t.dataset[C(e)]=r}function st(t,e){var n=t.documentElement;return Math.max(t.body["scroll"+e],n["scroll"+e],t.body["offset"+e],n["offset"+e],n["client"+e])}function ct(t,e){return X(t,"border"+(e?"Left":"Top")+"Width")+X(t,"padding"+(e?"Left":"Top"))+X(t,"padding"+(e?"Right":"Bottom"))+X(t,"border"+(e?"Right":"Bottom")+"Width")}N.data=function(t,e){if(!t){if(!this[0])return;var n={};for(var r in this[0].dataset)n[r]=at(this[0],r);return n}if(R(t))return arguments.length<2?this[0]&&at(this[0],t):B(e)?this:this.each((function(n,r){ut(r,t,e)}));for(var r in t)this.data(r,t[r]);return this},T([!0,!1],(function(t,e){T(["Width","Height"],(function(t,n){N[(e?"outer":"inner")+n]=function(r){if(this[0])return A(this[0])?e?this[0]["inner"+n]:this[0].document.documentElement["client"+n]:F(this[0])?st(this[0],n):this[0][(e?"offset":"client")+n]+(r&&e?X(this[0],"margin"+(t?"Top":"Left"))+X(this[0],"margin"+(t?"Bottom":"Right")):0)}}))})),T(["Width","Height"],(function(t,e){var n=e.toLowerCase();N[n]=function(r){if(!this[0])return B(r)?void 0:this;if(!arguments.length)return A(this[0])?this[0].document.documentElement["client"+e]:F(this[0])?st(this[0],e):this[0].getBoundingClientRect()[n]-ct(this[0],!t);var o=parseInt(r,10);return this.each((function(e,r){if(I(r)){var i=V(r,"boxSizing");r.style[n]=ot(n,o+("border-box"===i?ct(r,!t):0))}}))}}));var ft={};function lt(t){return"none"===V(t,"display")}function ht(t,e){return!e||!w.call(e,(function(e){return t.indexOf(e)<0}))}N.toggle=function(t){return this.each((function(e,n){I(n)&&((B(t)?lt(n):t)?(n.style.display=n.___cd||"",lt(n)&&(n.style.display=function(t){if(ft[t])return ft[t];var e=a(t);r.body.insertBefore(e,null);var n=V(e,"display");return r.body.removeChild(e),ft[t]="none"!==n?n:"block"}(n.tagName))):(n.___cd=V(n,"display"),n.style.display="none"))}))},N.hide=function(){return this.toggle(!1)},N.show=function(){return this.toggle(!0)};var dt={focus:"focusin",blur:"focusout"},pt={mouseenter:"mouseover",mouseleave:"mouseout"},mt=/^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;function yt(t){return pt[t]||dt[t]||t}function gt(t){return t.___ce=t.___ce||{}}function vt(t){var e=t.split(".");return[e[0],e.slice(1).sort()]}function wt(t,e,n,r,o){var i=gt(t);if(e)i[e]&&(i[e]=i[e].filter((function(i){var a=i[0],u=i[1],s=i[2];if(o&&s.guid!==o.guid||!ht(a,n)||r&&r!==u)return!0;t.removeEventListener(e,s)})));else for(e in i)wt(t,e,n,r,o)}function bt(t){return t.multiple&&t.options?Y(p.call(t.options,(function(t){return t.selected&&!t.disabled&&!t.parentNode.disabled})),"value"):t.value||""}N.off=function(t,e,n){var r=this;if(B(t))this.each((function(t,e){(I(e)||F(e)||A(e))&&wt(e)}));else if(R(t))P(e)&&(n=e,e=""),T(z(t),(function(t,o){var i=vt(yt(o)),a=i[0],u=i[1];r.each((function(t,r){(I(r)||F(r)||A(r))&&wt(r,a,u,e,n)}))}));else for(var o in t)this.off(o,t[o]);return this},N.on=function(t,e,n,r,o){var i=this;if(!R(t)){for(var a in t)this.on(a,e,n,t[a],o);return this}return R(e)||(B(e)||$(e)?e="":B(n)?(n=e,e=""):(r=n,n=e,e="")),P(r)||(r=n,n=void 0),r?(T(z(t),(function(t,a){var u=vt(yt(a)),s=u[0],c=u[1];s&&i.each((function(t,i){if(I(i)||F(i)||A(i)){var a=function t(a){if(!a.namespace||ht(c,a.namespace.split("."))){var u=i;if(e){for(var f=a.target;!j(f,e);){if(f===i)return;if(!(f=f.parentNode))return}u=f,a.___cd=!0}a.___cd&&Object.defineProperty(a,"currentTarget",{configurable:!0,get:function(){return u}}),Object.defineProperty(a,"data",{configurable:!0,get:function(){return n}});var l=r.call(u,a,a.___td);o&&wt(i,s,c,e,t),!1===l&&(a.preventDefault(),a.stopPropagation())}};a.guid=r.guid=r.guid||M.guid++,function(t,e,n,r,o){var i=gt(t);i[e]=i[e]||[],i[e].push([n,r,o]),t.addEventListener(e,o)}(i,s,c,e,a)}}))})),this):this},N.one=function(t,e,n,r){return this.on(t,e,n,r,!0)},N.ready=function(t){var e=function(){return setTimeout(t,0,M)};return"loading"!==r.readyState?e():r.addEventListener("DOMContentLoaded",e),this},N.trigger=function(t,e){if(R(t)){var n=vt(t),o=n[0],i=n[1];if(!o)return this;var a=mt.test(o)?"MouseEvents":"HTMLEvents";(t=r.createEvent(a)).initEvent(o,!0,!0),t.namespace=i.join(".")}t.___td=e;var u=t.type in dt;return this.each((function(e,n){u&&P(n[t.type])?n[t.type]():n.dispatchEvent(t)}))};var xt=/%20/g,kt=/\r?\n/g;var St=/file|reset|submit|button|image/i,Ot=/radio|checkbox/i;N.serialize=function(){var t="";return this.each((function(e,n){T(n.elements||[n],(function(e,n){if(!(n.disabled||!n.name||"FIELDSET"===n.tagName||St.test(n.type)||Ot.test(n.type)&&!n.checked)){var r=bt(n);if(!B(r))T(l(r)?r:[r],(function(e,r){t+=function(t,e){return"&"+encodeURIComponent(t)+"="+encodeURIComponent(e.replace(kt,"\r\n")).replace(xt,"+")}(n.name,r)}))}}))})),t.slice(1)},N.val=function(t){return arguments.length?this.each((function(e,n){var r=n.multiple&&n.options;if(r||Ot.test(n.type)){var o=l(t)?y.call(t,String):$(t)?[]:[String(t)];r?T(n.options,(function(t,e){e.selected=o.indexOf(e.value)>=0}),!0):n.checked=o.indexOf(n.value)>=0}else n.value=B(t)||$(t)?"":t})):this[0]&&bt(this[0])},N.clone=function(){return this.map((function(t,e){return e.cloneNode(!0)}))},N.detach=function(t){return W(this,t).each((function(t,e){e.parentNode&&e.parentNode.removeChild(e)})),this};var qt=/^\s*<(\w+)[^>]*>/,Et=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,Nt={"*":u,tr:c,td:f,th:f,thead:s,tbody:s,tfoot:s};function Mt(t){if(!R(t))return[];if(Et.test(t))return[a(RegExp.$1)];var e=qt.test(t)&&RegExp.$1,n=Nt[e]||Nt["*"];return n.innerHTML=t,M(n.childNodes).detach().get()}M.parseHTML=Mt,N.empty=function(){return this.each((function(t,e){for(;e.firstChild;)e.removeChild(e.firstChild)}))},N.html=function(t){return arguments.length?B(t)?this:this.each((function(e,n){I(n)&&(n.innerHTML=t)})):this[0]&&this[0].innerHTML},N.remove=function(t){return W(this,t).detach().off(),this},N.text=function(t){return B(t)?this[0]?this[0].textContent:"":this.each((function(e,n){I(n)&&(n.textContent=t)}))},N.unwrap=function(){return this.parent().each((function(t,e){if("BODY"!==e.tagName){var n=M(e);n.replaceWith(n.children())}})),this},N.offset=function(){var t=this[0];if(t){var e=t.getBoundingClientRect();return{top:e.top+o.pageYOffset,left:e.left+o.pageXOffset}}},N.offsetParent=function(){return this.map((function(t,e){for(var n=e.offsetParent;n&&"static"===V(n,"position");)n=n.offsetParent;return n||i}))},N.position=function(){var t=this[0];if(t){var e="fixed"===V(t,"position"),n=e?t.getBoundingClientRect():this.offset();if(!e){for(var r=t.ownerDocument,o=t.offsetParent||r.documentElement;(o===r.body||o===r.documentElement)&&"static"===V(o,"position");)o=o.parentNode;if(o!==t&&I(o)){var i=M(o).offset();n.top-=i.top+X(o,"borderTopWidth"),n.left-=i.left+X(o,"borderLeftWidth")}}return{top:n.top-X(t,"marginTop"),left:n.left-X(t,"marginLeft")}}},N.children=function(t){return W(M(G(Y(this,(function(t){return t.children})))),t)},N.contents=function(){return M(G(Y(this,(function(t){return"IFRAME"===t.tagName?[t.contentDocument]:"TEMPLATE"===t.tagName?t.content.childNodes:t.childNodes}))))},N.find=function(t){return M(G(Y(this,(function(e){return q(t,e)}))))};var Lt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Ct=/^$|^module$|\/(java|ecma)script/i,Tt=["type","src","nonce","noModule"];function _t(t,e,n,r,o){r?t.insertBefore(e,n?t.firstChild:null):t.parentNode.insertBefore(e,n?t:t.nextSibling),o&&function(t,e){var n=M(t);n.filter("script").add(n.find("script")).each((function(t,n){if(Ct.test(n.type)&&i.contains(n)){var r=a("script");r.text=n.textContent.replace(Lt,""),T(Tt,(function(t,e){n[e]&&(r[e]=n[e])})),e.head.insertBefore(r,null),e.head.removeChild(r)}}))}(e,t.ownerDocument)}function jt(t,e,n,r,o,i,a,u){return T(t,(function(t,i){T(M(i),(function(t,i){T(M(e),(function(e,a){var u=n?a:i,s=n?t:e;_t(n?i:a,s?u.cloneNode(!0):u,r,o,!s)}),u)}),a)}),i),e}N.after=function(){return jt(arguments,this,!1,!1,!1,!0,!0)},N.append=function(){return jt(arguments,this,!1,!1,!0)},N.appendTo=function(t){return jt(arguments,this,!0,!1,!0)},N.before=function(){return jt(arguments,this,!1,!0)},N.insertAfter=function(t){return jt(arguments,this,!0,!1,!1,!1,!1,!0)},N.insertBefore=function(t){return jt(arguments,this,!0,!0)},N.prepend=function(){return jt(arguments,this,!1,!0,!0,!0,!0)},N.prependTo=function(t){return jt(arguments,this,!0,!0,!0,!1,!1,!0)},N.replaceWith=function(t){return this.before(t).remove()},N.replaceAll=function(t){return M(t).replaceWith(this),this},N.wrapAll=function(t){for(var e=M(t),n=e[0];n.children.length;)n=n.firstElementChild;return this.first().before(e),this.appendTo(n)},N.wrap=function(t){return this.each((function(e,n){var r=M(t)[0];M(n).wrapAll(e?r.cloneNode(!0):r)}))},N.wrapInner=function(t){return this.each((function(e,n){var r=M(n),o=r.contents();o.length?o.wrapAll(t):r.append(t)}))},N.has=function(t){var e=R(t)?function(e,n){return q(t,n).length}:function(e,n){return n.contains(t)};return this.filter(e)},N.is=function(t){var e=U(t);return w.call(this,(function(t,n){return e.call(t,n,t)}))},N.next=function(t,e,n){return W(M(G(Y(this,"nextElementSibling",e,n))),t)},N.nextAll=function(t){return this.next(t,!0)},N.nextUntil=function(t,e){return this.next(e,!0,t)},N.not=function(t){var e=U(t);return this.filter((function(n,r){return(!R(t)||I(r))&&!e.call(r,n,r)}))},N.parent=function(t){return W(M(G(Y(this,"parentNode"))),t)},N.index=function(t){var e=t?M(t)[0]:this[0],n=t?this:M(e).parent().children();return m.call(n,e)},N.closest=function(t){var e=this.filter(t);if(e.length)return e;var n=this.parent();return n.length?n.closest(t):e},N.parents=function(t,e){return W(M(G(Y(this,"parentElement",!0,e))),t)},N.parentsUntil=function(t,e){return this.parents(e,t)},N.prev=function(t,e,n){return W(M(G(Y(this,"previousElementSibling",e,n))),t)},N.prevAll=function(t){return this.prev(t,!0)},N.prevUntil=function(t,e){return this.prev(e,!0,t)},N.siblings=function(t){return W(M(G(Y(this,(function(t){return M(t).parent().children().not(t)})))),t)},t.exports=M}()},,function(t,e,n){var r=n(6);t.exports={locale:r.locale,long:r.long,short:r.short,narrow:r.narrow,"short-time":n(11),"short-convenient":n(12),"long-time":n(13),"long-convenient":n(14),tiny:n(15),quantify:r.quantify}},function(t,e,n){n(4),n(5),n(17),n(16)},function(t,e,n){},function(t,e){document.addEventListener("DOMContentLoaded",()=>{const t=Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"),0);t.length>0&&t.forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.target,n=document.getElementById(e);t.classList.toggle("is-active"),n.classList.toggle("is-active")})})})},function(t,e,n){t.exports={locale:"en",long:n(7),short:n(8),narrow:n(9),quantify:n(10)}},function(t){t.exports=JSON.parse('{"year":{"previous":"last year","current":"this year","next":"next year","past":{"one":"{0} year ago","other":"{0} years ago"},"future":{"one":"in {0} year","other":"in {0} years"}},"quarter":{"previous":"last quarter","current":"this quarter","next":"next quarter","past":{"one":"{0} quarter ago","other":"{0} quarters ago"},"future":{"one":"in {0} quarter","other":"in {0} quarters"}},"month":{"previous":"last month","current":"this month","next":"next month","past":{"one":"{0} month ago","other":"{0} months ago"},"future":{"one":"in {0} month","other":"in {0} months"}},"week":{"previous":"last week","current":"this week","next":"next week","past":{"one":"{0} week ago","other":"{0} weeks ago"},"future":{"one":"in {0} week","other":"in {0} weeks"}},"day":{"previous":"yesterday","current":"today","next":"tomorrow","past":{"one":"{0} day ago","other":"{0} days ago"},"future":{"one":"in {0} day","other":"in {0} days"}},"hour":{"current":"this hour","past":{"one":"{0} hour ago","other":"{0} hours ago"},"future":{"one":"in {0} hour","other":"in {0} hours"}},"minute":{"current":"this minute","past":{"one":"{0} minute ago","other":"{0} minutes ago"},"future":{"one":"in {0} minute","other":"in {0} minutes"}},"second":{"current":"now","past":{"one":"{0} second ago","other":"{0} seconds ago"},"future":{"one":"in {0} second","other":"in {0} seconds"}}}')},function(t){t.exports=JSON.parse('{"year":{"previous":"last yr.","current":"this yr.","next":"next yr.","past":"{0} yr. ago","future":"in {0} yr."},"quarter":{"previous":"last qtr.","current":"this qtr.","next":"next qtr.","past":{"one":"{0} qtr. ago","other":"{0} qtrs. ago"},"future":{"one":"in {0} qtr.","other":"in {0} qtrs."}},"month":{"previous":"last mo.","current":"this mo.","next":"next mo.","past":"{0} mo. ago","future":"in {0} mo."},"week":{"previous":"last wk.","current":"this wk.","next":"next wk.","past":"{0} wk. ago","future":"in {0} wk."},"day":{"previous":"yesterday","current":"today","next":"tomorrow","past":{"one":"{0} day ago","other":"{0} days ago"},"future":{"one":"in {0} day","other":"in {0} days"}},"hour":{"current":"this hour","past":"{0} hr. ago","future":"in {0} hr."},"minute":{"current":"this minute","past":"{0} min. ago","future":"in {0} min."},"second":{"current":"now","past":"{0} sec. ago","future":"in {0} sec."}}')},function(t){t.exports=JSON.parse('{"year":{"previous":"last yr.","current":"this yr.","next":"next yr.","past":"{0} yr. ago","future":"in {0} yr."},"quarter":{"previous":"last qtr.","current":"this qtr.","next":"next qtr.","past":{"one":"{0} qtr. ago","other":"{0} qtrs. ago"},"future":{"one":"in {0} qtr.","other":"in {0} qtrs."}},"month":{"previous":"last mo.","current":"this mo.","next":"next mo.","past":"{0} mo. ago","future":"in {0} mo."},"week":{"previous":"last wk.","current":"this wk.","next":"next wk.","past":"{0} wk. ago","future":"in {0} wk."},"day":{"previous":"yesterday","current":"today","next":"tomorrow","past":{"one":"{0} day ago","other":"{0} days ago"},"future":{"one":"in {0} day","other":"in {0} days"}},"hour":{"current":"this hour","past":"{0} hr. ago","future":"in {0} hr."},"minute":{"current":"this minute","past":"{0} min. ago","future":"in {0} min."},"second":{"current":"now","past":"{0} sec. ago","future":"in {0} sec."}}')},function(t,e){t.exports=function(t){var e=!String(t).split(".")[1];return 1==t&&e?"one":"other"}},function(t){t.exports=JSON.parse('{"year":"{0} yr.","month":"{0} mo.","week":"{0} wk.","day":{"one":"{0} day","other":"{0} days"},"hour":"{0} hr.","minute":"{0} min.","second":"{0} sec.","now":"now"}')},function(t){t.exports=JSON.parse('{"year":{"previous":"last yr.","current":"this yr.","next":"next yr.","past":"{0} yr. ago","future":"in {0} yr."},"quarter":{"previous":"last qtr.","current":"this qtr.","next":"next qtr.","past":{"one":"{0} qtr. ago","other":"{0} qtrs. ago"},"future":{"one":"in {0} qtr.","other":"in {0} qtrs."}},"month":{"previous":"last mo.","current":"this mo.","next":"next mo.","past":"{0} mo. ago","future":"in {0} mo."},"week":{"previous":"last wk.","current":"this wk.","next":"next wk.","past":"{0} wk. ago","future":"in {0} wk."},"day":{"previous":"yesterday","current":"today","next":"tomorrow","past":{"one":"{0} day ago","other":"{0} days ago"},"future":{"one":"in {0} day","other":"in {0} days"}},"hour":{"current":"this hour","past":"{0} hr. ago","future":"in {0} hr."},"minute":{"current":"this minute","past":"{0} min. ago","future":"in {0} min."},"second":{"current":"now","past":"{0} sec. ago","future":"in {0} sec."},"now":{"future":"in a moment","past":"just now"}}')},function(t){t.exports=JSON.parse('{"year":{"one":"{0} year","other":"{0} years"},"month":{"one":"{0} month","other":"{0} months"},"week":{"one":"{0} week","other":"{0} weeks"},"day":{"one":"{0} day","other":"{0} days"},"hour":{"one":"{0} hour","other":"{0} hours"},"minute":{"one":"{0} minute","other":"{0} minutes"},"second":{"one":"{0} second","other":"{0} seconds"},"now":{"future":"in a moment","past":"just now"}}')},function(t){t.exports=JSON.parse('{"year":{"previous":"last year","current":"this year","next":"next year","past":{"one":"a year ago","other":"{0} years ago"},"future":{"one":"in a year","other":"in {0} years"}},"quarter":{"previous":"last quarter","current":"this quarter","next":"next quarter","past":{"one":"a quarter ago","other":"{0} quarters ago"},"future":{"one":"in a quarter","other":"in {0} quarters"}},"month":{"previous":"last month","current":"this month","next":"next month","past":{"one":"a month ago","other":"{0} months ago"},"future":{"one":"in a month","other":"in {0} months"}},"week":{"previous":"last week","current":"this week","next":"next week","past":{"one":"a week ago","other":"{0} weeks ago"},"future":{"one":"in a week","other":"in {0} weeks"}},"day":{"previous":"yesterday","current":"today","next":"tomorrow","past":{"one":"a day ago","other":"{0} days ago"},"future":{"one":"in a day","other":"in {0} days"}},"hour":{"current":"this hour","past":{"one":"an hour ago","other":"{0} hours ago"},"future":{"one":"in an hour","other":"in {0} hours"}},"minute":{"current":"this minute","past":{"one":"a minute ago","other":"{0} minutes ago"},"future":{"one":"in a minute","other":"in {0} minutes"}},"second":{"current":"now","past":{"one":"a second ago","other":"{0} seconds ago"},"future":{"one":"in a second","other":"in {0} seconds"}},"now":{"future":"in a moment","past":"just now"}}')},function(t){t.exports=JSON.parse('{"year":"{0}yr","month":"{0}mo","week":"{0}wk","day":"{0}d","hour":"{0}h","minute":"{0}m","second":"{0}s","now":"now"}')},function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r);o()((function(){const{goal:t,read:e}=o()("#progress-to-date").data(),n=new Date,r=new Date(n.getFullYear(),0,1),i=(n-r)/1e3/60/60/24,a=t/365,u=Math.round(a*i),s=Math.abs(e-u);var c,f="books";1==s&&(f="book"),c=u==e?"On track!":t<=e?`Goal met - on track for ${t+s} ${f}!`:u<e?`${s} ${f} ahead!`:`${s} ${f} behind.`,o()("#progress-to-date").text(c)}))},function(t,e,n){"use strict";n.r(e);var r="en",o={};function i(){return r}function a(t){return o[t]}function u(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.localeMatcher||"lookup";switch(n){case"lookup":case"best fit":return s(t);default:throw new RangeError('Invalid "localeMatcher" option: '.concat(n))}}function s(t){if(a(t))return t;for(var e=t.split("-");t.length>1;)if(e.pop(),a(t=e.join("-")))return t}function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function l(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var h=["second","minute","hour","day","week","month","quarter","year"],d=["auto","always"],p=["long","short","narrow"],m=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};c(this,t),l(this,"numeric","always"),l(this,"style","long"),l(this,"localeMatcher","lookup");var r=n.numeric,o=n.style,a=n.localeMatcher;if(r){if(d.indexOf(r)<0)throw new RangeError('Invalid "numeric" option: '.concat(r));this.numeric=r}if(o){if(p.indexOf(o)<0)throw new RangeError('Invalid "style" option: '.concat(o));this.style=o}if(a&&(this.localeMatcher=a),"string"==typeof e&&(e=[e]),e.push(i()),this.locale=t.supportedLocalesOf(e,{localeMatcher:this.localeMatcher})[0],!this.locale)throw new TypeError("No supported locale was found");this.locale=u(this.locale,{localeMatcher:this.localeMatcher}),"undefined"!=typeof Intl&&Intl.NumberFormat&&(this.numberFormat=new Intl.NumberFormat(this.locale))}var e,n,r;return e=t,(n=[{key:"format",value:function(t,e){return this.getRule(t,e).replace("{0}",this.formatNumber(Math.abs(t)))}},{key:"formatToParts",value:function(t,e){var n=this.getRule(t,e),r=n.indexOf("{0}");if(r<0)return[{type:"literal",value:n}];var o=[];return r>0&&o.push({type:"literal",value:n.slice(0,r)}),o.push({unit:e,type:"integer",value:this.formatNumber(Math.abs(t))}),r+"{0}".length<n.length-1&&o.push({type:"literal",value:n.slice(r+"{0}".length)}),o}},{key:"getRule",value:function(t,e){if(h.indexOf(e)<0)throw new RangeError("Unknown time unit: ".concat(e,"."));var n=a(this.locale)[this.style][e];if("auto"===this.numeric)if(-2===t||-1===t){var r=n["previous".concat(-1===t?"":"-"+Math.abs(t))];if(r)return r}else if(1===t||2===t){var o=n["next".concat(1===t?"":"-"+Math.abs(t))];if(o)return o}else if(0===t&&n.current)return n.current;var i=n[t<=0?"past":"future"];if("string"==typeof i)return i;var u=a(this.locale).quantify,s=u&&u(Math.abs(t));return i[s=s||"other"]||i.other}},{key:"formatNumber",value:function(t){return this.numberFormat?this.numberFormat.format(t):String(t)}},{key:"resolvedOptions",value:function(){return{locale:this.locale,style:this.style,numeric:this.numeric}}}])&&f(e.prototype,n),r&&f(e,r),t}();function y(t){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function g(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}m.supportedLocalesOf=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return"string"==typeof t&&(t=[t]),t.filter((function(t){return u(t,e)}))},m.addLocale=function(t){if(!t)throw new Error("No locale data passed");o[t.locale]=t},m.setDefaultLocale=function(t){r=t},m.getDefaultLocale=i;var v=function(){function t(){var e,n,r;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),r={},(n="cache")in(e=this)?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r}var e,n,r;return e=t,(n=[{key:"get",value:function(){for(var t=this.cache,e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];for(var o=0;o<n.length;o++){var i=n[o];if("object"!==y(t))return;t=t[i]}return t}},{key:"put",value:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];for(var r=e.pop(),o=e.pop(),i=this.cache,a=0;a<e.length;a++){var u=e[a];"object"!==y(i[u])&&(i[u]={}),i=i[u]}return i[o]=r}}])&&g(e.prototype,n),r&&g(e,r),t}(),w=86400;function b(t,e){var n=t,r=Array.isArray(n),o=0;for(n=r?n:n[Symbol.iterator]();;){var i;if(r){if(o>=n.length)break;i=n[o++]}else{if((o=n.next()).done)break;i=o.value}var a=i;if(a.unit===e)return a}}function x(t){return t instanceof Date?t:new Date(t)}var k=[{factor:1,unit:"now"},{threshold:1,threshold_for_now:45,factor:1,unit:"second"},{threshold:45,factor:60,unit:"minute"},{threshold:150,factor:60,granularity:5,unit:"minute"},{threshold:1350,factor:1800,unit:"half-hour"},{threshold:2550,threshold_for_minute:3150,factor:3600,unit:"hour"},{threshold:73800,factor:w,unit:"day"},{threshold:475200,factor:7*w,unit:"week"},{threshold:2116800,factor:2630016,unit:"month"},{threshold:27615168,factor:31556952,unit:"year"}];function S(t){return(S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function O(t,e,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:k;if(0!==(r=N(r,n)).length){var o=E(t,e,r),i=r[o];if(-1!==o){if(i.granularity){var a=Math.round(Math.abs(t)/i.factor/i.granularity)*i.granularity;if(0===a&&o>0)return r[o-1]}return i}}}function q(t,e,n,r){var o;if(t&&(t.id||t.unit)&&(o=e["threshold_for_".concat(t.id||t.unit)]),void 0===o&&(o=e.threshold),"function"==typeof o&&(o=o(n,r)),t&&"number"!=typeof o){var i=S(o);throw new Error('Each step of a gradation must have a threshold defined except for the first one. Got "'.concat(o,'", ').concat(i,". Step: ").concat(JSON.stringify(e)))}return o}function E(t,e,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;return Math.abs(t)<q(n[r-1],n[r],e,t<0)?r-1:r===n.length-1?r:E(t,e,n,r+1)}function N(t,e){return t.filter((function(t){var n=t.unit;return!n||e.indexOf(n)>=0}))}function M(t){return(M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function L(t,e){var n=t,r=Array.isArray(n),o=0;for(n=r?n:n[Symbol.iterator]();;){var i;if(r){if(o>=n.length)break;i=n[o++]}else{if((o=n.next()).done)break;i=o.value}var a=i;if(e(a))return a;for(var u=a.split("-");u.length>1;)if(u.pop(),e(a=u.join("-")))return a}throw new Error("No locale data has been registered for any of the locales: ".concat(t.join(", ")))}function C(){return"object"===("undefined"==typeof Intl?"undefined":M(Intl))&&"function"==typeof Intl.DateTimeFormat}var T={gradation:k,flavour:["long-convenient","long"],units:["now","minute","hour","day","week","month","year"]},_=[{factor:1,unit:"now"},{threshold:.5,factor:1,unit:"second"},{threshold:59.5,factor:60,unit:"minute"},{threshold:3570,factor:3600,unit:"hour"},{threshold:84600,factor:w,unit:"day"},{threshold:561600,factor:7*w,unit:"week"},{threshold:2116800,factor:2630016,unit:"month"},{threshold:30245184,factor:31556952,unit:"year"}];function j(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var D={},A={gradation:[function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable})))),r.forEach((function(e){j(t,e,n[e])}))}return t}({},b(_,"minute"),{threshold:45}),b(_,"hour"),{threshold:84600,format:function(t,e){if(C())return D[e]||(D[e]={}),D[e].this_year||(D[e].this_year=new Intl.DateTimeFormat(e,{month:"short",day:"numeric"})),D[e].this_year.format(x(t))}},{threshold:function(t,e){return e?(new Date(new Date(t).getFullYear()+1,0).getTime()-t)/1e3:(t-new Date(new Date(t).getFullYear(),0).getTime())/1e3},format:function(t,e){if(C())return D[e]||(D[e]={}),D[e].other||(D[e].other=new Intl.DateTimeFormat(e,{year:"numeric",month:"short",day:"numeric"})),D[e].other.format(x(t))}}],flavour:["tiny","short-time","narrow","short"]},F={gradation:k,flavour:"long-time",units:["now","minute","hour","day","week","month","year"]},I={};function P(t){return I[t]}function R(t){return(R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function B(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function $(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var J=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];B(this,t),"string"==typeof e&&(e=[e]),this.locale=L(e.concat(m.getDefaultLocale()),P),"undefined"!=typeof Intl&&Intl.NumberFormat&&(this.numberFormat=new Intl.NumberFormat(this.locale)),this.relativeTimeFormatCache=new v}var e,n,r;return e=t,(n=[{key:"format",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:T;if("string"==typeof e)switch(e){case"twitter":e=A;break;case"time":e=F;break;default:e=T}var n=U(t),r=n.date,o=n.time,i=this.getLocaleData(e.flavour),a=i.flavour,u=i.localeData,s=e.now||Date.now(),c=(s-o)/1e3;if(e.custom){var f=e.custom({now:s,date:r,time:o,elapsed:c,locale:this.locale});if(void 0!==f)return f}var l=W(u,e.units);if(0===l.length)return console.error('Units "'.concat(l.join(", "),'" were not found in locale data for "').concat(this.locale,'".')),"";var h=O(c,s,l,e.gradation);if(!h)return"";if(h.format)return h.format(r||o,this.locale);var d=h.unit,p=h.factor,m=h.granularity,y=Math.abs(c)/p;if(m&&(y=Math.round(y/m)*m),"now"===d)return H(u,-1*Math.sign(c));switch(a){case"long":case"short":case"narrow":return this.getFormatter(a).format(-1*Math.sign(c)*Math.round(y),d);default:return this.formatValue(-1*Math.sign(c)*Math.round(y),d,u)}}},{key:"formatValue",value:function(t,e,n){return this.getRule(t,e,n).replace("{0}",this.formatNumber(Math.abs(t)))}},{key:"getRule",value:function(t,e,n){var r=n[e];if("string"==typeof r)return r;var o=r[t<=0?"past":"future"]||r;if("string"==typeof o)return o;var i=P(this.locale).quantify,a=i&&i(Math.abs(t));return o[a=a||"other"]||o.other}},{key:"formatNumber",value:function(t){return this.numberFormat?this.numberFormat.format(t):String(t)}},{key:"getFormatter",value:function(t){return this.relativeTimeFormatCache.get(this.locale,t)||this.relativeTimeFormatCache.put(this.locale,t,new m(this.locale,{style:t}))}},{key:"getLocaleData",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=P(this.locale);"string"==typeof t&&(t=[t]);var n=t=t.concat("long"),r=Array.isArray(n),o=0;for(n=r?n:n[Symbol.iterator]();;){var i;if(r){if(o>=n.length)break;i=n[o++]}else{if((o=n.next()).done)break;i=o.value}var a=i;if(e[a])return{flavour:a,localeData:e[a]}}}}])&&$(e.prototype,n),r&&$(e,r),t}();function U(t){if(t.constructor===Date||"object"===R(e=t)&&"function"==typeof e.getTime)return{date:t,time:t.getTime()};var e;if("number"==typeof t)return{time:t};throw new Error("Unsupported relative time formatter input: ".concat(R(t),", ").concat(t))}function W(t,e){var n=Object.keys(t);return e&&(n=e.filter((function(t){return n.indexOf(t)>=0}))),(!e||e.indexOf("now")>=0)&&n.indexOf("now")<0&&t.second.current&&n.unshift("now"),n}function H(t,e){return t.now?"string"==typeof t.now?t.now:e<=0?t.now.past:t.now.future:t.second.current}J.getDefaultLocale=m.getDefaultLocale,J.setDefaultLocale=m.setDefaultLocale,J.addLocale=function(t){!function(t){if(!t)throw new Error("[javascript-time-ago] No locale data passed.");I[t.locale]=t}(t),m.addLocale(t)},J.locale=J.addLocale;var z=n(2),Y=n.n(z),G=n(0),V=n.n(G);J.addLocale(Y.a),V()((function(){const t=new J("en-US");V()(".time-ago").map((function(e,n){const r=new Date(V()(n).html()+" 00:00:00 GMT-0400");V()(n).html(t.format(r,{gradation:[{format:function(t,e){return"today"}},{threshold:86040,format:function(t,e){return"yesterday"}},{threshold:172080,factor:86400,unit:"day"}]}))}))}))}]);