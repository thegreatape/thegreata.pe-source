import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import $ from "cash-dom";

TimeAgo.addLocale(en)

$(function() {
  const timeAgo = new TimeAgo('en-US');
  $('.time-ago').map(function(_index, element){
    timeAgo.format(new Date());
    $(element).html(timeAgo.format(new Date($(element).html())))
  });
});
