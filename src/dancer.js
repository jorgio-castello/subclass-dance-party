// Creates and returns a new dancer object that can step
var makeDancer = function(top, left, timeBetweenSteps) {

  // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"></span>');

  //Preserve timeBetweenSteps on the object
  this.timeBetweenSteps = timeBetweenSteps;

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
