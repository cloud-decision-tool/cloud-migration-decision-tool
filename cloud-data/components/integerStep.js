import * as React from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

export default class IntegerStep extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      inputValue: this.props.inputValue
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
      <Row style={{ marginRight: 14}}>
        <Col span={18}>
          <Slider
            min={this.props.min}
            max={this.props.max}
            marks={this.props.marks}
            onChange={this.onChange}
            defaultValue={12}
            value={typeof inputValue === 'number' ? this.state.inputValue : 0}
          />
        </Col>
        <Col span={5}>
          <InputNumber
            min={this.props.min}
            max={this.props.max}
            style={{ marginLeft: 2, width: 60, fontSize: 12 }}
            value={inputValue}
            onChange={this.onChange}
            defaultValue={12}
            bodyStyle={{ fontSize: 12 }}
          />
        </Col>
      </Row>
    );
  }
}
