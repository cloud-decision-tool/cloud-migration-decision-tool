import React from 'react';

import { redirect } from '../util/dbops';

import { Menu, Icon, Badge, Row , Col, Avatar, Divider } from 'antd';
// import Menu from 'antd/lib/menu';
// import Icon from 'antd/lib/icon';
// import Badge from 'antd/lib/badge';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
// import {Row , Col } from 'antd/lib/grid';

// import style_menu from 'antd/lib/menu/style/index.css';
// import { MenuCSS } from "../../styles/styles.js";

import Config from '../util/config';
import dbops from '../util/dbops';

export default class App extends React.Component{

  constructor(props){
      super(props);

      this.dbops = new dbops();
      this.state = {
        current : props.pathname ? props.pathname.replace(/\//g, '') : []
      }
  }

  componentDidMount(){
  }

  // handleClick = (e) => {
  //   this.setState({
  //     current: e.key,
  //   });
  //   //redirect(e.key);
  // }

  logout = () => {
    this.dbops.sign_out();
  }

  render(){
      return (
          <div>

          {/* <style jsx global>{MenuCSS}</style>

          <style dangerouslySetInnerHTML={{ __html: style_menu }} />
          */}

          <Row type="flex" justify="center" align="top">
          <Col sm={22} md={20} lg={22} >
            <Menu
              defaultSelectedKeys={this.state.current}
              selectedKeys={this.state.current}
              mode="horizontal"
              className={'menu-custom'}
            >

               {/*<Menu.Item key={Config.url_admin_employee.fileName} className={'menu-custom-item'} >
                   <a href={Config.url_admin_employee.routerURL} >
                    <Avatar size="small" shape="square"
                    src={ Config.url_admin_employee.fileName ==  this.state.current ? Config.url_admin_employee.icon_active : Config.url_admin_employee.icon_normal} />
                    {'    '+Config.url_admin_employee.name}
                   </a>
               </Menu.Item>*/}

               {/*<Menu.Item key={Config.url_admin_unit.fileName} className={'menu-custom-item'} >
                   <a href={Config.url_admin_unit.routerURL} >
                    <Avatar size="small" shape="square"
                    src={ Config.url_admin_unit.fileName ==  this.state.current ? Config.url_admin_unit.icon_active : Config.url_admin_unit.icon_normal} />
                    {'    '+Config.url_admin_unit.name}
                   </a>
               </Menu.Item>
               <Menu.Item key={Config.url_admin_student.fileName} className={'menu-custom-item'} >
                   <a href={Config.url_admin_student.routerURL} >
                    <Avatar size="small" shape="square"
                    src={ Config.url_admin_student.fileName ==  this.state.current ? Config.url_admin_student.icon_active : Config.url_admin_student.icon_normal} />
                    {'    '+Config.url_admin_student.name}
                   </a>
               </Menu.Item>
               <Menu.Item key={Config.url_admin_enrol.fileName} className={'menu-custom-item'} >
                   <a href={Config.url_admin_enrol.routerURL} >
                    <Avatar size="small" shape="square"
                    src={ Config.url_admin_enrol.fileName ==  this.state.current ? Config.url_admin_enrol.icon_active : Config.url_admin_enrol.icon_normal} />
                    {'    '+Config.url_admin_enrol.name}
                   </a>
               </Menu.Item>*/}

               <Menu.Item key={Config.url_admin_logout.fileName} className={'menu-custom-item right bold logoff'} >
                   <a onClick={this.logout}>
                    <Avatar size="small" shape="square"
                    src={Config.url_admin_logout.icon_normal} />
                    {'    '+Config.url_admin_logout.name}
                   </a>
               </Menu.Item>



            </Menu>
          </Col>
          </Row>
          </div>
      );
  }
}
