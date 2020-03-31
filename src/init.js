$(document).ready(function() {
  window.dancers = [];
  window.colors = ['#08F7FE', '#09FBD3', '#FE53BB', '#FFACFC', '#F148FB', '#7122FA', '#75D5FD', '#B76CFD', '#FDC7D7', 'FF9DE6', '#A5D8F3', '#00FECA', '#FF85EA', '#7B61F8', '#DE38C8', '#3B27BA', '#E847AE', '#13CA91', '#FF9472', '#FFDEF3', '#FDD400', '#FDB232', '#02B8A2', '#FEC763', '#EA55B1', '#A992FA', '#79FFFE', '#FEA0FE', '#CE96FB', '#01FFC3', '#01FFFF', '#FFB3FD', '#9D72FF'];
  window.dancersTypes = ['makeBlinkyDancer', 'makeTiltingDancer', 'makeChangingSizeDancer'];
  window.dancers = [];

  $('#add-emoji-button').on('click', function(event) {
    debugger;
    var dancerMakerFunctionName = window.dancersTypes[Math.floor(Math.random() * window.dancersTypes.length)];

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position
    var dancer = new dancerMakerFunction(
      $(".danceFloor").height() * Math.random(),
      $(".danceFloor").width() * Math.random(),
      Math.random() * 1000
    );

    dancer.$node.attr('id', `${dancerMakerFunctionName}${window.dancers.length}`);
    window.dancers.push(dancer);
    $('.imageContainer').append(dancer.$node);
  });

  $('#start-surprise-button').on('click', function(event) {
    //Make the buttons disappear
    window.dancers.forEach(dancer => {
      if (dancer instanceof makeBlinkyDancer) {
        dancer.shouldBlink = false;
      }
      dancer.disappear();
    });

    window.dancers.forEach((dancer, index) => {
      dancer.shouldMoveRandom = false;
      dancer.moveMiddle(index);
    });
  });

  let tiles = Array.from(document.querySelectorAll('.tile'));
  tiles.forEach(tile => {
    setInterval(function() {
      tile.style.backgroundColor = window.colors[Math.floor(Math.random() * window.colors.length)];
    }, 500);
  });
});

