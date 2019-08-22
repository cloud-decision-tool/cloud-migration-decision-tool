
import React, { Component } from 'react';
import {Row , Col,Button, Card, List ,Tabs, Icon, Spin, message } from 'antd';
import { sm, isM } from './util/util';
import styles from '../styles/styles';
import Navbar from './components/navbar';
import Config from './util/config';
import Modal from 'react-awesome-modal';
import dbops from './util/dbops';
import moment from 'moment';

import axios from 'axios';

import Head from 'next/head'
// import { StripeProvider, Elements } from 'react-stripe-elements';
import CheckoutForm from './libs/stripecomponents/CheckoutForm';
import StripeCheckout from 'react-stripe-checkout';
// import {StripeProvider, Elements, CardElement} from 'react-stripe-elements';


const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const TabPane = Tabs.TabPane;
import Register from './components/register';
import Login from './components/login';

const DemoBox = props => <p style={{height: props.value, background:'red'}} className={`height-${props.value}`}>{props.children}</p>;


export default class extends Component{

  constructor(props){
      super(props);


      let { pathname, query } = props.url;
      this.state = { path : pathname, query : query,
        signup : false,
        signuploaded: false,
        user : null,
        loading: false,
        stripe: null,
        planinfo : null,
        client : false
      };


      this.dbops = new dbops();
  }

  loadPlanofUser = () => {
      // console.log(this.dbops.getCurrentUser().uid)
      let uid = this.dbops.getCurrentUser().uid;
      this.setState({ loading : true })
      this.dbops.get_data_fire( Config.URLS.userplans, uid).then((snapshot)=>{
        console.log(" snap plans ", snapshot.data())
        if(!snapshot.data())
          this.setState({ loading : false, planinfo : false })
        else
          this.setState({ loading :false, planinfo : snapshot.data()})
      })
      .catch((e)=>{
        this.setState({ loading : false, planinfo : false })
      });
  }

  componentDidMount(){
    this.dbops.listen_user_events( (user)=>{
        if(user){
          console.log(user.email);
          this.setState({user: user, client : true }, ()=>{
            // if (process.browser && typeof window !== 'undefined') {
            //    this.setState({stripe: window.Stripe('pk_test_CxirylwEmIxObJVBNBKrQylD')});
            //  }
            this.loadPlanofUser();

            // if (process.browser && typeof window !== 'undefined') {
            //   if (window.Stripe) {
            //     this.setState({stripe: window.Stripe('pk_test_12345')});
            //   } else {
            //     document.querySelector('#stripe-js').addEventListener('load', () => {
            //       // Create Stripe instance once Stripe.js loads
            //       this.setState({stripe: window.Stripe('pk_test_12345')});
            //     });
            //   }
            // }


          });


          // ;
        }
        else{
          this.setState({user: null, loading : false });
          // this.dbops.error('Sign In Error');
        }
      }, (err)=>{
      }, true)
  }

//   card: {
//     address_city: null
// address_country: null
// address_line1: null
// address_line1_check: null
// address_line2: null
// address_state: null
// address_zip: null
// address_zip_check: null
// brand: "Visa"
// country: "US"
// cvc_check: "pass"
// dynamic_last4: null
// exp_month: 12
// exp_year: 2020
// funding: "credit"
// id: "card_1DLtcZGujA2qk9TFE4FWldIL"
// last4: "4242"
// metadata: {}
// name: "test1@gmail.com"
// object: "card"
// tokenization_method: null
//   }
//   client_ip: "27.32.158.207"
//   created: 1539700447
//   email: "test1@gmail.com"
//   id: "tok_1DLtcZGujA2qk9TFWAHFRmU4"
//   livemode: false
//   object: "token"
//   type: "card"
//   used: false

