// JavaScript
/*global ga */

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
