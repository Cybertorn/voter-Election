$(function() {
    "use strict";

    /* ==========================================================================
   Preload
   ========================================================================== */
 
    $(window).load(function() {
        
        $("#status").fadeOut();
        
        $("#preloader").delay(1000).fadeOut("slow");
    });

    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
          'total': t,
          'days': days,
          'hours': hours,
          'minutes': minutes,
          'seconds': seconds
        };
      }
      
      function initializeClock(id, endtime) {
        var clock = document.getElementById(id);
        var daysSpan = clock.querySelector('.days');
        var hoursSpan = clock.querySelector('.hours');
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');
      
        function updateClock() {
          var t = getTimeRemaining(endtime);
      daysSpan.innerHTML = t.days;
          hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
          minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
          secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
      
          if (t.total <= 0) {
            clearInterval(timeinterval);
            function hide()
            {
                document.getElementById('read-more').style.visibility="show";
            }
            
          }
        }
      
        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
      
      }
      var deadline = new Date(Date.parse(new Date()) + 20* 24 * 60 * 60 * 1000);
      initializeClock('clockdiv', deadline);
    /* ==========================================================================
   Background Slideshow images
   ========================================================================== */

    $(".main").backstretch([
        "img/bg-1.jpg",
        "img/bg-2.jpg",
		"img/bg-4.jpeg",
		"img/bg-t.jpg"
        
    ], {
        fade: 750,
        duration: 4000
    });


    /* ==========================================================================
   On Scroll animation
   ========================================================================== */
    
    if ($(window).width() > 992) {
        new WOW().init();
    };
    

    /* ==========================================================================
   Fade On Scroll
   ========================================================================== */
    
    
    if ($(window).width() > 992) {
        
        $(window).on('scroll', function() {
            $('.main').css('opacity', function() {
                return 1 - ($(window).scrollTop() / $(this).outerHeight());
            });
        });
    };
    

    /* ==========================================================================
   Tweet
   ========================================================================== */
    
    
    $('.tweet').twittie({
        username: 'designstub', // change username here
        dateFormat: '%b. %d, %Y',
        template: '{{tweet}} {{user_name}}',
        count: 10
    }, function() {
        var item = $('.tweet ul');
        
        item.children('li').first().show().siblings().hide();
        setInterval(function() {
            item.find('li:visible').fadeOut(500, function() {
                $(this).appendTo(item);
                item.children('li').first().fadeIn(500);
            });
        }, 5000);
    });

    /* ==========================================================================
   countdown
   ========================================================================== */
    
    $('.countdown').downCount({
        date: '12/15/2019 12:00:00' // m/d/y
    });


   
    /* ==========================================================================
     Textrotator
     ========================================================================== */
    
    
    
    $(".rotate").textrotator({
        animation: "dissolve",
        separator: ",",
        speed: 2500
    });

   
   


});
