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

      var $a;
      if (parameters.destination.type === 'url') {
        var link = new H5P.Link({
          title: '',
          linkWidget: parameters.destination.url
        });

        link.attach($container);
        $a = $container.find('a');
        if (parameters.texts.ariaLabel) {
          $a.attr('aria-label', parameters.texts.ariaLabel);
        }
      }
      else {
        $a = $('<a>', {
          'aria-label': parameters.texts.ariaLabel
        }).on('click', function () {
          self.trigger('goto', parameters.destination.time);
        });
        $container.html($a);
      }

      $a.css({cursor: parameters.visuals.pointerCursor ? 'pointer' : 'default'});

      if (parameters.visuals.animation || H5PEditor !== undefined) {
        $container.append($('<div>', {
          'class': 'blinking-hotspot'
        }));
      }
    };
  }

  return IVHotspot;

})(H5P.jQuery);
