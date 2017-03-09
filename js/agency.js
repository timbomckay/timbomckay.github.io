// JavaScript
/*global ga */

function randomChoice(arr) {
  return arr[Math.floor(arr.length * Math.random())];
}

function eventTracking(eDesc, action) {
  if (action === undefined) {
   action = "click";
  }
  ga('send', 'event', {
    eventCategory: 'Outbound Link',
    eventAction: action,
    eventLabel: eDesc,
    transport: 'beacon'
  });
}

(function($) {
  "use strict"; // Start of use strict

  // Random Background Image
  var bgImages = [
    'TCCCKgdFmBo',
    '0l0yzOD1ZDI',
    'W3V2tQAZxPA',
    'ZQwyFDqNxa0',
    '9jYj32TN9Ts',
    'cv_fqvrbKWs',
    'jXyKqnFnZos'
  ];

  $('header').css('background-image', 'url("https://source.unsplash.com/'+ randomChoice(bgImages) +'/1600x900/")');


  // jQuery for page scrolling feature - requires jQuery Easing plugin
  // $('a.page-scroll').bind('click', function(event) {
  //   var $anchor = $(this);
  //   $('html, body').stop().animate({
  //     scrollTop: ($($anchor.attr('href')).offset().top - 50)
  //   }, 1250, 'easeInOutExpo');
  //   event.preventDefault();
  // });

  // Highlight the top nav as scrolling occurs
  // $('body').scrollspy({
  //   target: '.navbar-fixed-top',
  //   offset: 51
  // });

  // Closes the Responsive Menu on Menu Item Click
  $('.navbar-collapse ul li a').click(function(){
    $('.navbar-toggle:visible').click();
  });

  // Offset for Main Navigation
  $('#mainNav').affix({
    offset: {
      top: 100
    }
  });

  $('.portfolio-modal').on('shown.bs.modal', function () {

    eventTracking( $(this).data('project'), 'View Modal' );

  });

  $('a[target="_new"]').click(function() {
    if( $(this).data('project') ) {
      eventTracking( $(this).data('project') + ' view', 'View Modal' );
    } else {
      eventTracking( $(this).closest('.portfolio-modal').data('project') + ' visit', 'Visit Project' );
    }

  });

})(jQuery); // End of use strict
