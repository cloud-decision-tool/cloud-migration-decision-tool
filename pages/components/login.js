/**
 * Created by Ravi on 24/9/17.

  Login Component
  Description : Interacts with Database Operations Firebase login

 */
import React from 'react';
//import { Form, Icon, Input, Button, Checkbox, Avatar } from 'antd';

import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Avatar from 'antd/lib/avatar';
import Card from 'antd/lib/card';
import Spin from 'antd/lib/spin';
import {Row , Col } from 'antd/lib/grid';

const FormItem = Form.Item;
const { Meta } = Card;
import style_form from 'antd/lib/form/style/index.css';
import style_input from 'antd/lib/input/style/index.css';
import style_button from 'antd/lib/button/style/index.css';
import style_checkbox from 'antd/lib/checkbox/style/index.css';
import style_avatar from 'antd/lib/avatar/style/index.css';
import style_card from 'antd/lib/card/style/index.css';
import style_spin from 'antd/lib/spin/style/index.css';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
//import db from '../util/db';
import dbops from '../util/dbops';
import Config from '../util/config';
import { b64EncodeUnicode } from '../util/util';
import styles from '../../styles/styles';
// import { log, redirect, getCurrentUser, userEvents, signIn, signOut } from '../util/dbops'
// import fbops from '../firebaseOps';

class NormalLoginForm extends React.Component {

    state = {
      loading: false
    }

    constructor(){
        super();
        //this.db = db;
        this.dbops = new dbops();
    }

    componentDidMount(){
      // debugger;
      // console.log(getCurrentUser(this.db));
      this.setState({loading: true})
      this.dbops.listen_user_events( (user)=>{
        if(user){

          if(this.props.onLogin)
            {
              this.props.onLogin();
              return;
            }

          this.setState({user: user});

          this.dbops.log(user.customClaims);
          this.dbops.get_user_type((data)=>{
            console.log(data);
            this.setState({loading: false});

            this.dbops.log(data.usertype);
            this.dbops.redirect(data.usertype ? data.usertype : '/user');

          })
        }
        else{
          this.setState({user: null, loading : false });
          // this.dbops.error('Sign In Error');
        }
      }, (err)=>{
        this.setState({loading: false});
        this.dbops.error('Sign In Error');
      }, true)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                //console.log(this.db);

                this.dbops.sign_in(values.username, values.password, (success)=>{
                }, (error)=>{
                  // this.dbops.log(error);
                  this.setState({loading: false});
                  this.dbops.error('Sign In Error');
                })

                // this.dbops.log('estttt');
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
        <Form onSubmit={this.handleSubmit} className="login-form">

            <style dangerouslySetInnerHTML={{ __html: style_form }} />
            <style dangerouslySetInnerHTML={{ __html: style_input }} />
            <style dangerouslySetInnerHTML={{ __html: style_button }} />
            <style dangerouslySetInnerHTML={{ __html: style_checkbox }} />
            <style dangerouslySetInnerHTML={{ __html: style_avatar }} />
            <style dangerouslySetInnerHTML={{ __html: style_card }} />
            <style dangerouslySetInnerHTML={{ __html: style_spin }} />

          <Row type="flex" justify="center" >
            <Col span={18}>
            {!this.state.user &&
            <div>
            <Spin indicator={antIcon} size="large" spinning={this.state.loading}>
            <br /><br />
            <img src="../static/images/logo.svg" style={{ width :80}} />
            <br /><br /><br />

            <FormItem>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="enter email" />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                )}
            </FormItem>
            <FormItem>
                <Button type="primary" size={'large'} htmlType="submit" span={'col-12'} className="login-form-button w100p">
                    Log in
                </Button>
            </FormItem>

            </Spin>

            <a href={Config.url_forgot}>
            <Button type="dashed" icon="home" className={' w100p '}>Reset Password</Button>
            </a>
              </div>
            }

            {this.state.user &&
              <div className="example">
                <Spin spinning />
              </div>
            }
            {this.state.user && false &&
              <div >
                <br/><br/>
                <Card
                  style={{ width: 300 }}
                  cover={<img alt="example" src="https://picsum.photos/200/150/?random" />}
                  actions={[<Icon type="logout" onClick={()=>{
                    this.setState({loading: true})
                    this.dbops.sign_out( ()=>{this.setState({loading: false})} ,()=>{this.setState({loading: false})} );
                  }} />]}
                >
                  <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="ADMIN"
                    description={"Logged In As"+(this.dbops.get_current_user())}
                  />
                </Card>

              </div>
            }
            </Col>
          </Row>


        </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
