'use strict';

function toggleRules() {
  $('#rule-box').toggle(true);
  $('#clue-box').toggle(false);

  $('#game-rules').html(STORE.gameRules);
}

function handlePlayClick() {
  $('#play-btn').on('click', function() {
    $('#rule-box').toggle(false);
    $('#clue-box').toggle(true);

    $('#clue-1').html(STORE.clue1);
  });
}


function appStart() {
  toggleRules();
  handlePlayClick();
}

$(appStart);