  onToken = (token) => {
    // console.log(" Token ",token.id);
    this.setState({ stripetoken : token.id})

    axios.post('/payment',
    {
      description : 'Eco Plan',
      source: token.id,
      currency: 'AUD',
      amount: 35*100
    })
    .then((s)=>{
      // console.log(" Success  ",s)
      this.makePayment( s.data.success.id );
    })
    .catch((e)=>{
      console.log(" Error  ",e)
    });

    // fetch('/save-stripe-token', {
    //   method: 'POST',
    //   body: JSON.stringify(token),
    // }).then(response => {
    //   response.json().then(data => {
    //     alert(`We are in business, ${data.email}`);
    //   });
    // });
  }

  makePayment = (paymentid) => {
    // console.log(" sss ");
    // axios.post('/payment',
    // {
    //   description : 'plan a',
    //   source: this.state.stripetoken,
    //   currency: 'AUD',
    //   amount: 10*100
    // })
    // .then((s)=>{
    //   console.log(" Success  ",s)
    // })
    // .catch((e)=>{
    //   console.log(" Error  ",e)
    // });

    let uid = this.dbops.getCurrentUser().uid;
    this.setState({ loading : true });
    this.dbops.save_data_fire_promise( Config.URLS.userplans, uid, {
      "plan": "Eco Plan",
      "paymentid" :paymentid,
      "expires": (new Date((new Date()).getFullYear(), (new Date()).getMonth() + 1, (new Date()).getDate()))
     } ).then((snapshot)=>{
        this.setState({ loading :false, planinfo : {
          "plan": "Eco Plan",
          "expires": (new Date((new Date()).getFullYear(), (new Date()).getMonth() + 1, (new Date()).getDate()))
        }});

    })
    .catch((e)=>{
      this.setState({ loading : false, planinfo : false })
    });
  }

