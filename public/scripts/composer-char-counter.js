$(() => {
  const MAXTWEETLENGTH = 140;
  $("#tweet-text").on('keyup', function(e) {
    const $tweetText = $(this);
    const $counter = $tweetText.siblings('.counter');
    let tweetLength = $tweetText.val().length;
    let newCounterValue = MAXTWEETLENGTH - tweetLength;
    $counter.val(newCounterValue);
    let counterValue = parseInt($counter.val());
    if (counterValue < 0) {
      if (!$counter.hasClass('negative')) $counter.addClass('negative');
    } else {
      if ($counter.hasClass('negative')) $counter.removeClass('negative');
    }
  });
});