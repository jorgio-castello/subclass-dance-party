describe('tiltingDancer', function() {

  var changingSizeDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    tiltingDancer = new makeTiltingDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(tiltingDancer.$node).to.be.an.instanceof(jQuery);
  });

  it('degrees to rotate should change once per step', function() {
    let degrees = tiltingDancer.degrees;
    expect(degrees).to.equal(20);

    clock.tick(timeBetweenSteps);
    degrees = tiltingDancer.degrees;
    expect(degrees).to.not.equal(20);

    clock.tick(timeBetweenSteps);
    let newDegrees = tiltingDancer.degrees;
    expect(newDegrees).to.not.equal(degrees);
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(tiltingDancer, 'step');
      expect(tiltingDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(tiltingDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(tiltingDancer.step.callCount).to.be.equal(2);
    });
  });
});