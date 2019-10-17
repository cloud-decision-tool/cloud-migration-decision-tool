//import checkPassword from '../util/extra/checkPassword';
var util = require('../pages/util/util');

// Valid
var samplePassword2 = "Susan53";
var samplePassword5 = "a11Blacks";
var samplePassword8 = "sn00pdoggyd0G";

// Invalid
var samplePassword1 = "kitty";
var samplePassword3 = "jelly22fi$h";
var samplePassword4 = "smellycat";
var samplePassword6 = "&ebay.44";
var samplePassword7 = "deltagamm@";
var samplePassword9 = "i7ovemydog!!";
var samplePassword10 = "d0gsaremybestfr13nds";
var samplePassword11 = "Karm@beatsDogm@";
var samplePassword12 = "!usher";

test('Tests password: '+samplePassword1, () => {
  expect(util.checkPassword(samplePassword1)).toBe(false);
});
test('Tests password: '+samplePassword2, () => {
  expect(util.checkPassword(samplePassword2)).toBe(true);
});
test('Tests password: '+samplePassword3, () => {
  expect(util.checkPassword(samplePassword3)).toBe(false);
});
test('Tests password: '+samplePassword4, () => {
  expect(util.checkPassword(samplePassword4)).toBe(false);
});
test('Tests password: '+samplePassword5, () => {
  expect(util.checkPassword(samplePassword5)).toBe(true);
});
test('Tests password: '+samplePassword6, () => {
  expect(util.checkPassword(samplePassword6)).toBe(false);
});
test('Tests password: '+samplePassword7, () => {
  expect(util.checkPassword(samplePassword7)).toBe(false);
});
test('Tests password: '+samplePassword8, () => {
  expect(util.checkPassword(samplePassword8)).toBe(true);
});
test('Tests password: '+samplePassword9, () => {
  expect(util.checkPassword(samplePassword9)).toBe(false);
});
test('Tests password: '+samplePassword10, () => {
  expect(util.checkPassword(samplePassword10)).toBe(false);
});
test('Tests password: '+samplePassword11, () => {
  expect(util.checkPassword(samplePassword11)).toBe(false);
});
test('Tests password: '+samplePassword12, () => {
  expect(util.checkPassword(samplePassword12)).toBe(false);
});


//const sum = require('./sum');
// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(4);
// });
