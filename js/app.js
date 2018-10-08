'use strict';

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
      document.getElementById("demo").innerHTML = "EXPIRED";
    }

  }, 1000);
}

function toggleRules() {
  $('#find-box-wrap').toggle(false);
  $('#rule-box').fadeIn(3000).delay(500);
  $('#clue-box').toggle(false);
  $('#game-rules').html(STORE.gameRules);
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
}

$(appStart);