  render(){

    let formElement = null;

		// if (this.state.client) {
		// 	formElement = <CheckoutForm />
		// }
    if (this.state.client&& this.state.user && this.state.chosenPlan) {
			formElement = <StripeCheckout
          name={this.state.chosenPlan.name}
          token={this.onToken}
          email={this.state.user.email}
          allowRememberMe={false}
          stripeKey="pk_test_CxirylwEmIxObJVBNBKrQylD"
        />
		}


      return <div>

        <Head>
  			<script src="https://js.stripe.com/v3/" />
  		</Head>

      <Navbar />
      <Spin  indicator={antIcon} spinning={this.state.loading}>
      <Row type="flex" justify="space-around" align="top" style={sm([ styles.flexHeight ])}>
        <Col span={18} >

        {this.state.user &&
        <div>
        <Card bordered={false} hoverable
        style={sm([ styles.pad0, styles.borderradius15, styles.overflowHidden, styles.marTop5, styles.h120 ])}
        bodyStyle={sm([ styles.pad0, styles.borderradius15, styles.bglightyellow ])}>
        <p style={sm([ styles.textBold, styles.textCenter, {margin: 10} ])}>Your {this.state.planinfo? this.state.planinfo.plan : ''} expires on {this.state.planinfo? (moment(this.state.planinfo.expires.seconds*1000)).format('L') : '' }</p>
        <Button href="/user" type="primary" size={'medium'} style={sm([ styles.selfCenter, styles.marTop5, styles.maxWid320 ])}> You are logged in, Click Goto Dashboard </Button>
        </Card>
        </div>
        }

        <p style={sm([ styles.textBold, styles.textCenter, styles.marTop40, styles.fs25  ])}>Choose what best suits you</p>
        <p style={sm([ styles.textCenter ])}>click a plan to continue</p>

        <Row gutter={30} type="flex" justify="space-around" align="middle" >

        {Config.UI.pricingplans.map((item,index)=>{
          return <Col sm={24} md={12} lg={12} style={sm([ styles.marBot14])}
            onClick={()=>{
              this.setState({signup: true, chosenPlan: item },()=>{
                if(!this.state.user){
                  setTimeout(()=>{
                    this.setState({ signuploaded : true})
                  }, 300)
                }
                else {
                  message.info('You are already logged In');

                  //check if plan not purchased
                  this.setState({ pricingModal : true})
                }
              });
            }}
            >
            <Card bordered={false} hoverable
            style={sm([ styles.pad0, styles.borderradius15, styles.overflowHidden ])}
            bodyStyle={sm([ styles.pad0, styles.borderradius15, styles.overflowHidden, styles.posRel ])}>
              <Col span={12} style={sm([ styles.pad20, styles.minH300 ])}>
                <h3 style={sm([ styles.textBold, styles.fs18 ])}>{item.name}</h3>
                <List
                  size="small"
                  bordered={false}
                  dataSource={item.features}
                  renderItem={item => (<List.Item>{item}</List.Item>)}
                />
              </Col>
              <Col span={12} style={sm([ { height: '100%'}, styles.posAbs, styles.posXRight ])} className={ item['className'] ?  item['className'] : ' '}>
                <Row type="flex" style={sm([ { height: '100%'}, styles.posRel, styles.posXRight ])} justify="space-around" align="middle">
                  <Col >
                    <div style={sm([ styles.fs45, styles.textwhite, styles.textCenter, styles.textLight ])}>{item.price}</div>
                    <div style={sm([ styles.fs22, styles.textwhite, styles.textCenter, styles.textLight ])}>{item.tag}</div>
                    <Button type="primary" size={'large'} style={sm([ styles.bgwhite, styles.textsecondary, styles.marTop40 ])}>Choose <Icon type="right" /></Button>
                  </Col>
                </Row>
              </Col>
              </Card>
            </Col>
        })}

        </Row>
        </Col>
      </Row>


      <Modal
          visible={this.state.pricingModal && this.state.user}
            width={isM() ? '80%' : '70%'}
            height={isM() ? '70%' : '60%'}
          effect="fadeInUp"
          onClickAway={() => {
            this.setState({pricingModal: false});
          }}
      >
        <div>
          <div style={sm([ styles.pad20])}>

          <p style={sm([ styles.textBold, styles.textCenter, styles.marTop40, styles.fs25  ])}>Purchasing {this.state.chosenPlan ? this.state.chosenPlan.name :' '} </p>
          <p style={sm([ styles.textCenter ])}>Enter your card details</p>

          {/*<StripeProvider stripe={this.state.stripe}>
            <Elements>
              <CardElement style={{base: {fontSize: '18px'}}} />
            </Elements>
          </StripeProvider>*/}

            {/*https://stripe.com/docs/testing#cards*/}
            <Row type="flex" justify="space-around" align="middle" >
            <Col sm={24} md={12} lg={12} >
            <div style={sm([ styles.centerContent, styles.selfCenter])} >
            {formElement}
            {/*<CheckoutForm />*/}
            </div>
            </Col>
            </Row>

            {/*<Button onClick={this.makePayment} type="primary" style={sm([ styles.bgblue,styles.maxWid60, styles.maxWid320, styles.selfCenter, styles.textLight, styles.fs18 ])}
            size={'large'}   className="login-form-button w100p">
               Pay
            </Button>*/}


            <img src={'/static/images/secure2.webp'} style={sm([styles.maxWid320, styles.selfCenter, styles.marBot20, styles.cursor])} />

          </div>
        </div>
      </Modal>


      <Modal
          visible={this.state.signup && !this.state.user}
            width={isM() ? '80%' : '70%'}
            height={isM() ? '70%' : '60%'}
          effect="fadeInUp"
          onClickAway={() => {
            this.setState({signup: false});
          }}
      >
        {this.state.signup &&
        <Tabs tabPosition={'left'} style={sm([ styles.marTop20])} tabBarStyle={{ width: isM() ? 80 : 150}}>
          <TabPane tab="Register" key="1">
            <Register onLogin={()=>{
              setTimeout(()=>{
                this.setState({signup: false});
              },300);
            }}/>
          </TabPane>
          <TabPane tab="Login" key="2">
            <Login onLogin={()=>{
              setTimeout(()=>{
                this.setState({signup: false});
              },300);
            }}/>
          </TabPane>
        </Tabs>
        }
      </Modal>


      </Spin>

      </div>
  }

}
