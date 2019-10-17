import * as React from "react";
import { Typography, Card, Row, Col } from "antd";

const { Title } = Typography;

export default class PricingCard extends React.Component {
  render() {
    const pricingData = this.props.data;
    const platform = this.props.platform;
    const { windows, linux } = pricingData;
    const { Meta } = Card;
    const cards = {
      Windows: windows,
      Linux: linux
    };

    const round = (value, decimals = 2) => {
      return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    };

    let total = 0;

    return (
      <Card
        bordered={false}
        style={{ textAlign: "center" }}
        bodyStyle={{ padding: 2 }}
        headStyle={{ fontWeight: 'bold'}}
      >
        <Meta
          style={{ marginTop: 10, marginBottom: 10, fontSize: 15, fontWeight: 'bold' }}
          title={
            platform === "AWS" ? <img alt="logo" src="/static/images/aws.png"/> : null ||
            platform === "Azure" ? <img alt="logo" src="/static/images/azure.png"/> : null ||
            platform === "Private" ? <img alt="logo" src="/static/images/private.png"/> : null}
          description={platform === "Private" ? "Private cloud" : "Public cloud"}/>

        {Object.keys(cards).map(key => {
          const data = cards[key];
          const { selectedValue, price } = data;

          if (platform === "Private") {
            total = 100025;
          } else {
            total +=
              price.small +
              price.medium +  
              price.large +
              price.disk +
              price.operation;
          }

          return ( // s m l c o text
            <Card type="inner" title={key} headStyle={{ fontsize:15, fontWeight: 'bold' }} bodyStyle={{ padding: 2}} style={{ marginBottom: 20, fontSize: 13, fontWeight: 'bold' }}>
              <Row>
                <Col>
                  <Title style={{ lineHeight: 4, fontsize: 14, fontWeight:'bold' }}>Compute Engine</Title>
                </Col>
              </Row>

              <Row type="flex" justify="center">
                <Col span={5}>Small</Col>
                <Col span={3}>{selectedValue.small}</Col>
                <Col span={7}>instances</Col>
                <Col span={7}>$ {platform === "Private" ? "N/A" : price.small.toLocaleString()}</Col>
              </Row>
              <Row type="flex" justify="center">
                <Col span={5}>Medium</Col>
                <Col span={3}>{selectedValue.medium}</Col>
                <Col span={7}>instances</Col>
                <Col span={7}>$ {platform === "Private" ? "N/A" : price.medium.toLocaleString()}</Col>
              </Row>
              <Row type="flex" justify="center" style={{ marginBottom: 20 }}>
                <Col span={5}>Large</Col>
                <Col span={3}>{selectedValue.large}</Col>
                <Col span={7}>instances</Col>
                <Col span={7}>$ {platform === "Private" ? "N/A" : price.large.toLocaleString()}</Col>
              </Row>
              <Row>
                <Col>
                  <Title style={{ lineHeight: 4, fontsize: 14, fontWeight: 'bold' }}>Storage</Title>
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Col span={6}>Capacity</Col>
                <Col span={4}>{selectedValue.disk}</Col>
                <Col span={6}>TB</Col>
                <Col span={7}>$ {platform === "Private" ? "N/A" : price.disk.toLocaleString()}</Col>
              </Row>
              <Row type="flex" justify="center">
                <Col span={6}>Operation</Col>
                <Col span={4}>
                  {platform === "AWS" || platform === "Private" ? "N/A" : selectedValue.operation}
                </Col>
                <Col span={6}>times</Col>
                <Col span={7}>
                  ${platform === "AWS" || platform === "Private" ? "N/A" : price.operation.toLocaleString()}
                </Col>
              </Row>
            </Card>
          );
        })}

        <Row type="flex" justify="center" style={{ fontWeight: "bold", fontSize: 14}}>
          <Col span={5}>Total</Col>
          <Col span={14}>AUD {round(total, 2).toLocaleString()}</Col>
        </Row>
      </Card>
    );
  }
}
