'use strict';

// Start app with applicable elements shown/hidden
function toggleRules() {
  $('#subnav-timer').toggle(true);
  $('#subnav-timer-on').toggle(false);
  $('#find-box-wrap').toggle(false);
  $('#rule-box').fadeIn(3000).delay(500);
  $('#clue-box').toggle(false);
  $('#game-rules').html(STATS.gameRules);
  $('#results-title').toggle(false);
  $('#answer-form').toggle(false);
  $('#play-btn').focus();
}

// Setter for the count down timer
function countdownTimer() {
  var dt = new Date();
  var endTime = dt.setHours( dt.getHours() + 1 );

  timer = setInterval(function() {
    var now = new Date().getTime();
    var distance = endTime - now;

    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    $('#subnav-timer').html(hours + "H | " + minutes + "M | " + seconds + "S ");

    if (distance < 0) {
      resetTimer();
      $('#rule-box').toggle(false);
      $('#clue-box').toggle(false);
    }
  }, 1000);
}

// Stop and reset timer back to default
function resetTimer() {
  clearInterval(timer);
}

// Play button actions upon click
function handlePlayClick() {
  $('#play-btn').on('click', function() {
    STATS.timer = true;
    countdownTimer();
    
    $('#rule-box').slideUp(2000);
    $('#clue-box').fadeIn(3000);
    $('#hunt-btn').focus();
    $("html, body").animate({ scrollTop: 0 }, "slow");

    var n = STATS.questionNumber;
    renderClueDetails(n);
  });
}

// Render clue description and image on page
function renderClueDetails(n) {
  console.log('Count', n);

  if (n <= 3) {
    $('#clue-title').html(`Clue # ${n}`);
    $('#clue-slot').html(STORE[n - 1]);
    $('#clue-img-title').html(`Clue # ${n} | Image`);

    var imgPath = `/img/img-${n}.jpg`;
    $('#clue-img-slot').attr('src',`${imgPath}`);
  } else {
    return false;
  }
}

// Hunt button actions upon click
function handleHuntClick() {
  $('#hunt-btn').on('click', function() {
    $('#find-box-wrap').animate(
      { width: 'toggle' }
    );

    $('#find-box').focus();

    const queryTerm = $('#find-box').val();

    if (queryTerm == "" || queryTerm == " " || queryTerm == null) {
      // No mathces found and returned
      renderNoResult("No Match Found");
    } else {
      // Matches found and returned
      let n = STATS.questionNumber;

      if (n === 1) {
        getDataFromComicVineComicsApi(queryTerm);
      } else if (n === 2) {
        getDataFromComicVineMoviesApi(queryTerm);
      } else if (n === 3) {
        getDataFromMapsApi(queryTerm);
      } else {
        console.warn('not 1 or 2 or 3');
      }
    }
  });
}

// Handle keyboard input for Hunt button
function keypressEnter() {
  $('#find-box').keydown(function(e) {
    var keycode = e.which;

    if (keycode == 13) {
      $('#hunt-btn').click();
      $('#hunt-btn').focus();
      return false;
    }
  });
}

// Validation function to check results
function validateResults(value) {
  if (!value) {
    return " - ";
  } else {
    return value;
  }
}

// Ajax call to get data from api
function getDataFromComicVineComicsApi(searchTerm) {
  let s = `${searchTerm}`;
  var search = API_COMICS.surl() + s;

  let settings = {
    url: `${search}`,
    type: "GET",
    dataType: "jsonp",
  };

  $.ajax(settings);
}

