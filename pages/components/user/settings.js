
import React, { Component } from 'react';
import {Row , Col,Modal,Button, Icon, Card, message, Switch, Divider } from 'antd';
import { sm, isM } from '../../util/util';
import styles from '../../../styles/styles';


const DemoBox = props => <p style={{height: props.value, background:'red'}} className={`height-${props.value}`}>{props.children}</p>;


export default class extends Component{

  constructor(props){
      super(props);

      // let { pathname, query } = props.url;
      // this.state = { path : pathname, query : query};

  }

  render(){
      return <div>
      <Row type="flex" justify="space-around" align="top" style={sm([ styles.flexHeight ])}>
        <Col span={22}>

        {/*<h2>Settings</h2>*/}

        <Card title="Profile" bordered={true} style={sm([ styles.marBot20 ])}>
          <h3 style={sm([ styles.marBot10 ])}>Notification Settings</h3>
          <p><Switch defaultChecked onChange={()=>{}} />  Send me notifications </p>
          <Divider />
          <h3 style={sm([ styles.marBot10 ])}>Change Password</h3>
          <Button type="danger" onClick={()=>{
            message.info(" Reset link sent to your email");
          }}>Send Reset Link</Button>
        </Card>

        </Col>
      </Row>
      </div>
  }

}
