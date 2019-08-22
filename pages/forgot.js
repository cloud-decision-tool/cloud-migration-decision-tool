import Head from 'next/head';
import React, { Component } from 'react';

// import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Divider,
//   Checkbox, Button, AutoComplete,message, Modal, DatePicker, Radio, Badge, Spin } from 'antd';
// import moment from 'moment';
// import is from 'is_js';
//
// // import { Menu, Icon, Badge, Form, Button, message, Modal } from 'antd';
// const FormItem = Form.Item;
// const Option = Select.Option;
// const AutoCompleteOption = AutoComplete.Option;
// const RadioButton = Radio.Button;
// const RadioGroup = Radio.Group;
//
// import Config from './util/config';
// import { validateEmail } from './util/util';
// import dbops from './util/dbops';


// var Recaptcha = require('react-recaptcha');
// var ReCAPTCHA = require("react-google-recaptcha");
import Forgot from './components/forgot';

export default class extends Component{

  state = {

  }
  constructor(props){
      super(props);

      let { pathname, query } = props.url;

  }

  verifyCallback = (response) =>{

  }

  render(){
      return <div className={'mar25'}>
      <Head>
        <title>TCABS Forgot</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/*
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
        */}
      </Head>
        <Forgot />

        {/*
        <Recaptcha
          sitekey="6Ldoy1MUAAAAADtjZOs7xM2w5MzWB5GRjf-3eMP2"
          verifyCallback={this.verifyCallback}
        />
         */}
      </div>;
  }

}
