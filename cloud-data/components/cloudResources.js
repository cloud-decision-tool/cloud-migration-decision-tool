import * as React from "react";
import IntegerStep from "./integerStep";
import { Typography, Row, Col } from "antd";

const { Title } = Typography;
const engineMarks = {
  5: "5",
  10: "10",
  20: "20",
  30: "30"
};
const storageMarks = {
  5: "5",
  10: "10",
  20: "20",
  30: "30"
};
const operationMarks = {
  20: "20",
  40: "40",
  60: "60",
  80: "80",
  100: "100"
};
const computeEngineMin = 0;
const computeEngineMax = 30;
const diskMin = 0;
const diskMax = 30;
const operationMin = 0;
const operationMax = 100;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const computeEngineTiers = ["small", "medium", "large"];

export default class CloudResources extends React.Component {
  state = {
    inputValue: 0
  };

  onStorageInputChange = data => {
    this.setState({
      inputValue: data.value
    });
    this.props.onStorageSelected(data);
  };

  onComputeInputChange = data => {
    this.setState({
      inputValue: data.value
    });
    this.props.onComputeSelected(data);
  };

  render() {
    const { os } = this.props;
    const computeEngine = computeEngineTiers.map(tier => (
      <Row type="flex" justify="center" key={tier} id={tier}>
        <Col span={4}> {capitalizeFirstLetter(tier)}</Col>
        <Col span={14}>
          <IntegerStep
            min={computeEngineMin}
            max={computeEngineMax}
            marks={engineMarks}
            selectedValue={value =>
              this.onComputeInputChange({ size: tier, value, os })
            }
          />
        </Col>
        <Col span={5}>instance(s)</Col>
      </Row>
    ));

    return (
      <div className="App" style={{ fontSize: 12, marginTop: 20 }}>
        <Title level={4} style={{ marginBottom: 20, textAlign: "center" }}>
          Compute Engines
        </Title>
        {computeEngine}
        <br />
        <Title level={4} style={{ marginBottom: 20, textAlign: "center" }}>
          Storage
        </Title>
        <Row type="flex" justify="center">
          <Col span={4}>Capacity</Col>
          <Col span={16}>
            <IntegerStep
              min={diskMin}
              max={diskMax}
              marks={storageMarks}
              selectedValue={value =>
                this.onStorageInputChange({ type: "disk", value, os })
              }
            />
          </Col>
          <Col span={4}>TB</Col>
        </Row>
        <Row type="flex" justify="center" style={{ marginBottom: 40 }}>
          <Col span={4}>Operation</Col>
          <Col span={16}>
            <IntegerStep
              min={operationMin}
              max={operationMax}
              marks={operationMarks}
              selectedValue={value =>
                this.onStorageInputChange({ type: "operation", value, os })
              }
            />
          </Col>
          <Col span={4}>time(s)</Col>
        </Row>
      </div>
    );
  }
}
