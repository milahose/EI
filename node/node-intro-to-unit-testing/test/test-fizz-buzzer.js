// import chai, declare expect variable
const expect = require('chai').expect;

// import fizzBuzzer
const fizzBuzzer = require('../fizzBuzzer');

describe('fizzBuzzer', function() {

  // test the normal case
  it('should return "fizz-buzz" for multiples of 15', function() {
    [15, 30, 45].forEach(num => {
      expect(fizzBuzzer(num)).to.equal('fizz-buzz');
    });
  });

  it('should return "buzz" for multiples of 5', function() {
    [5, 10, 20].forEach(num => {
      expect(fizzBuzzer(num)).to.equal('buzz');
    });
  });

  it('should return "fizz" for multiples 3', function() {
    [3, 6, 9].forEach(num => {
      expect(fizzBuzzer(num)).to.equal('fizz');
    });
  });

  it('should return num if it is not a multiple of 3 or 5', function() {
    [1, 2, 4].forEach(num => {
      expect(fizzBuzzer(num)).to.equal(num);
    });
  });

  it('should raise error if arg is not a number', function() {
    ['3', true, [1, 2, 3], '5'].forEach(el => {
      () => {
        expect(fizzBuzzer(el)).to.throw(`${num} must be a number`);
      }
    });
  });
});