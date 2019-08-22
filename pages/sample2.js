
import React, { Component } from 'react';
import {Row , Col,Modal,Button } from 'antd';
import { sm, isM } from './util/util';
import styles from '../styles/styles';
import Navbar from './components/navbar';

const DemoBox = props => <p style={{height: props.value, background:'red'}} className={`height-${props.value}`}>{props.children}</p>;


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
        <p>Align Center</p>


        </Col>
      </Row>
      </div>
  }

}
