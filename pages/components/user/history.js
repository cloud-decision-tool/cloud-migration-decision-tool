
import React, { Component } from 'react';
import {Row , Col,Modal,Button, Progress, Icon, Badge, List, Card, message,Spin, InputNumber, Switch, Divider, Form, Input, Checkbox } from 'antd';
import { sm, isM } from '../../util/util';
import styles from '../../../styles/styles';

import moment from 'moment';

import dbops from '../../util/dbops';
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
     d.setHours(d.getHours()-3);
     this.dbops.queryFS( "userCases",
     [
       // {
       // key : "userid",
       // comp : "==",
       // // val : "A3Vv4qBTBmUTp74bVVxR6ztde232" //ashinga48
       // val : this.dbops.get_current_user()
       // }

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

          // console.log(r);
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
    this.dbops.remove_data_fire_promise('userCases', key)
    .then((response)=>{
      this.dbops.success('Removed', 'Case has been removed');
      this.setState({ loading: false });
      this.retrieveFire();
    })
    .catch((response)=>{
      this.setState({ loading: false });
      this.dbops.error('Error', 'Error while removing Case')
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

        <Card title="History"
        bordered={false}
        extra={<span>
          {/*{!addPaymentMethod &&
            <Button type="primary" onClick={()=>this.setState({addPaymentMethod : true})}>Add Payment Method</Button>
          }*/}
          </span>
        }
        style={{ width: '100%' }}>
          <Spin indicator={antIcon} spinning={this.state.loading}>
          {this.state.cards && this.state.cards.length > 0 &&
            <List
              bordered
              dataSource={this.state.cards}
              renderItem={item => (
                <List.Item actions={
                  item.casetype == "full" ?
                  [<a href={'/user/'+item.casetype+'/'+item.key}> {!item.completed ? 'Complete' : 'Revise'} </a>,<a onClick={()=>{
                      this.deleteCard(item.key);
                    }}>Delete</a>
                  ]:
                  [<a onClick={()=>{
                    this.deleteCard(item.key);
                  }}>Delete</a>
                  ]

                }>
                    <List.Item.Meta
                      title={<span><strong>{item.name}</strong></span>}
                      description={<div>
                        <span>last updated : {moment(item.time).format('LL')}</span><br/>
                        <span>{item.casetype =='full' ? <Badge status="success" text="Detailed Case" />
                            : <Badge status="warning" text="Basic Case" />}</span><br/>
                        {item.analysis && item.completed  && item.casetype =="full" &&
                          <span>Recommendation : {item.analysis}<br/></span>
                        }

                        {item.analysis &&
                          <span>Recommendation : {item.analysis}<br/></span>
                        }

                        {!item.completed && item.casetype =="full" &&
                          <Progress style={sm([ styles.maxWid320 ])} percent={ item.answers? (100- parseInt((( (item.answers ? item.answers.length : 0)- item.answers.filter(Number).length)/15)*100)) : 0 } size="small" status="active" />
                        }
                      </div>}
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
