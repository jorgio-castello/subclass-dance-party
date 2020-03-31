var makeChangingSizeDancer = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.scale = 1;
  this.scaleUp = true;
};

makeChangingSizeDancer.prototype = Object.create(makeDancer.prototype);
makeChangingSizeDancer.prototype.constructor = makeChangingSizeDancer;
makeChangingSizeDancer.prototype.step = function() {
  let boundStepFunc = makeDancer.prototype.step.bind(this);
  boundStepFunc(this.timeBetweenSteps);

  if (this.scaleUp) {
    this.scale += Math.random();
    this.scale = Math.min(this.scale, 1.5);
    this.scaleUp = false;
  } else {
    this.scale -= Math.random();
    this.scale = Math.max(this.scale, .8);
    this.scaleUp = true;
  }
  this.$node.css('transform', `scale(${this.scale})`);
  if (this.shouldMoveRandom) {
    this.moveRandom();
  }
};