(function () {
  $.fn.fitHeights = function () {
    var items = $(this);
    function setHeights() {
      var currentTallest = 0;
      items.css({ 'min-height': currentTallest });
      items.each(function () {
        if ($(this).height() > currentTallest) { currentTallest = $(this).height(); }
      });
      items.css({ 'min-height': currentTallest });
    }
    setHeights();
    $(window).on('resize', setHeights);
    return this;
  };
})(jQuery);
$(window).load(function () {

  $('.grid-testimonials p').fitHeights();
});