
import React, { Component } from 'react';
import {Row , Col,Modal,Button, Icon, Input, Spin, Card } from 'antd';
import { sm, isM } from '../../util/util';
import styles from '../../../styles/styles';

const { Meta } = Card;

import SimpleCase from './simple';
import DetailedCase from './full';

import dbops from '../../util/dbops';
const DemoBox = props => <p style={{height: props.value, background:'red'}} className={`height-${props.value}`}>{props.children}</p>;

const Search = Input.Search;

export default class extends Component{

  constructor(props){
      super(props);
      //
      // let { pathname, query } = props.url;


      this.dbops = new dbops();
      this.state = {
        loading: false,

        step: 1,
        caseid: null,
        casetype: null,

        //temperorary
        // step: 3,
        // caseid: '7tVuCjcEWzStdMmG3azx',
        // casetype: 'simple',

        caseinfo : null,
      };
      /*
        step : 1  -- case Name
        step : 2  -- choose casetype
        step : 3  -- work on case
      */

  }


  saveCase = (casename) => {
    this.setState({ loading: true });
    this.dbops.save_data_fire_push_promise('userCases', {
      userid : this.dbops.get_current_user(),
      name : casename,
    })
    .then((response)=>{
      console.log( " case info ",response);
      //this.dbops.success('Saved', 'Your card has been added');
      this.setState({ caseid :response.id, loading: false, step : 2 });
      // this.setState({  });
      // this.retrieveFire();
    })
    .catch((response)=>{
      console.log(response);
      this.setState({ loading: false });
      this.dbops.error('Error', 'Error while saving your card')
    });
  }

  udpateCase = (casetype) => {
    console.log(casetype, this.state.caseid);

    // return;


      this.setState({ loading: true });
      this.dbops.set_Doc_Merge('userCases', this.state.caseid, {
            "casetype" : casetype,
          })
          .then((r)=>{
            console.log(r);
            this.setState({ step: 3, casetype : casetype, loading: false});
            // this.setState({ showResults : true})
          })
          .catch((e)=>{
            console.log("svaing error ",e);
              this.setState({ loading: false });
            this.dbops.error("Error", "Error while saving your progress")
          })

    }



  render(){
    let {step, caseinfo, casetype, caseid }= this.state;
      return <div>
      <Row type="flex" justify="space-around" align="top" style={sm([ styles.flexHeight ])}>
        <Col span={24}>

        {/*{JSON.stringify(caseid)}*/}

        {step == 1 &&
          <Spin spinning={this.state.loading} style={sm([])}>
          <p style={sm([ styles.textBold, styles.textCenter, styles.marTop40, styles.fs25 ])}>Create New Case</p>

            <Search
              style={sm([ styles.maxWid400, styles.selfCenter, styles.marTop20 ])}
              placeholder="Ex: Telstra Melbourne Cloud Team"
              enterButton={`   Create   `}
              size="large"
              onSearch={value => {
                console.log("casename ", value);
                this.setState({ casename : value})

                if( (''+value).replace(" ", "").length > 4 )
                {
                  this.saveCase(value);
                }
                else {
                  this.dbops.error('Invalid Case Name', 'Enter more or valid characters')
                }
              }}
            />
          </Spin>
        }

        {/*<p style={sm([ styles.textCenter ])}></p>*/}
        {/*<Button href="/user/new" type="primary" size={'large'} style={sm([ styles.bgwhite, styles.textsecondary, styles.marTop40 ])}>New Case <Icon type="right" /></Button>*/}

        {step == 2 &&
          <div style={sm([])}>
          {/*<Button href="/user/simple" type="primary" size={'large'} style={sm([ styles.w200, styles.marRight20, styles.bgblue, styles.textwhite, styles.marTop40 ])}>BUCM </Button>
          <Button href="/user/full" type="primary" size={'large'} style={sm([ styles.w200, styles.bggreen, styles.textwhite, styles.marTop40 ])}>DUCM </Button>*/}

          <div style={sm([ styles.textBold, styles.textCenter, styles.marTop40, styles.marBot20, styles.fs25  ])}>Ok! lets start with</div>
          <div style={sm([ styles.centerContent, styles.selfCenter])}>

          <Card
            hoverable
            // onClick={()=> this.setState({ step: 3, casetype : 'simple'}) }
            onClick={()=> { this.udpateCase('simple') } }
            style={{ width: isM() ? '90%' :'50%', maxWidth: 320, marginRight: 20, textAlign:'center' }}
            cover={<img alt="Basic Case" src="/static/images/space-ship.svg" style={{  margin: '0 auto', marginTop: 20, marginBottom: 20, maxWidth: 180}} />}
          >
            <Meta
              title="Basic Case"
              description="We shall ask quick questions followed by financial assessment"
            />
          </Card>

          <Card
            hoverable
            onClick={()=> { this.udpateCase('full') } }
            style={{ width: isM() ? '90%' :'50%', maxWidth: 320, marginRight: 20, textAlign:'center' }}
            cover={<img alt="Basic Case" src="/static/images/detailed.svg" style={{  margin: '0 auto', marginTop: 20, marginBottom: 20, maxWidth: 180}} />}
          >
            <Meta
              title="Detailed Case"
              description="A more detailed case interpretation followed by financial assessment"
            />
          </Card>
          {/*<Button onClick={()=> this.setState({ step: 3, casetype : 'simple'}) } type="primary" size={'large'} style={sm([ styles.w200, styles.marRight20, styles.bgblue, styles.textwhite, styles.marTop40 ])}>BUCM </Button>
          <Button onClick={()=> this.setState({ step: 3, casetype : 'full'}) } type="primary" size={'large'} style={sm([ styles.w200, styles.bggreen, styles.textwhite, styles.marTop40 ])}>DUCM </Button>*/}
          </div>
          </div>
        }

        {/*<Button onClick={()=>{this.setState({choice: 1})}} type="primary" style={sm([ styles.bgblue,styles.maxWid60, styles.maxWid320, styles.selfCenter, styles.textLight, styles.fs18 ])}
        size={'large'}   className="login-form-button w100p">
           BUCM
        </Button>

        <Button onClick={()=>{zxthis.setState({choice: 2})}} type="primary" style={sm([ styles.bggreen,styles.maxWid60, styles.maxWid320, styles.selfCenter, styles.textLight, styles.fs18 ])}
        size={'large'}   className="login-form-button w100p">
           DUCM
        </Button>*/}


        { step == 3 && casetype &&
          <div>
            {casetype == "simple" &&
            <SimpleCase caseid={caseid} />
            }

            {casetype == "full" &&
            <DetailedCase caseid={caseid} />
            }
          </div>
        }

        </Col>
      </Row>
      </div>
  }

}
