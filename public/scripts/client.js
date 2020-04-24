/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/


$(() => {

  const MAXTWEETLENGTH = 140;

  const tweetValidation = {
    isValid: function(tweet) {
      return (tweet.length > 0 && tweet.length <= MAXTWEETLENGTH)
    },
    validationError: function(tweet) {
      if (this.isValid(tweet)) return;
      let error;
      if (tweet.length <= 0) error = 'The tweet must contain something';
      if (tweet.length > MAXTWEETLENGTH) error = `The tweet cannot be longer than ${MAXTWEETLENGTH}`;
      return error;
    }
  };

  const loadTweets = () => {
    const $tweets = $('#tweets');
    $tweets.empty();
    $.getJSON('tweets',(tweets) => {
      renderTweets(tweets);
    });
  };

  const calculateTweetAge = (created) => {
    const currentDate = new Date();
    const createdAt = new Date(created);
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round((currentDate - createdAt) / oneDay);
  };
  
  const createTweetElement = (tweet) => {
    const $article = $('<article>', {'class': 'tweet'});

    // header -> div class=avatar -> img | div class=user -> p | div class=handle = p
    const $header = $('<header>');
    const $avatar = $('<div>', {'class': 'avatar'}).append($('<img>', {'src': `${tweet.user.avatars}`}));
    const $user = $('<div>', {'class': 'user'}).append($('<p>').text(`${tweet.user.name}`));
    const $handle = $('<div>', {'class': 'handle'}).append($('<p>').text(`${tweet.user.handle}`));
    $header.append($avatar, $user, $handle);

    // content
    const $content = $('<div>', {'class': 'content'}).append($('<p>').text(`${tweet.content.text}`));

    // footer - div class=age - span | div class=actions - i class 
    const $footer = $('<footer>');
    const daysAgo = calculateTweetAge(tweet.created_at);
    const $tweetAge = $('<div>', {'class': 'age'}).append($('<span>').text(`${daysAgo} days ago`));
    const $actions = $('<div>', {'class': 'actions'})
      .append(
        $('<i>', {'class': 'flaticon-flags'}),
        $('<i>', {'class': 'flaticon-heart'}),
        $('<i>', {'class': 'flaticon-retweet'})
      );
    $footer.append($tweetAge, $actions);
    return $article.append($header, $content, $footer);
  };

  const renderTweets = (tweets) => {
    tweets.forEach((tweet) => {
      const $tweet = createTweetElement(tweet);
      $("#tweets").append($tweet);
    });
  };

  const tweeting = () => {
    const $form = $('form');
    $form.on('submit', (e) => {
      e.preventDefault();
      const tweet = $(e.target).children('textarea').val();
      const $submissionError = $('#submission-error');
      const $errorMessage = $submissionError.children('p');
      if (!tweetValidation.isValid(tweet)) {
        const error = tweetValidation.validationError(tweet);
        if (!$submissionError.hasClass('error')) $submissionError.addClass('error');
        $errorMessage.text(error);
        return;
      }
      if ($submissionError.hasClass('error')) $submissionError.removeClass('error');
      const tweetSerialized = $(e.target).serialize();
      $(e.target).children('textarea').val("");
      $.post('/tweets', tweetSerialized, () => {
        loadTweets();
      });
    });
  };
  
  loadTweets();
  tweeting();
  
});
