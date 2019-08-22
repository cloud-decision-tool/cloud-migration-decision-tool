import Head from 'next/head';
import Link from 'next/link';
import React, { Component } from 'react';
import {Row , Col, Steps, Icon, Button, Form, Input, Spin, message } from 'antd';

const Step = Steps.Step;
const FormItem = Form.Item;

import dbops from './util/dbops';
import Config from './util/config';
import { validateEmail, checkPassword } from './util/util';
/**
 * Setup Class.

  Description : To set a user as admin

 */

class Setup extends Component{

  state = {
    justRegistered : false,
    loading : true
  }

  constructor(){
    super();
    this.dbops = new dbops();
  }

  componentDidMount(){
    // debugger;
    // console.log(getCurrentUser(this.db));
    this.setState({loading: true})
    this.dbops.listen_user_events( (user)=>{
      this.setState({loading: false})
      if(user){
        if(this.state.justRegistered)
          {
            this.dbops.sign_out(()=>{
              this.dbops.redirect(Config.url_home);
            });
          }
        else
          this.dbops.redirect(Config.url_home);
      }


    })
  }

  handleSubmit = (e) => {
   e.preventDefault();
   this.props.form.validateFields((err, values) => {
     if (!err) {
       // console.log('Received values of form: ', values);

       if(values.password){
         if(checkPassword(values.password))
         {
           this.completeRegistration('admin@gmail.com', values.password);
         }
         else
          message.error(' Please enter a valid password');
       }else {
        message.error(' Please enter password');
       }

     }
   });
 }

 completeRegistration = (username, pwd) => {
   this.setState({ justRegistered : true });
   this.dbops.create_user(username, pwd, (user)=>{
   }, (error)=>{
     message.error("Admin creation failed ");
   })
 }

  render(){
    const { getFieldDecorator } = this.props.form;

    return <div className="header">
      <Head>
        <title>TCABS SUPER ADMIN</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      </Head>


      <Row type="flex" justify="center" align="middle" className={'marTop30'}>

      <Col sm={24} md={16} lg={8} gutter={{ xs: 8, sm: 16, md: 24}}>


        <Steps>
          <Step status="process" title="Credentials" />
          <Step status="process" title="Complete" />
        </Steps>


        <div className={'marTop30'}> </div>

        <Row type="flex" justify="center" align="middle" className={'marTop30'}>
        {/* get password for admin and continue registration */}

        <Spin spinning={false}>
        <Form onSubmit={this.handleSubmit} className="admin-form">
          <h2>Username</h2>
          <h3 className={'color1'}>admin@gmail.com</h3>
          <span >this is your default username</span>
          <p className={'marBot30'}></p>
          <FormItem
            help={'at least 6 characters, at least 1 number, one lowercase and one uppercase letter'}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}

          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Setup Admin
            </Button>
          </FormItem>


        </Form>
        </Spin>
        </Row>


      </Col>
      </Row>

    </div>

  }
}

const AdminSetup = Form.create()(Setup);
export default AdminSetup;
