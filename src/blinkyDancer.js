var makeBlinkyDancer = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
};

//Delegate makeBlinkyDancer prototype chain to makeDancer.prototype
makeBlinkyDancer.prototype = Object.create(makeDancer.prototype);
//Re-assign makeBlinkyDance constructor to makeBlinkyDancer
makeBlinkyDancer.prototype.constructor = makeBlinkyDancer;

makeBlinkyDancer.prototype.oldStep = function() {
  makeDancer.prototype.step.bind(this)(this.timeBetweenSteps);
};

//Mask makeBlinkyDancer step property
makeBlinkyDancer.prototype.step = function() {
  this.oldStep();
  // call the old version of step at the beginning of any call to this new version of step
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  this.$node.toggle();
};