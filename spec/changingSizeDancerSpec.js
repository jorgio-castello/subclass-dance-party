describe('changingSizeDancer', function() {

  var changingSizeDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    changingSizeDancer = new makeChangingSizeDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(changingSizeDancer.$node).to.be.an.instanceof(jQuery);
  });

  it('should invoke scale once per step', function() {
    debugger;
    let scale = changingSizeDancer.scale;
    expect(scale).to.equal(1);

    clock.tick(timeBetweenSteps);
    scale = changingSizeDancer.scale;
    expect(scale).to.not.equal(1);

    clock.tick(timeBetweenSteps);
    let newScale = changingSizeDancer.scale;
    expect(newScale).to.not.equal(scale);
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(changingSizeDancer, 'step');
      expect(changingSizeDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(changingSizeDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(changingSizeDancer.step.callCount).to.be.equal(2);
    });
  });
});