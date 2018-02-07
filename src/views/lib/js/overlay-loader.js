function loader() {
    // fade out overlay
    setTimeout(function(){
      $("body").addClass("loaded").removeClass('disable-scroll');
      // remove loader animation
      $('.loaded .loader').removeClass('fade');
    }, 1000);
    // stop loading animation
    setTimeout(function(){
      // remove loader animation
      $('.loaded .loader').removeClass('loading');
    }, 2000); 
}