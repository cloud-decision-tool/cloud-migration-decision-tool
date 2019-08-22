
import React, { Component } from 'react';
import {Row , Col,Modal,Button, Collapse } from 'antd';
import { sm, isM } from './util/util';
import styles from '../styles/styles';
import Navbar from './components/navbar';

const Panel = Collapse.Panel;
const DemoBox = props => <p style={{height: props.value, background:'red'}} className={`height-${props.value}`}>{props.children}</p>;
const customPanelStyle = {
  background: '#fbfbfb',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};

export default class extends Component{

  constructor(props){
      super(props);

      let { pathname, query } = props.url;
      this.state = { path : pathname, query : query};

  }

  render(){
      return <div>
      <Navbar />
      <Row type="flex" justify="space-around" align="top" style={sm([ styles.flexHeight ])}>
        <Col span={18}>
        <p style={sm([ styles.textBold, styles.textCenter, styles.marTop40, styles.fs25  ])}>Contact Us</p>
        <p style={sm([ styles.textCenter ])}>See the following common issues users face. </p>


        <Collapse bordered={false} defaultActiveKey={['1']}>
          <Panel header="How to Use this tool" key="1" style={customPanelStyle}>
            Watch this tutorial <a href="https://www.youtube.com/watch?v=uL3h5xns6DM" target="_blank" >YouTube Video</a>
          </Panel>
          <Panel header="I want to cancel my subscription" key="2" style={customPanelStyle}>
            Please mail us at contact@cdtswin.com.au, we will surely get things done.
          </Panel>
          <Panel header="I have a problem with the tool" key="3" style={customPanelStyle}>
            Please send us a screenshot we shall look into it and fix.
          </Panel>
        </Collapse>

        </Col>
      </Row>
      </div>
  }

}
