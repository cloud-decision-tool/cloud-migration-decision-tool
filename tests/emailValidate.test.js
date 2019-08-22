//import PhoneNumberValidate from '../util/extra/PhoneNumberValidate';
var validations = require('../pages/util/util');

// Valid
// Valid
var customEmail1 = "niceandsimple@example.com";
var customEmail2 = "disposable.style.email.with+symbol@example.com";
var customEmail3 = "other.email-with-dash@example.com";
var customEmail4 = '"much.more unusual"@example.com';
var customEmail5 = '"very.unusual.@.unusual.com"@example.com';
var customEmail12 = '"very.(),:;<>[]\".VERY.\"very@\\ \"very\".unusual"@strange.example.com';
var customEmail6 = '" "@example.org';
var customEmail7 = "üñîçøðé@example.com";
var customEmail8 = "Abc.example.com";

// Invalid
var customEmail9 = "A@b@c@example.com";
var customEmail10 = 'this\ still\"not\\allowed@example.com';
var customEmail11 = "admin@mailserver1";
var customEmail13 = "101028320@student.swin.edu.au";

test('Tests Email: '+customEmail1, () => {
  expect(validations.validateEmail(customEmail1)).toBe(true);
});
test('Tests Email: '+customEmail2, () => {
  expect(validations.validateEmail(customEmail2)).toBe(true);
});
test('Tests Email: '+customEmail3, () => {
  expect(validations.validateEmail(customEmail3)).toBe(true);
});
test('Tests Email: '+customEmail4, () => {
  expect(validations.validateEmail(customEmail4)).toBe(true);
});
test('Tests Email: '+customEmail5, () => {
  expect(validations.validateEmail(customEmail5)).toBe(true);
});
test('Tests Email: '+customEmail6, () => {
  expect(validations.validateEmail(customEmail6)).toBe(true);
});
test('Tests Email: '+customEmail7, () => {
  expect(validations.validateEmail(customEmail7)).toBe(true);
});
test('Tests Email: '+customEmail8, () => {
  expect(validations.validateEmail(customEmail8)).toBe(true);
});
test('Tests Email: '+customEmail9, () => {
  expect(validations.validateEmail(customEmail9)).toBe(true);
});
test('Tests Email: '+customEmail10, () => {
  expect(validations.validateEmail(customEmail10)).toBe(true);
});
test('Tests Email: '+customEmail11, () => {
  expect(validations.validateEmail(customEmail11)).toBe(true);
});
test('Tests Email: '+customEmail12, () => {
  expect(validations.validateEmail(customEmail12)).toBe(true);
});
test('Tests Email: '+customEmail13, () => {
  expect(validations.validateEmail(customEmail13)).toBe(true);
});


//const sum = require('./sum');
// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(4);
// });
