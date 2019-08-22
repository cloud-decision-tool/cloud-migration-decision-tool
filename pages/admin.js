import Head from 'next/head';
import Link from 'next/link';
import React, { Component } from 'react';
import {Row , Col } from 'antd/lib/grid';

//styles for components
// import { DatepickerCSS, MenuCSS } from "../styles/styles.js";
// import NavBarAdmin from './components/navbar_admin';

/**
 * this is IndexClass.
 */
export default class extends Component{

  replacestring = (mystring, index, replacement) =>{
    console.log(mystring.substr(0, index) + replacement+ mystring.substr(index + replacement.length));
    return mystring.substr(0, index) + replacement+ mystring.substr(index + replacement.length);

  }
  /**
   * @param {number} a - this is a value.
   * @param {number} b - this is a value.
   * @return {number} result of the sum value.
   */
  render(){
    return <div className="header">
      <Head>
        <title>TON ADMIN</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      </Head>

      <div>
      {JSON.stringify(this.props)}
      </div>
      <NavBarAdmin />

    </div>

  }
}
