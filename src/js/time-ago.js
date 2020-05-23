import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import $ from "cash-dom";

TimeAgo.addLocale(en)

$(function() {
  const timeAgo = new TimeAgo('en-US');
  $('.time-ago').map(function(_index, element){
    const timeGradation = [
      {
        format: function(value, locale) {
          return 'today';
        }
      },
      {
        threshold: 23.9 * 60 * 60,
        format: function(value, locale) {
          return 'yesterday';
        }
      },
      {
        threshold: 2 * 23.9 * 60 * 60,
        factor: 24 * 60 * 60,
        unit: 'day'
      }
    ];

    const date = new Date($(element).html() +' 00:00:00 GMT-0400');
    $(element).html(timeAgo.format(date, {gradation: timeGradation}));
  });
});
