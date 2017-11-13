$(document).ready(function() {
  $("#accordion section label").click(function(e) {
    $('.ac_item').each(function() {
      $(this).addClass("ac_hidden");
      $(this).find('.minus').addClass('hidden');
      $(this).find('.plus').removeClass('hidden');
    });

    $(this).parents("section").removeClass("ac_hidden");
    $(this).children('.minus').removeClass('hidden');
    $(this).children('.plus').addClass('hidden');

    e.preventDefault();
  });
});