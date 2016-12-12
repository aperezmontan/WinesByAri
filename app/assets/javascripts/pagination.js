$(function(){
  $(document).on("click", ".pagination a", function(e){
    e.preventDefault();
    $(".pagination").html("Page is loading...");
    $.get(this.href, null, null, "script");
  });
});