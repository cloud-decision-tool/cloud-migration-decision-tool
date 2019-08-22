/**
 * Created by Ravi on 24/9/17.

  Login Component
  Description : Interacts with Database Operations Firebase login

 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Avatar, Card, Spin, Row, Col, message } from 'antd';

// import Form from 'antd/lib/form';
// import Icon from 'antd/lib/icon';
// import Input from 'antd/lib/input';
// import Button from 'antd/lib/button';
// import Checkbox from 'antd/lib/checkbox';
// import Avatar from 'antd/lib/avatar';
// import Card from 'antd/lib/card';
// import Spin from 'antd/lib/spin';
// import {Row , Col } from 'antd/lib/grid';

const FormItem = Form.Item;
const { Meta } = Card;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
//import db from '../util/db';
import dbops from '../util/dbops';
import Config from '../util/config';
import { b64EncodeUnicode, validateEmail} from '../util/util';
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
          this.setState({user: user});

          this.dbops.log(user.customClaims);
          this.dbops.get_user_type((data)=>{
            console.log(data);
            this.setState({loading: false});

            this.dbops.log(data.usertype);

            switch(data.usertype){
              case "admin": this.dbops.redirect(Config.url_admin);break;
              case "student": this.dbops.redirect(Config.url_student);break;
              case "convenor": this.dbops.redirect(Config.url_admin);break;
              case "supervisor": this.dbops.redirect(Config.url_admin);break;
              default :
            }


          })
        }
        else{
          this.setState({user: null, loading : false });
          // this.dbops.error('Sign In Error');
        }
      }, (err)=>{
        this.setState({loading: false});
        this.dbops.error('Sign In Error');
      })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                //console.log(this.db);
                this.setState({loading: true});
                this.dbops.resetEmail(values.username, (success)=>{
                  this.setState({loading: false});
                  message.success(" Reset Password successful. Check your email");
                }, (error)=>{
                  // this.dbops.log(error);
                  this.setState({loading: false});

                  // this.dbops.error('Sign In Error');
                });
                // this.dbops.log('estttt');
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
        <Form onSubmit={this.handleSubmit} className="login-form">

          <Row type="flex" justify="center" align="top">
            <Col span={6}>
            {!this.state.user &&
            <div>
            <Spin indicator={antIcon} size="large" spinning={this.state.loading}>
            <br /><br />
            <img src="../static/images/logo.svg" className="logo" />
            <br /><br /><br />

            <h4>Enter registered e-mail </h4>
            <FormItem>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' },
                    { validator : (rule, value, callback)=> {
                      //const { getFieldValue } = this.props.form;
                      let email = value;

                      if( (''+email).length > 5 )
                      {
                        if(validateEmail(email))
                          callback();
                        else
                          callback('Enter valid email');
                      }
                      callback('Enter more characters');
                    }}
                  ],
                })(
                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="enter email" />
                )}
            </FormItem>
            <FormItem>
                <Button type="primary" size={'large'} htmlType="submit" span={'col-12'} className="login-form-button w100p">
                    Send reset link
                </Button>
            </FormItem>
            </Spin>
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

            <a href={Config.url_home}>
            <Button type="dashed" icon="home" className={' w100p '}>Home</Button>
            </a>

            </Col>
          </Row>


        </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
