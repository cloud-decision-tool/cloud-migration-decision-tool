
import React, { Component } from 'react';
import {Row , Col,Modal,Button } from 'antd';
import { sm, isM } from './util/util';
import styles from '../styles/styles';

const DemoBox = props => <p style={{height: props.value, background:'red'}} className={`height-${props.value}`}>{props.children}</p>;


export default class extends Component{

  constructor(props){
      super(props);

      let { pathname, query } = props.url;
      this.state = { path : pathname, query : query};

  }

  render(){
      return <div>
      <p>Align Center</p>
    <Row type="flex" justify="space-around" align="middle" style={sm([ styles.flexHeight ])}>
      <Col span={4}><DemoBox value={100}>col-4</DemoBox></Col>
      <Col span={4}><DemoBox value={50}>col-4</DemoBox></Col>
      <Col span={4}><DemoBox value={120}>col-4</DemoBox></Col>
      <Col span={4}><DemoBox value={80}>col-4</DemoBox></Col>
    </Row>
      </div>
  }

}
