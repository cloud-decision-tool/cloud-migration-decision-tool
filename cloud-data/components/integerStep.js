import * as React from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

export default class IntegerStep extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      inputValue: 0
    };
  }

  onChange = value => {
    this.setState({
      inputValue: value
    });
    this.props.selectedValue(value);
  };

  render() {
    const { inputValue } = this.state;

    return (
      <Row>
        <Col span={18}>
          <Slider
            min={this.props.min}
            max={this.props.max}
            marks={this.props.marks}
            onChange={this.onChange}
            value={typeof inputValue === 'number' ? this.state.inputValue : 0}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={this.props.min}
            max={this.props.max}
            style={{ marginLeft: 24 }}
            value={inputValue}
            onChange={this.onChange}
          />
        </Col>
      </Row>
    );
  }
}
