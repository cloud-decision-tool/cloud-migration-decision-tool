//import checkPassword from '../util/extra/checkPassword';
var util = require('../pages/util/util');

// Valid
var samplePassword1 = "kitty";
var samplePassword2 = "Susan53";
var samplePassword3 = "jelly22fi$h";
var samplePassword4 = "smellycat";
var samplePassword5 = "a11Blacks";
var samplePassword12 = "!usher";
var samplePassword6 = "&ebay.44";
var samplePassword7 = "deltagamm@";
var samplePassword8 = "sn00pdoggyd0G";


// Invalid
var samplePassword9 = "i7ovemydog!!";
var samplePassword10 = "d0gsaremybestfr13nds";
var samplePassword11 = "Karm@beatsDogm@";

test('Tests phone number: '+samplePassword1, () => {
  expect(util.checkPassword(samplePassword1)).toBe(true);
});
test('Tests phone number: '+samplePassword2, () => {
  expect(util.checkPassword(samplePassword2)).toBe(true);
});
test('Tests phone number: '+samplePassword3, () => {
  expect(util.checkPassword(samplePassword3)).toBe(true);
});
test('Tests phone number: '+samplePassword4, () => {
  expect(util.checkPassword(samplePassword4)).toBe(true);
});
test('Tests phone number: '+samplePassword5, () => {
  expect(util.checkPassword(samplePassword5)).toBe(true);
});
test('Tests phone number: '+samplePassword6, () => {
  expect(util.checkPassword(samplePassword6)).toBe(true);
});
test('Tests phone number: '+samplePassword7, () => {
  expect(util.checkPassword(samplePassword7)).toBe(true);
});
test('Tests phone number: '+samplePassword8, () => {
  expect(util.checkPassword(samplePassword8)).toBe(true);
});
test('Tests phone number: '+samplePassword9, () => {
  expect(util.checkPassword(samplePassword9)).toBe(true);
});
test('Tests phone number: '+samplePassword10, () => {
  expect(util.checkPassword(samplePassword10)).toBe(true);
});
test('Tests phone number: '+samplePassword11, () => {
  expect(util.checkPassword(samplePassword11)).toBe(true);
});
test('Tests phone number: '+samplePassword12, () => {
  expect(util.checkPassword(samplePassword12)).toBe(true);
});


//const sum = require('./sum');
// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(4);
// });
