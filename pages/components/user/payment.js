
import React, { Component } from 'react';
import {Row , Col,Modal,Button, Icon, List, Card, message,Spin, InputNumber, Switch, Divider, Form, Input, Checkbox } from 'antd';
import { sm, isM } from '../../util/util';
import styles from '../../../styles/styles';

import dbops from '../../util/dbops';
import Cards from 'react-credit-cards';
const FormItem = Form.Item;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

// import 'react-credit-cards/es/styles-compiled.css';

const DemoBox = props => <p style={{height: props.value, background:'red'}} className={`height-${props.value}`}>{props.children}</p>;


class Payment extends Component{

  constructor(props){
      super(props);

      this.dbops = new dbops();
      // let { pathname, query } = props.url;
      this.state = {
        cards : [],
        addPaymentMethod : false,
        cardno : '',
        cardname : '',
        cardexpno : '',
        cardcvv : ''
      };

  }

  retrieveFire = () => {

    this.setState({ loading: true})
         // queryFS = (collection, params, limit, lastKey, orderByKey , callback, error) =>
     //this.dbops.queryFS( "users", [], 5, 's0lKdyWgBq7Xp7QRkEoL', 'name',
     var d = new Date();
     console.log(" userid ",this.dbops.get_current_user());
     d.setHours(d.getHours()-3);
     this.dbops.queryFS( "userPayment",
     [
       {
       key : "userid",
       comp : "==",
       // val : "A3Vv4qBTBmUTp74bVVxR6ztde232" //ashinga48
       val : this.dbops.get_current_user()
       }

       // ,
       // {
       //   key : "status",
       //   comp : "==",
       //   val : false,
       // },
       // {
       //   key : 'time',
       //   comp : ">",
       //   val : d
       // }
     ]
     , 25, this.state.lastKey ? this.state.lastKey : null, 'time',
     (r)=>{
       this.setState({ loading: false})
        let temp = [];

          console.log(r);
        r.forEach((doc)=>{
          let oj = doc.data();
          oj.key = doc.id;
          temp.push(oj)
            console.log(oj)
        })

        if(temp.length)
        this.setState({ lastKey : temp[temp.length-1].key, cards: temp});
        else
        this.setState({ cards : []});
        // console.log(" last key ",this.state.lastKey);
     }, (e)=>{
       this.setState({ loading: false})
       console.log(e)
     })
  }

  deleteCard = (key) => {
    this.setState({ loading: true });
    this.dbops.remove_data_fire_promise('userPayment', key)
    .then((response)=>{
      this.dbops.success('Removed', 'your card has been removed');
      this.setState({ loading: false });
      this.retrieveFire();
    })
    .catch((response)=>{
      this.setState({ loading: false });
      this.dbops.error('Error', 'Error while removing your card')
    });
  }

  saveCard = () => {
    this.setState({ loading: true });
    this.dbops.save_data_fire_push_promise('userPayment', {
      userid : this.dbops.get_current_user(),
      cardno : this.state.cardno,
      cardname : this.state.cardname,
      cardexp : this.state.cardexpno
    })
    .then((response)=>{
      this.dbops.success('Saved', 'your card has been added');
      this.setState({ addPaymentMethod: false, loading: false });
      // this.setState({  });
      this.retrieveFire();
    })
    .catch((response)=>{
      this.setState({ loading: false });
      this.dbops.error('Error', 'Error while saving your card')
    });
  }

  handleSubmit = (e) => {
   e.preventDefault();
   this.props.form.validateFields((err, values) => {
     if (!err) {
       console.log('Received values of form: ', values);
       this.saveCard();
     }
   });
 }


 componentDidMount(){
   this.dbops.listen_user_events( (user)=>{
     if(user){

       this.retrieveFire();
     }
   }, (err)=>{
   }, true)
 }


  render(){

    const { getFieldDecorator } = this.props.form;

    let {addPaymentMethod} = this.state;
      return <div>
      <Row type="flex" justify="space-around" align="top" style={sm([ styles.flexHeight ])}>
        <Col span={23}>

        {/*<h2>Settings</h2>*/}

        {addPaymentMethod &&
          <Card title="Add Card"
          bordered={true}
          hoverable={false}
          // extra={<Button type="primary" onClick={()=>{
          //   // message.info(" Reset link sent to your email");
          // }}>Add Payment Method</Button>}

          style={sm([ styles.marBot20 ])}>
          <Card.Grid
          bordered={false}
          hoverable={false} style={{
            width: '50%',
          }}>
          <Cards
             number={this.state.cardno}
             name={this.state.cardname}
             expiry={this.state.cardexpno}
             cvc={this.state.cardcvv}
             focused={true}
           />
          </Card.Grid>
          <Card.Grid
          bordered={false}
          hoverable={false}  style={{
            width: '50%',
          }}>

          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('cardno', {
                rules: [{ required: true, message: 'Card Number: (4242 42XX XXXX XXXX)' }],
              })(
                <Input min={12} max={15} onChange={(e)=>{
                  console.log("e ",e.target.value);
                  this.setState({ cardno : e.target.value})
                }} prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Card Number: (4242 42XX XXXX XXXX)" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('cardname', {
                rules: [{ required: true, message: 'Please input your card name!' }],
              })(
                <Input onChange={(e)=>{
                  console.log("e ",e.target.value);
                  this.setState({ cardname : e.target.value})
                }} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Enter your card name!" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('cardexpno', {
                rules: [{ required: true, message: 'Month/Year' }],
              })(
                <Input onChange={(e)=>{
                  console.log("e ",e.target.value);
                  this.setState({ cardexpno : e.target.value})
                }} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Month/Year" />
              )}
            </FormItem>
            {/*<FormItem>
              {getFieldDecorator('cardcvv', {
                rules: [{ required: true, message: 'CVv' }],
              })(
                <Input onChange={(e)=>{
                  console.log("e ",e.target.value);
                  this.setState({ cardcvv : e.target.value})
                }} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="CVV" />
              )}
            </FormItem>*/}
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Set as default Card</Checkbox>
              )}
              <br/>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Save Card
              </Button>
            </FormItem>
          </Form>

          </Card.Grid>

          </Card>
        }

        <Card title="Payments"
        bordered={true}
        extra={<span>
          {!addPaymentMethod &&
            <Button type="primary" onClick={()=>this.setState({addPaymentMethod : true})}>Add Payment Method</Button>
          }
          </span>
        }
        style={{ width: '100%' }}>
          <Spin indicator={antIcon} spinning={this.state.loading}>
          {this.state.cards.length > 0 &&
            <List
              bordered
              dataSource={this.state.cards}
              renderItem={item => (
                <List.Item actions={[<a onClick={()=>{
                  this.deleteCard(item.key);
                }}>delete</a>]}>
                    <List.Item.Meta
                      title={<span>{item.cardno}</span>}
                      description={item.cardname}
                    />

                </List.Item>
              )}
            />
          }
          </Spin>
        </Card>


        </Col>
      </Row>
      </div>
  }

}

const WrappedNormalLoginForm = Form.create()(Payment);
export default WrappedNormalLoginForm;
