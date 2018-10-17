'use strict';

// Start app with applicable elements shown/hidden
function toggleRules() {
  $('#find-box-wrap').toggle(false);
  $('#rule-box').fadeIn(3000).delay(500);
  $('#clue-box').toggle(false);
  $('#game-rules').html(STORE.gameRules);
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
  
  // Output the result in an element with id="demo"
  $('#subnav-timer').html(hours + "H | " + minutes + "M | " + seconds + "S ");
  
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    $('#rule-box').toggle(false);
    $('#clue-box').toggle(false);
  }

  }, 1000);
}

// Play button click actions
function handlePlayClick() {
  $('#play-btn').on('click', function() {
    countdownTimer();

    $('#rule-box').slideUp(2000);
    $('#clue-box').fadeIn(3000);
    $('#clue-1').html(STORE.clue1);
    $('#hunt-btn').focus();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
}

function getDataFromSearchApi(searchTerm) {
  let s = `${searchTerm}`;
  var search = API.surl() + s;

  let settings = {
    url: `${search}`,
    type: "GET",
    dataType: "jsonp",
  };

  $.ajax(settings);

  // // $.getJSON(search, callback);
  // $.getJSON(search, function(data) {
  //   var r = data.results;
  //   renderResult(r);
  // });

  // function getDataFromApi(searchTerm, callback) {
  //   const qObj = {
  //     url: 'https://comicvine.gamespot.com/api/search/',
  //     query: `${searchTerm}`,
  //     limit: 5,
  //     api_key: 'AIzaSyBCReTi3daKrCxSG-ftR4ed6GRhdlcME9A',
  //     format: 'json',
  //   }
  
  //   $.getJSON(TUBE_SEARCH_URL, qObj, callback);
  // }
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
      return false;
    } else {
      getDataFromSearchApi(queryTerm);
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
    var publisher = result[i].publisher.name;
    var deck = result[i].deck;

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
    renderNoResult();
    // $('#no-match-found').toggle(true);
    $('#incorrect-answer').toggle(false);
  }
}

function renderNoResult() {
  $('#js-result').html(
    `
      <div class="row js-result-row" id="no-match-hunt-again-row">
        <h3 class="rule-title no-match-found" id="no-match-found">No Matches Found!</h3>
        <h3 class="rule-title incorrect-answer" id="incorrect-answer">Incorrect Answer!</h3>
        <h4 class="rule-title hunt-again" id="hunt-again">Hunt Again!</h4>
      </div>
    `
  );
}

function renderQuestionSelections() {
  // let n = STATS.questionNumber;
  let n = STATS.questionNumber - 1;

  let sMax = QSTORE[n].choices.length;
  console.log('sMax: ', sMax);

  let e = "";

  for (let i = 1; i <= sMax; i++) {
    // Assign option labels
    e = "lbl-option-" + i;
    $(`#${e}`).html(QSTORE[n].choices[i - 1]);

    // Assign input values
    e = "option-" + i;
    $(`#${e}`).val(QSTORE[n].choices[i - 1]);
  }
}

function clearResults() {
  let queryTerm = "";
  getDataFromSearchApi(queryTerm);
}

function handleOkayClick() {
  // $('#okay-btn').on('click', function() {
    let optionSelected = $('input:checked').val();
    console.log('Hero Selected: ', optionSelected);

    let n = STATS.questionNumber - 1;

    if (optionSelected === QSTORE[n].answer) {
      // Feedback if correct
      
    } else {
      // Feedback if wrong
      $('#answer-form').toggle(false);
      $('input[name="radio"]').prop('checked', false);
      $('#clue-box').toggle(true);
      $('#hunt-btn').focus();
      $('#find-box').select();
      $('#results-title').toggle(false);

      clearResults();
    }

    console.log('handleOkayClick done');
  // });
}

function handleAnswerFormSubmit() {
  $('#answer-form').on('submit', function(e) {
    e.preventDefault();
    // Answer Form submit
    handleOkayClick();
  });
}


// Start app procedures
function appStart() {
  toggleRules();
  handlePlayClick();
  handleHuntClick();
  keypressEnter();
  // handleOkayClick();
  handleAnswerFormSubmit();
}

$(appStart);