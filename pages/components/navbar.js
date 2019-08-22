import React from 'react';

import { redirect } from '../util/dbops';

import { Menu, Icon, Badge } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import _ from 'lodash';
import styles from '../../styles/styles';
import { sm, isM } from '../util/util';

import style_menu from 'antd/lib/menu/style/index.css';
// import { MenuCSS } from "../../styles/styles.js";

import Config from '../util/config';

export default class App extends React.Component{
  state = {
    current: '',
  }
  constructor(props){
      super(props);
  }

  componentDidMount(){
  }

  // handleClick = (e) => {
  //   this.setState({
  //     current: e.key,
  //   });
  //   //redirect(e.key);
  // }

  render(){
      return (
          <div>

          {/* <style jsx global>{MenuCSS}</style> */}
          <style dangerouslySetInnerHTML={{ __html: style_menu }} />

            <Menu
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >

            <Menu.Item key="mail">
              <a href="/">
              <img onClick={()=> this.setState({ modal1Visible : true})} src={'/static/images/logo.svg'} style={_.assign.apply(_, [styles.w50, styles.cursor])} />
              </a>
            </Menu.Item>
            <Menu.Item key="about">
              <a href="/about">About</a>
            </Menu.Item>
            <Menu.Item key="pricing">
              <a href="/pricing">Pricing</a>
            </Menu.Item>
            <Menu.Item key="contact">
              <a href="/contact">Contact</a>
            </Menu.Item>

            <Menu.Item key="login" style={sm([{ float: 'right'}, styles.bggreen, styles.textwhite ] )}>
              <a href="/login" style={sm([ styles.bggreen, styles.textwhite ] )}>
              <Icon type="login" />Login
              </a>
            </Menu.Item>
               {/*
              <Menu.Item key="activity" >
                  <Icon type="line-chart" />Activity
              </Menu.Item>
              <Menu.Item key="rereward" >
                  <Icon type="line-chart" />Re Reward
              </Menu.Item>
              */}


            </Menu>

          </div>
      );
  }
}
