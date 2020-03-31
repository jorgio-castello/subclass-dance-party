var makeTiltingDancer = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  // this.addStyles(this.$node);
  this.degrees = 20;
};

makeTiltingDancer.prototype = Object.create(makeDancer.prototype);
makeTiltingDancer.prototype.constructor = makeTiltingDancer;
makeTiltingDancer.prototype.step = function() {
  let boundStepFunc = makeDancer.prototype.step.bind(this);
  boundStepFunc(this.timeBetweenSteps);

  //Implement Tilting motion
  this.$node.css({
    transform: `rotate(${this.degrees}deg)`
  });
  this.degrees += 50 * Math.random();
  if (this.shouldMoveRandom) {
    this.moveRandom();
  }
};
