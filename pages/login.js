import Head from 'next/head';
import Link from 'next/link';
import React, { Component } from 'react';
import {Row , Col } from 'antd/lib/grid';
import { sm, isM } from './util/util';
import styles from '../styles/styles';
import Navbar from './components/navbar';
import Config from './util/config';
import Modal from 'react-awesome-modal';
import dbops from './util/dbops';

//styles for components
// import { DatepickerCSS, MenuCSS } from "../styles/styles.js";

import Login from './components/login';

/**
 * this is IndexClass.
 */
export default class extends Component{
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

      <Row type="flex" justify="space-around" align="top" style={sm([ styles.flexHeight ])}>
        <Col span={8}>
        <Login />
        </Col>
      </Row>

    </div>

  }
}
