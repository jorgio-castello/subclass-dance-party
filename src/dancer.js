// Creates and returns a new dancer object that can step
var makeDancer = function(top, left, timeBetweenSteps) {
  this.imgCount = Math.floor(Math.random() * 8);
  // use jQuery to create an HTML <span> tag
  this.$node = $(`<img class = "dancerImage" src="assets/${this.imgCount}.png"/>`);

  //Preserve timeBetweenSteps on the object
  this.timeBetweenSteps = timeBetweenSteps;
  this.top = top;
  this.left = left;
  this.movementHorizontal = 1;
  this.movementVertical = 1;
  this.shouldMoveRandom = true;

  //Pushes eventual step invocation into the browser's queue, it will be run once other functions on the call stack are popped off
  makeDancer.prototype.step.bind(this)(timeBetweenSteps);

  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  this.setPosition(top, left);

};

// the basic dancer doesn't do anything interesting at all on each step,
// it just schedules the next step
makeDancer.prototype.step = function(timeBetweenSteps) {
  //Invoking setTimeout places a function in a browser queue, it does not exist within the call stack
  //In order to invoke the appropriate step method in the it's own context
  //Bind the invoker of makeDancer's step method to it's own step method
  setTimeout(this.step.bind(this), timeBetweenSteps);
};

// Use css top and left properties to position our <span> tag
// where it belongs on the page. See http://api.jquery.com/css/
makeDancer.prototype.setPosition = function(top, left) {
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};

makeDancer.prototype.disappear = function() {
  this.$node.css('display', 'none');
};

makeDancer.prototype.surprise = function(length, index) {
  let startPosition = {
    top: $('.imageContainer').height() / 2 - 45,
    left: 100 + $('body').width() * (index / length)
  };

  this.top = startPosition.top;
  this.left = startPosition.left;

  this.$node.css(startPosition);
  this.$node.css('display', 'inline-block');
};

makeDancer.prototype.moveRandom = function() {
  this.top = this.top + Math.random() * 50 * this.movementVertical;
  this.left = this.left + Math.random() * 50 * this.movementHorizontal;

  let movement = {
    top: this.top,
    left: this.left
  };

  this.$node.css(movement);

  if (this.top + window.danceFloorCoord.top >= window.danceFloorCoord.bottom + 50) {
    this.movementVertical = -1;
  } else {
    if ( this.top < 3) {
      this.movementVertical = 1;
    }
  }

  //If this.left === 0, movement.Horizontal = 1
  if ( this.left <= 100) {
    this.movementHorizontal = 1;
  }
  //If this.left === document.width, movement.horizontal = -1
  if (window.danceFloorCoord.right - this.left <= 100) {
    this.movementHorizontal = -1;
  }

  for (let i = 0; i < window.dancers.length; i++) {
    if (this.top === window.dancers[i].top) {
      continue;
    }
    if (Math.abs(this.top - window.dancers[i].top) < 35) {
      if (Math.abs(this.left - window.dancers[i].left) < 35) {
        this.movementVertical *= -1;
        window.dancers[i].movementVertical *= -1;
        this.movementHorizontal *= -1;
        window.dancers[i].movementHorizontal *= -1;
        makeDancer.prototype.moveRandom.call(this);
      }
    }
  }
};


