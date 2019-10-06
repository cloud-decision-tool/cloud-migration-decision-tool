import * as React from "react";
import PricingCard from "./pricingCard";
import { Row, Col } from "antd";

class PricingReview extends React.Component {
  render() {
    const pricingData = this.props.data;
    const awsPricingData = this.props.awsData;
    const privateCloudData = this.props.privateCloudData;

    return (
      <div style={{ background: "#ECECEC", padding: "5px" }}>
        <Row>
          <Col span={8}>
            <PricingCard data={awsPricingData} platform="AWS" key="AWS" />
          </Col>
          <Col span={8}>
            <PricingCard data={pricingData} platform="Azure" key="Azure" />
          </Col>
          <Col span={8}>
            <PricingCard data={privateCloudData} platform="Private" key="Private" />
          </Col>
        </Row>
      </div>
    );
  }
}

export default PricingReview;