// Render results back from api call
function renderComicsResult(result) {
  for (let i = 0; i < result.length; i++) {
    var img = result[i].image.original_url;
    var name = validateResults(result[i].name);
    var realName = validateResults(result[i].real_name);

    if (result[i].publisher) {
      var publisher = validateResults(result[i].publisher.name);
    } else {
      var publisher = validateResults(result[i].publisher);
    }

    var deck = validateResults(result[i].deck);

    $('#js-result').append(
      `
        <div class="js-result-row">
          <div class="col-six">
            <div class="result-img">
              <a id="img-link" href=${img} target="_blank"><img class="img-thumb" src=${img} /></a>
            </div>
          </div>

          <div class="col-six">
            <div class="rule-instructions result-info">
              <h4 class="movie-title"><span class="result-lbl">Hero Name:</span> ${name}</h4>
              <h5 class="movie-title"><span class="result-lbl">Real Name:</span> ${realName}</h5>
              <p class="movie-date"><span class="result-lbl">Publisher:</span> ${publisher}</p>
              <p class="movie-deck"><span class="result-lbl">Summary:</span> ${deck}</p>
            </div>
          </div>
        </div>
      `
    );
  }
}

// Handle response depending on number of results returned
// Called through ajax parameters
function returnResponse(data){
  var r = data.results;
  console.log('Data Results', r);

  if (r.length > 0) {
    $('#clue-box').toggle(false);
    $('#results-title').toggle(true);
    $('#no-match-hunt-again-row').toggle(false);
    $('#answer-form').toggle(true);
    $("html, body").animate({ scrollTop: 0 }, "slow");
    renderQuestionSelections();
  } else {
    $('#find-box').val("");
    $("html, body").animate({ scrollTop: $(document).height() }, "slow");
    $('#hunt-btn').focus();
  }

  let n = STATS.questionNumber;

  if (n === 1) {
    renderComicsResult(r);
  } else if (n === 2) {
    renderMoviesResult(r);
  } else if (n === 3) {
    renderMapResult(r);
  } else {
    return false;
  }
}

// Render message when no results are returned
function renderNoResult(value) {
  $('#js-result').html(
    `
      <div class="row js-result-row" id="no-match-hunt-again-row">
        <h3 class="rule-title no-match-found" id="no-match-incorrect-answer">${value}!</h3>
        <h4 class="rule-title hunt-again" id="hunt-again">Hunt Again!</h4>
      </div>
    `
  );
}

// Ajax call to get data from api
function getDataFromComicVineMoviesApi(searchTerm) {
  let s = `${searchTerm}`;
  var search = API_MOVIES.surl() + s;

  let settings = {
    url: `${search}`,
    type: "GET",
    dataType: "jsonp",
  };

  $.ajax(settings);
}

// Render results back from api call
function renderMoviesResult(result) {
  for (let i = 0; i < result.length; i++) {
    var img = result[i].image.original_url;
    var name = validateResults(result[i].name);

    if (result[i].total_revenue) {
      var revenue = validateResults(result[i].total_revenue);
      revenue = parseInt(revenue);
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      });
      revenue = formatter.format(revenue);
    } else {
      var revenue = validateResults(result[i].total_revenue);
    }
    
    var rating = validateResults(result[i].rating);

    var releaseDate = validateResults(result[i].release_date);
    releaseDate = new Date(releaseDate).toLocaleDateString();

    if (result[i].writers) {
      var director = validateResults(result[i].writers[0].name);
    } else {
      var director = validateResults(result[i].writers);
    }
    
    var deck = validateResults(result[i].deck);

    $('#js-result').append(
      `
        <div class="js-result-row">
          <div class="col-six">
            <div class="result-img">
              <a id="img-link" href=${img} target="_blank"><img class="img-thumb" src=${img} /></a>
            </div>
          </div>

          <div class="col-six">
            <div class="rule-instructions result-info">
              <h4 class="movie-title"><span class="result-lbl">Movie Title:</span> ${name}</h4>
              <h5 class="movie-title"><span class="result-lbl">Revenue:</span> ${revenue}</h5>
              <p class="movie-date"><span class="result-lbl">Rating:</span> ${rating}</p>
              <p class="movie-deck"><span class="result-lbl">Release Date:</span> ${releaseDate}</p>
              <p class="movie-deck"><span class="result-lbl">Director:</span> ${director}</p>
              <p class="movie-deck"><span class="result-lbl">Summary:</span> ${deck}</p>
            </div>
          </div>
        </div>
      `
    );
  }
}

