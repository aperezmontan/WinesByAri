$(function(){
  var typingTimer;
  var doneTypingInterval = 2000;

  $('#search').keyup(function(){
    clearTimeout(typingTimer);
    if ($('#search').val()) {
      typingTimer = setTimeout(doneTyping, doneTypingInterval);
    } else if ($('#search').val() == 0) {
      $(".pagination").html("Page is loading...");
      $.get('/products', null, null, "script");
    }
  });

  function doneTyping () {
    if ($('#search').val().length > 1){
      search = { search: $('#search').val() }
      $(".pagination").html("Page is loading...");
      $.get('/products', search, null, "script");
    }
  }
})