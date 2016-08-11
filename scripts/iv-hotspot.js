H5P.IVHotspot = (function ($) {

  /**
   * Create a new IV Hotspot!
   *
   * @class H5P.IVHotspot
   * @extends H5P.EventDispatcher
   * @param {Object} parameters
   */
  function IVHotspot(parameters) {
    var self = this;

    parameters = $.extend(true, {
      destination: {
        type: 'timecode',
        time: '0:00'
      },
      visuals: {
        shape: 'circular',
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
      },
      texts: {}
    }, parameters);

    /**
     * Attach the hotspot to the given container.
     *
     * @param {H5P.jQuery} $container
     */
    self.attach = function ($container) {
      $container.addClass('h5p-ivhotspot').css({
        backgroundColor: parameters.visuals.backgroundColor
      }).addClass(parameters.visuals.shape);

      if (parameters.destination.type === 'url') {
        var link = new H5P.Link({
          linkWidget: parameters.destination.url
        });

        link.attach($container);

        if (parameters.texts.ariaLabel) {
          $container.find('a').attr('aria-label', parameters.texts.ariaLabel);
        }
      }
      else {
        var $a = $('<a>', {
          'aria-label': parameters.texts.ariaLabel
        }).on('click', function () {
          self.trigger('goto', parameters.destination.time);
        });
        $container.html($a);
      }
    };
  }

  return IVHotspot;

})(H5P.jQuery);
