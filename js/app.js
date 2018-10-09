'use strict';

function getDataFromApi(searchTerm, callback) {
  let top = "https://comicvine.gamespot.com/api/movies/?api_key=";
  let k = "07ce68f63281224c6c07468a43c3f3947c29060f";
  let l = "&limit=5";
  let f = "&filter=name:";
  let s = `${searchTerm}`;
  let end = "&format=json";
  var search = top + k + l + f + s + end;

  // $.getJSON(search, callback);
}

function handleSubmit() {
  $('#hunt-btn').on('click', function() {
    const queryTerm = $('#find-box').val();

    if (queryTerm == "" || queryTerm == " " || queryTerm == null) {
      return false;
    } else {
      // getDataFromApi(queryTerm, displaySearchData);

      let top = "https://comicvine.gamespot.com/api/movies/?api_key=";
      let k = "07ce68f63281224c6c07468a43c3f3947c29060f";
      let l = "&limit=5";
      let f = "&filter=name:";
      let s = `${queryTerm}`;
      let end = "&format=json";
      var search = top + k + l + f + s + end;

      $.getJSON(search, function(data) {
        var r = data.results;

        renderResult(r);
      });

      // getDataFromApi(queryTerm, renderResult);
    }
  });
}

function renderResult(result) {
  // console.log(result);

  // var img = result.image.original_url;
  // var name = result.name;
  // var date = result.release_date;
  // var studio = result.studios.name;
  // var writer = result.writers.name;

  // console.log(img);
  // console.log(name);
  // console.log(date);
  // console.log(studio);
  // console.log(writer);

  for (let i = 0; i < result.length; i++) {
    var img = result[i].image.original_url;
    // console.log(result[i].image.original_url);

    var name = result[i].name;
    // console.log(result[i].name);

    var date = result[i].release_date;
    // console.log(result[i].release_date);

    $('#js-result').append(
      `
        <div class="returned-result">
          <div class="result-img">
            <a id="img-link" href=${img} target="_blank"><img class="img-link" src=${img} /></a>
          </div>

          <div class="result-info">
            <h4 class="video-title">Movie Title: ${name}</h4>
            <p class="video-description">Movie Release Date: ${date}</p>
            
          </div>
        </div>
      `
    );
  }

}









function toggleRules() {
  $('#find-box-wrap').toggle(false);
  $('#rule-box').fadeIn(3000).delay(500);
  $('#clue-box').toggle(false);
  $('#game-rules').html(STORE.gameRules);
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