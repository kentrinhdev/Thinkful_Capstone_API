'use strict';

// Start app with applicable elements shown/hidden
function toggleRules() {
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
  var endTime = dt.setHours( dt.getHours() + 2 );

  var x = setInterval(function() {
  var now = new Date().getTime();

  var distance = endTime - now;

  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  $('#subnav-timer').html(hours + "H | " + minutes + "M | " + seconds + "S ");
  
  if (distance < 0) {
    clearInterval(x);
    $('#rule-box').toggle(false);
    $('#clue-box').toggle(false);
  }

  }, 1000);
}

function renderClueDetails(n) {
  // let n = STATS.questionNumber;
  console.log('questionNumber: ', n);

  $('#clue-title').html(`Clue # ${n}`);
  $('#clue-slot').html(STORE[n - 1]);
  $('#clue-img-title').html(`Clue # ${n} | Image`);

  var imgPath = `/img/img-${n}.jpg`;
  $('#clue-img-slot').attr('src',`${imgPath}`);
}

// Play button click actions
function handlePlayClick() {
  $('#play-btn').on('click', function() {
    countdownTimer();
    
    $('#rule-box').slideUp(2000);
    $('#clue-box').fadeIn(3000);
    $('#hunt-btn').focus();
    $("html, body").animate({ scrollTop: 0 }, "slow");

    var n = STATS.questionNumber;

    renderClueDetails(n);
  });
}

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

// Hunt button click actions
function handleHuntClick() {
  $('#hunt-btn').on('click', function() {
    $('#find-box-wrap').animate(
      { width: 'toggle' }
    );

    $('#find-box').focus();

    const queryTerm = $('#find-box').val();

    if (queryTerm == "" || queryTerm == " " || queryTerm == null) {
      renderNoResult("No Match Found");
      return false;
    } else {
      getDataFromComicVineComicsApi(queryTerm);
    }
  });

  $('#hunt-btn').focus();
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

function renderResult(result) {
  for (let i = 0; i < result.length; i++) {
    var img = result[i].image.original_url;
    var name = result[i].name;

    var realName = result[i].real_name;
    if (!realName) {
      realName = " - ";
    } else {
      realName = realName;
    }

    var publisher = result[i].publisher.name;

    var deck = result[i].deck;
    if (!deck) {
      deck = " - ";
    } else {
      deck = deck;
    }

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

function returnResponse(data){
  var r = data.results;

  console.log(r);

  if (r.length > 0) {
    $('#clue-box').toggle(false);
    $('#results-title').toggle(true);
    $('#no-match-hunt-again-row').toggle(false);
    $('#answer-form').toggle(true);
    $("html, body").animate({ scrollTop: 0 }, "slow");
    renderQuestionSelections();
    renderResult(r);
  } else {
    $('#find-box').val("");
    $("html, body").animate({ scrollTop: $(document).height() }, "slow");
    $('#hunt-btn').focus();
  }
}

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

function renderQuestionSelections() {
  let n = STATS.questionNumber - 1;
  let sMax = QSTORE[n].choices.length;
  let e = "";

  for (let i = 1; i <= sMax; i++) {
    // Assign value from STORE to option labels
    e = "lbl-option-" + i;
    $(`#${e}`).html(QSTORE[n].choices[i - 1]);

    // Assign value from STORE to input values
    e = "option-" + i;
    $(`#${e}`).val(QSTORE[n].choices[i - 1]);
  }
}

function clearResults() {
  let queryTerm = "";
  getDataFromComicVineComicsApi(queryTerm);
}

function toggleSearchResults() {
  $('#answer-form').toggle(false);
  $('input[name="radio"]').prop('checked', false);
  $('#results-title').toggle(false);
  $('.js-result-row').toggle(false);
}

function handleOkayClick() {
  let optionSelected = $('input:checked').val();
  console.log('Hero Selected: ', optionSelected);

  let nx = STATS.questionNumber - 1;

  if (optionSelected === QSTORE[nx].answer) {
    // Feedback if correct
    STATS.questionNumber = STATS.questionNumber + 1;
    var n = STATS.questionNumber;

    $('#clue-box').toggle(false);

    toggleSearchResults();
    renderClueDetails(n);
    renderCorrectAnswer("Correct Answer");
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

function handleAnswerFormSubmit() {
  $('#answer-form').on('submit', function(e) {
    e.preventDefault();
    clearResults();
    handleOkayClick();
    handleContinueClick();
  });
}

function handleContinueClick() {
  $('#continue-btn').on('click', function() {
    var n = STATS.questionNumber;

    $("html, body").animate({ scrollTop: 0 }, "slow");

    $('#correct-feedback-box').toggle(false);

    toggleSearchResults();
    renderClueDetails(n);

    $('#clue-box').toggle(true);
  });
}

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


// Start app procedures
function appStart() {
  toggleRules();
  handlePlayClick();
  handleHuntClick();
  keypressEnter();
  handleAnswerFormSubmit();
  handleContinueClick();
}

$(appStart);