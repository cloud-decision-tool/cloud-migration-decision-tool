import { message } from 'antd';

class PropertyRequiredError extends Error {
  constructor(property) {
    super("No property: " + property);
    this.property = property;
  }
}

export { PropertyRequiredError }

export default class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}
