var makeBlinkyDancer = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.shouldBlink = true;
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
};

//Delegate makeBlinkyDancer prototype chain to makeDancer.prototype
makeBlinkyDancer.prototype = Object.create(makeDancer.prototype);
//Re-assign makeBlinkyDance constructor to makeBlinkyDancer
makeBlinkyDancer.prototype.constructor = makeBlinkyDancer;

//Mask makeBlinkyDancer step property
makeBlinkyDancer.prototype.step = function() {
  //Bind make dancer's step method so that it is invoked within the context of makeBlinkyDancer
  let boundStepFunc = makeDancer.prototype.step.bind(this);
  boundStepFunc(this.timeBetweenSteps);
  // call the old version of step at the beginning of any call to this new version of step
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  if (this.shouldBlink) {
    this.$node.toggle();
  }
  if (this.shouldMoveRandom) {
    this.moveRandom();
  }
};