// getJSON call to get data from api
function getDataFromMapsApi(searchTerm) {
  var url = "https://api.foursquare.com/v2/venues/search?";

  const param = {
    client_id: "K1JMJPEZORIQFY4UIFXHQTHV0DQSQZPH043PCDXBWGOMWVFY",
    client_secret: "FOK30KASU3C3FL011EXJCMQEHXLCNTT2EANEKJXXYGBHMR2R",
    limit: 5,
    v: "20181025",
    near: "prague",
    query: `${searchTerm}`,
  }

  $.getJSON(url, param, function (data) {
    var r = data.response.venues;
    returnResponseForMap(r);
  });
}

// Handle response depending on number of results returned
// Called through getJSON parameters
function returnResponseForMap(data){
  var r = data;
  console.log('Map Data Results', r);

  if (r.length > 0) {
    $('#clue-box').toggle(false);
    $('#results-title').toggle(true);
    $('#no-match-hunt-again-row').toggle(false);
    $('#answer-form').toggle(true);
    $("html, body").animate({ scrollTop: 0 }, "slow");
    renderQuestionSelections();
  } else {
    $('#find-box').val("");
    $("html, body").animate({ scrollTop: $(document).height() }, "slow");
    $('#hunt-btn').focus();
  }

  renderMapResult(r);
}

// Render results back from api call
function renderMapResult(result) {
  for (let i = 0; i < result.length; i++) {
    var img = ISTORE.img0;
    var name = validateResults(result[i].name);

    if (name == "National Technical Museum (Národní technické muzeum)") {
      img = ISTORE.img1;
    } else if (name == "National Memorial on the Vítkov Hill (Národní památník na Vítkově)") {
      img = ISTORE.img2;
    } else if (name == "National Marionette Theatre") {
      img = ISTORE.img3;
    } else if (name == "National Museum (Národní muzeum)") {
      img = ISTORE.img4;
    } else if (name == "National Gallery in Prague (Národní galerie v Praze)") {
      img = ISTORE.img5;
    } else if (name == "Pomník mistra Jana Husa") {
      img = ISTORE.img6;
    } else if (name == "The Estates Theater (Stavovské divadlo)") {
      img = ISTORE.img7;
    } else {
      img = ISTORE.img0;
    }

    var a1 = validateResults(result[i].location.formattedAddress[0]);
    var a2 = validateResults(result[i].location.formattedAddress[1]);
    var a3 = validateResults(result[i].location.formattedAddress[2]);
    var address = `<br> ${a1} <br> ${a2} <br> ${a3}`;

    var lat = validateResults(result[i].location.lat);
    var lng = validateResults(result[i].location.lng);

    $('#js-result').append(
      `
        <div class="js-result-row">
          <div class="col-six">
            <div class="result-img result-img-map" id="result-img">
              <div class="clue-img-wrap">
                <a id="img-link" href=${img} target="_blank"><img class="clue-img clue-img-map" src=${img} /></a>
              </div>
            </div>
          </div>

          <div class="col-six">
            <div class="rule-instructions result-info">
              <h4 class="movie-title"><span class="result-lbl">Location:</span> ${name}</h4>
              <h5 class="movie-title"><span class="result-lbl">Address:</span> ${address}</h5>
              <p class="movie-date"><span class="result-lbl">Latitude:</span> ${lat}</p>
              <p class="movie-date"><span class="result-lbl">Longitude:</span> ${lng}</p>
            </div>
          </div>
        </div>
      `
    );
  }
}

// Render quiz question and selections
function renderQuestionSelections() {
  let n = STATS.questionNumber - 1;
  let sMax = QSTORE[n].choices.length;
  let e = "";

  $('#question-slot').html(QSTORE[n].question);

  for (let i = 1; i <= sMax; i++) {
    // Assign value from STORE to option labels
    e = "lbl-option-" + i;
    $(`#${e}`).html(QSTORE[n].choices[i - 1]);

    // Assign value from STORE to input values
    e = "option-" + i;
    $(`#${e}`).val(QSTORE[n].choices[i - 1]);
  }
}

