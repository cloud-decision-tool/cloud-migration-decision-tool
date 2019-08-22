import Head from 'next/head';
import Link from 'next/link';
import React, { Component } from 'react';
import {Row , Col,Button,Carousel } from 'antd';
import Navbar from './components/navbar';
import Config from './util/config';
import Modal from 'react-awesome-modal';

import { sm, isM } from './util/util';
// import _ from 'lodash';
// import Tubular from 'react-tubular';
import styles from '../styles/styles';
// import YoutubeBackground from 'react-youtube-background';
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

/**
 * this is IndexClass.
 */
export default class extends Component{
  state ={
    modal1Visible : false,
    bgimage : {
      background: 'url("https://amp.businessinsider.com/images/55ae61f22acae76e098b70fa-750-546.jpg") center center',
      backgroundSize: 'cover',
      height:"100vh"
    }
  }

  escFunction =(event) =>{
    if(event.keyCode === 27) {
      //Do whatever when esc is pressed
      this.setState({ modal1Visible : false})
    }
  }
  componentDidMount(){
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }

  render(){
    let {loadvideo } = this.state;
    return <div className="header">
      <Head>
        <title>CDT Swin</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {/*<Navbar />*/}
      <div>
      <Row>
        <Col sm={24} md={12} lg={8} style={this.state.bgimage} type="flex" justify="center" align="center">

        <Row type="flex" justify="space-around" align="middle" style={sm([styles.bgtranslucent, styles.flexHeight])} >
          <Col span={24} >
            <img onClick={()=> this.setState({ modal1Visible : true})} src={'/static/images/play-button.svg'} style={sm([styles.h120, styles.marBot20, styles.cursor])} />
            <h1 onClick={()=> this.setState({ modal1Visible : true})}  style={sm([styles.textwhite, styles.textBold, styles.cursor]) }>See what Microsoft CEO talks about Cloud Performances & Organisational Impact</h1>

          </Col>
        </Row>
        </Col>


        <Col sm={24} md={12} lg={16}>
        <Row span={24} type="flex" justify="space-around" align="top" style={sm([ styles.flexMinHeight])} >
          <Col span={24} style={sm([ styles.overflowY, styles.flexHeightNoMobile ])}>
          <Navbar />
            <div style={sm([ styles.textCenter ])}>
              <img src={'/static/images/migration.jpg'} style={sm([ {width: '80%', maxWidth: '700px'}, styles.marTop20, styles.marBot20])} />
            </div>

            <Button type="primary" style={sm([ styles.bgblue, styles.h60, styles.pad10, styles.maxWid60, styles.selfCenter, styles.textLight, styles.fs22 ])} href={Config.URLS.page_pricing} size={'large'} htmlType="submit"  className="login-form-button w100p">
                {Config.UI.seepricing}
            </Button>



            <div style={sm([ { marginTop: 80, paddingLeft: isM()? 80 : 30, paddingRight: isM()? 80 : 30} ])}>
            <h2 style={sm([ styles.textBold, styles.marTop20, styles.textgrey, styles.textCenter])}>Clients</h2>

            <Carousel autoplay slidesToShow={isM() ? 2 : 4} style={sm([ styles.mar5 ])}>
              <div>
              <img style={sm([ styles.selfCenter, styles.w150 ])} src={'/static/images/brand1.jpg'}/>
              </div>
              <div>
              <img style={sm([ styles.selfCenter, styles.w150 ])} src={'/static/images/brand2.jpg'}/>
              </div>
              <div>
              <img style={sm([ styles.selfCenter, styles.w150 ])} src={'/static/images/brand3.jpg'}/>
              </div>
              <div>
              <img style={sm([ styles.selfCenter, styles.w150 ])} src={'/static/images/brand4.jpg'}/>
              </div>
              <div>
              <img style={sm([ styles.selfCenter, styles.w150 ])} src={'/static/images/brand1.jpg'}/>
              </div>
              <div>
              <img style={sm([ styles.selfCenter, styles.w150 ])} src={'/static/images/brand2.jpg'}/>
              </div>
              <div>
              <img style={sm([ styles.selfCenter, styles.w150 ])} src={'/static/images/brand3.jpg'}/>
              </div>
              <div>
              <img style={sm([ styles.selfCenter, styles.w150 ])} src={'/static/images/brand4.jpg'}/>
              </div>

            </Carousel>

            <h2 style={sm([ styles.textBold, styles.marTop40, styles.textgrey, styles.textCenter])}>How it Works</h2>
            <p style={sm([ styles.textgrey])}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
              id est laborum.
            </p>

            <div style={sm([ styles.textCenter ])}>
              <img src={'/static/images/migration.jpg'} style={sm([ {width: '80%', maxWidth: '700px'}, styles.marTop20, styles.marBot20])} />
            </div>
            <h2 style={sm([ styles.textBold, styles.marTop20, styles.textgrey])}>More Info</h2>
            <p style={sm([ styles.textgrey])}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
              id est laborum.
            </p>

            </div>
            {/*<Register />*/}

          </Col>
        </Row>
        </Col>

      </Row>
      </div>



      <Modal
        visible={this.state.modal1Visible}
          width={isM() ? '90%' : '70%'}
          height={isM() ? '70%' : '60%'}
          effect="fadeInUp"
          onClickAway={() => {
            this.setState({modal1Visible: false});
          }}
      >
      <iframe width="100%" height="100%" src="https://www.youtube.com/embed/Jz_nzZQD9Cw"
      frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </Modal>


    </div>

  }
}
