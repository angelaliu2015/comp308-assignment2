/* custom JS goes here */

// IIFE
(function(){
  $(".btn-danger").click(function(event){
    if(!confirm("Are you sure?")) {
      event.preventDefault();
      window.location.assign("/games");
    }
  });
})();

(function(){
  $(".btn-secondary").click(function(event){
    if(!confirm("Do you want to delete?")) {
      event.preventDefault();
      window.location.assign("/businesses");
    }
  });
})();
