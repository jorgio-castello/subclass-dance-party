$(document).ready(function() {
  window.dancers = [];
  window.colors = ['#08F7FE', '#09FBD3', '#FE53BB', '#FFACFC', '#F148FB', '#7122FA', '#75D5FD', '#B76CFD', '#FDC7D7', 'FF9DE6', '#A5D8F3', '#00FECA', '#FF85EA', '#7B61F8', '#DE38C8', '#3B27BA', '#E847AE', '#13CA91', '#FF9472', '#FFDEF3', '#FDD400', '#FDB232', '#02B8A2', '#FEC763', '#EA55B1', '#A992FA', '#79FFFE', '#FEA0FE', '#CE96FB', '#01FFC3', '#01FFFF', '#FFB3FD', '#9D72FF'];
  window.dancersTypes = ['makeTiltingDancer', 'makeBlinkyDancer', 'makeChangingSizeDancer'];
  window.dancers = [];
  window.danceFloorCoord = {
    top: $('.imageContainer').height(),
    left: 0,
    right: $('body').width(),
    bottom: $('body').height()
  };
  window.timeoutId = 0;

  $('#add-emoji-button').on('click', function(event) {
    var dancerMakerFunctionName = window.dancersTypes[Math.floor(Math.random() * window.dancersTypes.length)];

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position
    var dancer = new dancerMakerFunction(
      ($(".danceFloor").height() - 100) * Math.random(),
      ($(".danceFloor").width() - 100) * Math.random(),
      80
    );

    dancer.$node.attr('id', `${dancerMakerFunctionName}${window.dancers.length}`);
    window.dancers.push(dancer);
    $('.imageContainer').append(dancer.$node);
  });


  $('#disco-ball-png').on('mousedown', function(e) {
    let dancer = new makeTiltingDancer(0, 0, 80);
    dancer.shouldMoveRandom = false;
    $('.imageContainer').append(dancer.$node);
    window.dancers.push(dancer);

    let handleFirstClick = function(e) {
      let dragCoordinates = {};
      dragCoordinates.pageX0 = e.pageX;
      dragCoordinates.pageY0 = e.pageY;
      dragCoordinates.offset0 = dancer.$node.offset();

      let handleDrag = function(e) {
        let left = dragCoordinates.offset0.left + (e.pageX - dragCoordinates.pageX0);
        let top = dragCoordinates.offset0.top + (e.pageY - dragCoordinates.pageY0);
        dancer.top = top - window.danceFloorCoord.bottom + window.danceFloorCoord.top;
        dancer.left = left;
        debugger;
        $(dancer.$node).offset({top: top, left: left});
      };

      let handleSecondClick = function(e) {
        $(dancer.$node).off('mousemove', handleDrag).off('click', handleSecondClick);
        dancer.shouldMoveRandom = true;
        dancer.timeBetweenStep = 80;
      };
      $(dancer.$node).on('mousemove', handleDrag);
      $(dancer.$node).off('click', handleFirstClick);
      $(dancer.$node).on('click', handleSecondClick);
    };
    $(dancer.$node).on('click', handleFirstClick);
  });


  $('#start-surprise-button').on('click', function(event) {
    //Make the buttons disappear
    window.dancers.forEach(dancer => {
      if (dancer instanceof makeBlinkyDancer) {
        dancer.shouldBlink = false;
      }
      dancer.disappear();
    });

    let surpriseDancers = window.dancers.slice();
    surpriseDancers.forEach((dancer, index) => {
      dancer.shouldMoveRandom = false;
      dancer.surprise(index);
    });
  });

  let tiles = Array.from(document.querySelectorAll('.tile'));
  tiles.forEach(tile => {
    setInterval(function() {
      tile.style.backgroundColor = window.colors[Math.floor(Math.random() * window.colors.length)];
    }, 500);
  });
});
