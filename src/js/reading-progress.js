import $ from "cash-dom";

$(function() {
  const { goal, read } = $('#progress-to-date').data();
  const today = new Date();
  const yearStart = new Date(today.getFullYear(), 0, 1);
  const daysSoFar = (today - yearStart) / 1000 / 60 / 60 / 24;
  const goalBooksPerDay = goal / 365.0;
  const goalBooksByNow = Math.round(goalBooksPerDay * daysSoFar);
  const difference = Math.abs(read - goalBooksByNow);

  var message;
  var books = 'books';
  if(difference == 1) {
    books = 'book';
  }
  if(goalBooksByNow == read) {
    message = 'On track!';
  } else if (goalBooksByNow > read) {
    message = `${difference} ${books} ahead!`;
  } else {
    message = `${difference} ${books} behind.`;
  }
  $('#progress-to-date').text(message);
});
