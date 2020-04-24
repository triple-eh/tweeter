/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  const testTweets = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const calculateTweetAge = (created_at) => {
    const currentDate = new Date();
    const createdAt = new Date(created_at);
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round((currentDate - createdAt) / oneDay);
  };
  
  const createTweetElement = (tweet) => {
    const $tweets = $("#tweets");
    const $article = $('<article>',{'class':'tweet'});
    // header -> div class=avatar -> img | div class=user -> p | div class=handle = p
    const $header = $('<header>');
    const $avatar = $('<div>',{'class': 'avatar'}).append($('<img>',{'src':`${tweet.user.avatars}`}));
    const $user = $('<div>',{'class':'user'}).append($('<p>').text(`${tweet.user.name}`));
    const $handle = $('<div>',{'class':'handle'}).append($('<p>').text(`${tweet.user.handle}`));
    $header.append($avatar,$user,$handle);
    // content
    const $content = $('<div>',{'class':'content'}).append($('<p>').text(`${tweet.content.text}`));
    // footer - div class=age - span | div class=actions - i class 
    const $footer = $('<footer>');
    //calculate tweet age in days
    const daysAgo = calculateTweetAge(tweet.created_at);
    const $age = $('<div>',{'class':'age'}).append($('<span>').text(`${daysAgo} days ago`));
    const $actions = $('<div>',{'class':'actions'})
      .append(
        $('<i>',{'class':'flaticon-flags'}),
        $('<i>',{'class':'flaticon-heart'}),
        $('<i>',{'class':'flaticon-retweet'})
      );
    $footer.append($age,$actions);
    return $article.append($header,$content,$footer);
  };
  
  testTweets.forEach((tweet) => {
    const $tweet = createTweetElement(tweet);
    $("#tweets").append($tweet);
  });
});
