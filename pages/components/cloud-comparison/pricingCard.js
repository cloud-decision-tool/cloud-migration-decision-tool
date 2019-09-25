import * as React from "react";
import { Typography, Card, Row, Col } from "antd";

const { Title } = Typography;

export default class PricingCard extends React.Component {
  render() {
    const pricingData = this.props.data;
    const platform = this.props.platform;
    const { windows, linux } = pricingData;

    const cards = {
      Windows: windows,
      Linux: linux
    };

    const round = (value, decimals = 2) => {
      return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    };

    let total = 0;

    return (
      <Card bordered={false} title={platform}>
        {Object.keys(cards).map(key => {
          const data = cards[key];
          const { selectedValue, price } = data;

          total +=
            price.small +
            price.medium +
            price.large +
            price.disk +
            price.operation;

          return (
            <Card type="inner" title={key} style={{ marginBottom: 20 }}>
              <Row>
                <Col>
                  <Title level={4}>Compute Engine</Title>
                </Col>
              </Row>

              <Row type="flex" justify="center">
                <Col span={5}>Small</Col>
                <Col span={3}>{selectedValue.small}</Col>
                <Col span={6}>instances</Col>
                <Col span={4}>${price.small.toLocaleString()}</Col>
              </Row>
              <Row type="flex" justify="center">
                <Col span={5}>Medium</Col>
                <Col span={3}>{selectedValue.medium}</Col>
                <Col span={6}>instances</Col>
                <Col span={4}>${price.medium.toLocaleString()}</Col>
              </Row>
              <Row type="flex" justify="center" style={{ marginBottom: 20 }}>
                <Col span={5}>Large</Col>
                <Col span={3}>{selectedValue.large}</Col>
                <Col span={6}>instances</Col>
                <Col span={4}>${price.large.toLocaleString()}</Col>
              </Row>
              <Row>
                <Col>
                  <Title level={4}>Storage</Title>
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Col span={5}>Capacity</Col>
                <Col span={3}>{selectedValue.disk}</Col>
                <Col span={6}>GB</Col>
                <Col span={4}>${price.disk.toLocaleString()}</Col>
              </Row>
              <Row type="flex" justify="center">
                <Col span={5}>Operations</Col>
                <Col span={3}>{selectedValue.operation}</Col>
                <Col span={6}>times</Col>
                <Col span={4}>${price.operation.toLocaleString()}</Col>
              </Row>
            </Card>
          );
        })}

        <Row type="flex" justify="center">
          <Col span={3}>
            <Title level={4}>Total</Title>
          </Col>
          <Col span={10}>
            <Title level={4}>AUD {round(total, 2).toLocaleString()}</Title>
          </Col>
        </Row>
      </Card>
    );
  }
}
