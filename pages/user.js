import Head from 'next/head';
import Link from 'next/link';
import React, { Component } from 'react';
import {Row , Col, Layout, Menu, Breadcrumb, Icon,Button } from 'antd';
// import Navbar from './components/navbar_user';
// import Register from './components/register';

// import { handleRequestWithRedirection, b64DecodeUnicode } from '../util/util';
import { sm, isM, getUser } from './util/util';
import styles from '../styles/styles';
import Navbar from './components/navbar';
import Config from './util/config';
import Modal from 'react-awesome-modal';
import dbops from './util/dbops';

import dynamic from 'next/dynamic';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

import _ from 'lodash';
// import Tubular from 'react-tubular';
// import YoutubeBackground from 'react-youtube-background';
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

const dynocomponents = {
  user : null,
  index: dynamic(import('./components/user/index')),
  simple: dynamic(import('./components/user/simple')),
  full: dynamic(import('./components/user/full')),
  history: dynamic(import('./components/user/history')),
  settings: dynamic(import('./components/user/settings')),
  payment: dynamic(import('./components/user/payment')),
  }

/**
 * this is IndexClass.
 */
export default class extends Component{
  state ={
  }

  static async getInitialProps({ req, res}) {
    // console.log(getUser(req));
    //let { pathname, query, asPath } = req.url;
    this.dbops = new dbops();
    let userinfo = getUser(req);
    if(!userinfo){
      // this.dbops.sign_out();
      // res.redirect(Config.url_home);
    }


    // console.log(userinfo);
    // return {};
    let snapdata = null;
    if(userinfo)
      snapdata = await this.dbops.get_data_fire( Config.URLS.userplans, userinfo.user_id);
    // console.log(" snap plans ", snapdata.data());
    // .then((snapshot)=>{
    //   console.log(" snap plans ", snapshot.data())
    //   if(!snapshot.data())
    //     this.setState({ loading : false, planinfo : false })
    //   else
    //     this.setState({ loading :false, planinfo : snapshot.data()})
    // })
    // .catch((e)=>{
    //   // this.setState({ loading : false, planinfo : false })
    // });

    return { userinfo : userinfo, planinfo: snapdata? snapdata.data() : null }
  }

  constructor(props){
    super(props);
    this.dbops = new dbops();
    console.log("my props",props);


    let { pathname, query, asPath } = props.url;
    this.state = { path : props, query : asPath, userinfo: props.userinfo,
      planinfo : props.planinfo, pageloaded : false,
      collapsed : isM() ? true : false };
  }

  logout = () => {
    this.dbops.sign_out();
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  componentDidMount(){


    setTimeout(()=>{
      this.setState({ pageloaded : true })
    }, 400);
    if(!this.props.userinfo)
      {
        this.dbops.sign_out();
      }
    // if(this.state.query)
    // this.pagename = this.state.query.split('/')[2];
  }

  render(){
    // let Component = null;
    // let { query } = this.state;
    //
    // if( query && query.length > 0)
    // {
    //   let pagename = query.split('/')[2];
    //   if(pagename)
    //   Component = dynamic(import('./components/user/new'));
    // }
    // else {
    //   Component = dynamic(import('./components/user/index'));
    // }

    let pagename = this.state.query.split('/')[2];

    let Component = null;

    Component = dynocomponents[pagename] ? dynocomponents[pagename] : dynocomponents['index'];

    let caseid = null;
    if(pagename == "simple" || pagename =="full")
      if(this.state.query.split('/')[3])
      {

        caseid = this.state.query.split('/')[3];
        console.log(" case id ",caseid, pagename)
      }


    return <div >
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>


      <Layout style={{ minHeight: '100vh', padding: '0 0 0 0', background: '#fff' }}>
        <Sider
          width={200} style={{  }}
          collapsible
            mode="horizontal"
          theme="dark"
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo " style={sm([styles.textCenter, styles.marBot14])} >
            <a href="/user">
            <img src="/static/images/logo.svg" style={{ width :this.state.collapsed ? 50 : 80, marginLeft: this.state.collapsed ? -40 : 0, marginTop: 25}} />
            </a>

          </div>
          <Menu theme="dark" defaultSelectedKeys={[this.state.query.split('/')[2]]} mode="inline">
            <Menu.Item key="new" >
              <a href="/user/new">
              <Icon type="plus" />
              <span>New Case</span>
              </a>
            </Menu.Item>
            {/*<SubMenu
              key="user"
              title={<span><a href="/user"><Icon type="plus" /><span>New Case</span></a></span>}
            >
              <Menu.Item key="new"><a href="/user/simple">BUCM</a></Menu.Item>
              <Menu.Item key="full"><a href="/user/full">DUCM</a></Menu.Item>
            </SubMenu>*/}
            <Menu.Item key="history">
              <a href="/user/history">
              <Icon type="copy" />
              <span>History</span>
              </a>
            </Menu.Item>
            <SubMenu
              key="settings"
              title={<span> <Icon type="setting" /> {this.state.collapsed ? '': 'Settings'} </span>}
            >
              <Menu.Item key="settings"><a href="/user/settings"><Icon type="user" /> Profile</a></Menu.Item>
              <Menu.Item key="payment"><a href="/user/payment"><Icon type="credit-card" /> Payment</a></Menu.Item>
            </SubMenu>
            {/*<Menu.Item key="settings">
              <a href="/user/settings">
              <Icon type="setting" />
              <span>Settings</span>
              </a>
            </Menu.Item>*/}

            <Menu.Item key="9" onClick={this.logout}>
              <Icon type="logout" />
              <span>Logout</span>
            </Menu.Item>
          </Menu>
        </Sider>


        <Layout style={{ minHeight: '100vh', padding: '0 0 0 0', background: '#fff' }}>
          {/*<Header style={{ background: '#fff', padding: 0 }} />*/}
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {/*{this.state.query.split('/').map((item,index)=>{
                return <Breadcrumb.Item>{item}</Breadcrumb.Item>
              })}*/}
              {/*<Breadcrumb.Item>{this.state.query.split('/')[2]}</Breadcrumb.Item>*/}

            </Breadcrumb>

            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

              {this.state.planinfo && this.state.pageloaded&&
                <div>
                {Component &&
                  <Component userinfo={this.state.userinfo} caseid={caseid} />
                }
                </div>
              }


              {!this.state.planinfo &&
                <div>
                <p style={sm([ styles.textBold, styles.textCenter, styles.marTop40, styles.fs25  ])}>Please Subscrible to use the tool</p>
                <Button type="primary"  href="/pricing" style={sm([ styles.bgblue,styles.maxWid60, styles.maxWid320, styles.selfCenter, styles.textLight, styles.fs18 ])} href={Config.URLS.page_pricing} size={'large'}  htmlType="submit"  className="login-form-button w100p">
                    {Config.UI.seepricing}
                </Button>

                </div>
              }


            </div>
          </Content>
          {/*<Footer style={{ textAlign: 'center' }}>
            CDT Swin @ 2018
          </Footer>*/}
        </Layout>
      </Layout>

    </div>

  }
}
