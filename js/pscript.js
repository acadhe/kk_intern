 <!--   scroll down to link /  scroll top  -->
      //alijafarian.com/responsive-page-scrolling-with-jquery-and-bootstrap/ -->
      $(document).ready(function() {
          // navigation click actions 
        $('.scroll-link').on('click', function(event){
          event.preventDefault();
          var sectionID = $(this).attr("data-id");
          scrollToID('#' + sectionID, 750);
        });
        // scroll to top action
        $('.scroll-top').on('click', function(event) {
          event.preventDefault();
          $('html, body').animate({scrollTop:0}, 'slow');     
        });
        // mobile nav toggle
        $('#nav-toggle').on('click', function (event) {
          event.preventDefault();
          $('#main-nav').toggleClass("open");
        });
      });
      // scroll function
      function scrollToID(id, speed){
        var offSet = 50;
        var targetOffset = $(id).offset().top - offSet;
        var mainNav = $('#main-nav');
        $('html,body').animate({scrollTop:targetOffset}, speed);
        if (mainNav.hasClass("open")) {
          mainNav.css("height", "1px").removeClass("in").addClass("collapse");
          mainNav.removeClass("open");
        }
      }
      if (typeof console === "undefined") {
          console = {
              log: function() { }
          };
      };
        $(document).ready(function(){
           $(window).scroll(function () {
                  if ($(this).scrollTop() > 50) {
                      $('#back-to-top').fadeIn();
                  } else {
                      $('#back-to-top').fadeOut();
                  }
              });
              // scroll body to 0px on click
              $('#back-to-top').click(function () {
                  $('#back-to-top').tooltip('hide');
                  $('body,html').animate({
                      scrollTop: 0
                  }, 800);
                  return false;
              });
              
              $('#back-to-top').tooltip('show');
      
      });
      
      
      $('#myTabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
      }) ;
      
       
      
      // make paginator change tab and scroll to the top of tab content
      function switchTab(id) {
          $('#myTabs a[href='+id+']').tab('show');// Select tab by name
          scrollToID(syllabus, 750)
      };