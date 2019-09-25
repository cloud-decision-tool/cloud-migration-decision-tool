import * as React from "react";
import PricingCard from "./pricingCard";
import { Row, Col } from "antd";

class PricingReview extends React.Component {
  render() {
    const pricingData = this.props.data;
    const awsPricingData = this.props.awsData;

    return (
      <div style={{ background: "#ECECEC", padding: "15px" }}>
        <Row>
          <Col span={12}>
            <PricingCard data={pricingData} platform="Azure" key="Azure" />
          </Col>
          <Col span={12}>
            <PricingCard data={awsPricingData} platform="AWS" key="AWS" />
          </Col>
        </Row>
      </div>
    );
  }
}

export default PricingReview;
