var Toast = (function($, undefined) {
  'use strict';

  function setAlert (msg, timing) {
    timing || (timing = 2000);

    appear(msg);
    disappear(timing);
  }

  function appear(msg) {
    $('body').append('<div id="toast"><p>' + msg + '</p></div>');
    var $toast = $('#toast');
    $toast.css({ position: 'fixed', left: '10px', bottom: '-50px', display: 'block' });
    $toast.transition({ bottom: '10px' }, 200, 'snap');
  }

  function disappear(duration) {
    setTimeout(function() {
      var $toast = $('#toast');
      $toast.transition({ bottom: '-50px' }, 200, 'easeOutCubic', function() {
        $toast.remove();
      });
    }, duration);
  }

  return {
    alert: setAlert
  };

})(jQuery);