// Clear search term then reset query
function clearResults() {
  let queryTerm = "";
  getDataFromComicVineComicsApi(queryTerm);
}

// Hide search results
function toggleSearchResults() {
  $('#answer-form').toggle(false);
  $('input[name="radio"]').prop('checked', false);
  $('#results-title').toggle(false);
  $('.js-result-row').toggle(false);
}

// Okay button actions upon click
function handleOkayClick() {
  let nx = STATS.questionNumber - 1;
  let optionSelected = $('input:checked').val();
  console.log('Hero Selected: ', optionSelected);

  if (optionSelected === QSTORE[nx].answer) {
    // Feedback if correct
    STATS.questionNumber = STATS.questionNumber + 1;
    var n = STATS.questionNumber;

    $('#clue-box').toggle(false);

    toggleSearchResults();
    renderClueDetails(n);
    renderCorrectAnswer("Correct Answer");
    $('#continue-btn').focus();
  } else {
    // Feedback if wrong
    $('#clue-box').toggle(true);
    $('#hunt-btn').focus();
    $('#find-box').select();

    toggleSearchResults();    
    renderNoResult("Incorrect Answer");
  }

  $("html, body").animate({ scrollTop: 0 }, "slow");
}

// Render message when incorrect answer is selected
function renderCorrectAnswer(value) {
  let nx = STATS.questionNumber - 1;

  $('#js-result').html(
    `
      <div class="correct-feedback-box" id="correct-feedback-box">
        <h3 class="rule-title no-match-found" id="no-match-incorrect-answer">${value}!</h3>
        <p class="feedback">${QSTORE[nx - 1].feedback}</p>
        
        <div class="clue-btn-wrap continue-btn-wrap">
          <button class="clue-btn" id="continue-btn">Continue Hero Hunt</button>
        </div>
      </div>
    `
  );
}

// Answer form actions upon submit
function handleAnswerFormSubmit() {
  $('#answer-form').on('submit', function(e) {
    e.preventDefault();
    clearResults();
    handleOkayClick();
    handleContinueClick();
  });
}

// Continue button actions upon click
function handleContinueClick() {
  $('#continue-btn').on('click', function() {
    var n = STATS.questionNumber;

    if (n <= 3) {
      $("html, body").animate({ scrollTop: 0 }, "slow");

      $('#correct-feedback-box').toggle(false);

      toggleSearchResults();
      renderClueDetails(n);

      $('#clue-box').toggle(true);
      $('#hunt-btn').focus();
    } else {
      $('#subnav-timer').toggle(false);
      $('#subnav-timer-on').toggle(true).html("FINISHED");

      renderEndGame();
      $('#play-again-btn').focus();
    }
  });
}

// Reset all of the game stats
function resetGame() {
  STATS.questionNumber = 1;
  STATS.numberCorrect = 0;
  STATS.numberWrong = 0;
  STATS.timer = false;
  resetTimer();
}

// Play Again button actions upon click
function handlePlayAgainClick() {
  // For dynamic DOM element use Event Delegation
  $('#js-result').on('click', '#play-again-btn', function() {
    $('#end-game-box').toggle(false);
    resetGame();
    toggleRules();
    $('#subnav-timer').html("1H | 0M | 0S");
  });
}

// Show game play ended message
function renderEndGame() {
  $('#correct-feedback-box').toggle(false);

  $('#js-result').html(
    `
      <div class="end-game-box" id="end-game-box">
        <h3 class="rule-title no-match-found" id="no-match-incorrect-answer">
          You finished the Hero Hunt!
        </h3>

        <div class="clue-btn-wrap continue-btn-wrap">
          <button class="clue-btn" id="play-again-btn">Play Again</button>
        </div>
      </div>
    `
  );
}


// Start app procedures
function appStart() {
  toggleRules();
  handlePlayClick();
  handleHuntClick();
  keypressEnter();
  handleAnswerFormSubmit();
  handlePlayAgainClick();
}

$(appStart);