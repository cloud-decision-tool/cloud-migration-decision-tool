//import checkPassword from '../util/extra/checkPassword';
var util = require('../pages/util/util');

// Valid
var samplePassword1 = "kitty";


// Invalid
var samplePassword9 = "i7ovemydog!!";

test('Tests phone number: '+samplePassword1, () => {
  expect(util.checkPassword(samplePassword1)).toBe(true);
});
