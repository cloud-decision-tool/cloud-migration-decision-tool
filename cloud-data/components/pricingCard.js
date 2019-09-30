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
      <Card bordered={false} title={platform} style={{ textAlign: "center" }} headStyle={{ fontWeight: 'bold' }}>
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
                <Col span={6}>Small</Col>
                <Col span={4}>{selectedValue.small}</Col>
                <Col span={7}>instances</Col>
                <Col span={5}>${price.small.toLocaleString()}</Col>
              </Row>
              <Row type="flex" justify="center">
                <Col span={6}>Medium</Col>
                <Col span={4}>{selectedValue.medium}</Col>
                <Col span={7}>instances</Col>
                <Col span={5}>${price.medium.toLocaleString()}</Col>
              </Row>
              <Row type="flex" justify="center" style={{ marginBottom: 20 }}>
                <Col span={6}>Large</Col>
                <Col span={4}>{selectedValue.large}</Col>
                <Col span={7}>instances</Col>
                <Col span={5}>${price.large.toLocaleString()}</Col>
              </Row>
              <Row>
                <Col>
                  <Title level={4}>Storage</Title>
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Col span={6}>Capacity</Col>
                <Col span={4}>{selectedValue.disk}</Col>
                <Col span={7}>GB</Col>
                <Col span={5}>${price.disk.toLocaleString()}</Col>
              </Row>
              <Row type="flex" justify="center">
                <Col span={6}>Operation</Col>
                <Col span={4}>{platform === "AWS" ? "N/A" : selectedValue.operation}</Col>
                <Col span={7}>times</Col>
                <Col span={5}>${platform === "AWS" ? "N/A" : price.operation.toLocaleString()}</Col>
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
