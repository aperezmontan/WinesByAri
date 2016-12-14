$(function(){
  $(document).on("click", ".pagination a", function(e){
    e.preventDefault();
    $(".pagination").html("Page is loading...");
    $.get(this.href, null, null, "script");
  });
});

$(function(){
  var typingTimer;
  var doneTypingInterval = 2000;

  $('#per-page').keyup(function(){
    clearTimeout(typingTimer);
    if ($('#per-page').val()) {
      typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }
  });

  function doneTyping () {
    perPage = { per_page: $('#per-page').val() }
    $(".pagination").html("Page is loading...");
    $.get('/products', perPage, null, "script");
  }
})