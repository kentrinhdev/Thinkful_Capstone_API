'use strict';

function getDataFromApi(searchTerm) {
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

function returnResponse(data){
  var r = data.results;

  console.log(r);

  if (r.length > 0) {
    $('#clue-box').toggle(false);
    $('#results-title').toggle(true);
    $("html, body").animate({ scrollTop: 0 }, "slow");
    renderResult(r);
  } else {
    renderNoResult();
  }
}

function renderResult(result) {
  for (let i = 0; i < result.length; i++) {
    var img = result[i].image.original_url;
    var name = result[i].name;
    var realName = result[i].real_name;
    var publisher = result[i].publisher.name;
    var deck = result[i].deck;

    // var desc = result[i].description;
    // <div class="movie-desc">Story: ${desc}</div>

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
              <h4 class="movie-title">Hero or Villain Name: ${name}</h4>
              <h5 class="movie-title">Real Name: ${realName}</h5>
              <p class="movie-date">Publisher: ${publisher}</p>
              <p class="movie-deck">Summary: ${deck}</p>
            </div>
          </div>
        </div>
      `
    );
  }
}

function renderNoResult() {
  $('#js-result').html(
    `
      <div class="row js-result-row">
        <h3 class="rule-title">No Matches Found!</h3>
        <h4 class="rule-title">Hunt Again!</h4>
      </div>
    `
  );
}

function handleSubmit() {
  $('#hunt-btn').on('click', function() {
    const queryTerm = $('#find-box').val();

    if (queryTerm == "" || queryTerm == " " || queryTerm == null) {
      return false;
    } else {
      getDataFromApi(queryTerm);
    }
  });
}








function toggleRules() {
  $('#find-box-wrap').toggle(false);
  $('#rule-box').fadeIn(3000).delay(500);
  $('#clue-box').toggle(false);
  $('#game-rules').html(STORE.gameRules);
  $('#results-title').toggle(false);
}

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

function handleHuntClick() {
  $('#hunt-btn').on('click', function() {
    $('#find-box-wrap').animate(
      { width: 'toggle' }
    );

    $('#find-box').focus();


  });

  $('#hunt-btn').focus();
}

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


function appStart() {
  toggleRules();
  handlePlayClick();
  handleHuntClick();
  keypressEnter();
  handleSubmit();
}

$(appStart);