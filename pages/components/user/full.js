
import React, { Component } from 'react';
import {Row , Col,Button, Icon, Carousel, Progress, message,Popover, Spin } from 'antd';
import { sm, isM } from '../../util/util';
import styles from '../../../styles/styles';

import Config from '../../util/config';
// Config.DUCM = Config.DUCM;

import Modal from 'react-awesome-modal';
import dbops from '../../util/dbops';
import moment from 'moment';

import Report from './reporting';
import Financial from './financial';

import YouTube from 'react-youtube';

// const OptionBtn = props => <Button type="primary" size={'large'} onClick={props.onUserClicked}
// style={sm([ {minWidth: 300, padding:5, height: 50, backgroundColor: '#e8ecf1', borderColor: '#e8ecf1', color: '#000' }, styles.marRight20, styles.marTop40 ])}>{props.text}</Button>;

class OptionBtn extends Component{
  state={ active : false};
  render(){
    let {active} = this.state;
    active = this.props.active ? true : false;
    return (
      <Button type="primary" size={'large'} onClick={()=>{
        // this.setState({ active : !active });
        if(this.props.onUserClicked)
          this.props.onUserClicked();
      }}
      style={sm([ {minWidth: 300, padding:5, height: 50, backgroundColor: active ? '#22a7f0' :'#e8ecf1', borderColor:  active ? '#22a7f0' :'#e8ecf1', color:  active ? '#fff' :'#000' }, styles.marRight20, styles.marTop40 ])}>{this.props.text}</Button>
    )
  }
}

class Question extends Component{
  // state={ active : false, current : null, helpModal: false};
  constructor(props){
    super(props);

    console.log(" current questio n", props.currentOption)
    // console.log(" current questio n", props.currentOption[props.index])
    // console.log(" current questio n", (props.currentOption[props.index] === 0) )
    let opt = null;
    if(props.currentOption)
      if(props.currentOption[props.index] === 0 || props.currentOption[props.index] === 1)
        opt = (props.currentOption[props.index] === 0) ? 'a' : ((props.currentOption[props.index] === 1) ? 'b': null)

    if(props.currentOption)
      if(props.currentOption[props.index] === "a" || props.currentOption[props.index] === "b")
        opt = (props.currentOption[props.index] === "a") ? 'a' : ((props.currentOption[props.index] === "b") ? 'b': null)
        console.log(" current questio n", opt )
    this.state = {
      active : false,
      current : null,
      helpModal: false,
      currentOption: opt? opt : null
    };
  }
  render(){
    let {active, helpModal} = this.state;
    let {item, index } = this.props;
    return (
      <Col key={index} sm={24} md={24} lg={24} style={sm([ styles.marBot14])}
        onClick={()=>{
          // this.setState({signup: true, chosenPlan: item },()=>{
          //   if(!this.state.user){
          //     setTimeout(()=>{
          //       this.setState({ signuploaded : true})
          //     }, 300)
          //   }
          //   else {
          //     message.info('You are already logged In');
          //
          //     //check if plan not purchased
          //     this.setState({ pricingModal : true})
          //   }
          // });
        }}
        >
        <div>
        {/*{JSON.stringify(this.state.currentOption)}*/}
        <h3 style={sm([ styles.textBold, styles.fs18, styles.marTop20 ])}>{item.question} </h3>
        <div>
          {item.options.map((item,index)=>{
            return <OptionBtn text={item.text}
            active={ ((this.state.currentOption === 'a' || this.state.currentOption === 0)  && index === 0) ? true : (((this.state.currentOption === 'b' || this.state.currentOption === 1) && index === 1) ? true : false)} onUserClicked={()=>{
              this.setState({ currentOption: index});

              // if(this.props.onAnswered)
              // this.props.onAnswered()

            }} />
            {/*return <OptionBtn text={item.text} active={this.state.currentOption !== null && this.state.currentOption == index ? true : false} onUserClicked={()=>{
              this.setState({ currentOption: index});

              // if(this.props.onAnswered)
              // this.props.onAnswered()

            }} />*/}
          })}
        </div>

        <br/>
        <Button type="dashed" icon="help" onClick={()=>{
          // this.setState({ helpModal : true })
          if(this.props.openHelp)
            this.props.openHelp();

        }}>Having trouble here? Click here </Button>
        {/*<Popover content={item.help}>
        <Button type="dashed" icon="help">Having trouble here? Hover here </Button>
        </Popover>*/}
        <br/><br/>

        <Button onClick={()=>{
          if(this.props.onNext){
              if(this.state.currentOption == null)
              {
                // message.info(" Select an option ");
                this.props.onNext(index, this.state.currentOption);
                return;
              }
              else{
                  this.props.onNext(index, this.state.currentOption);
              }

          }

            //this.slider.slickGoTo((this.state.currentIndex+ 1))
        }} type="primary" size={'large'} style={sm([ {minWidth: 300, padding:14, height: 50, backgroundColor: '#96281b', borderColor: '#96281b', borderRadius: 30 }, styles.marRight20, styles.textwhite, styles.marTop40 ])}>Continue </Button>



        </div>
      </Col>
    )
  }
}

export default class extends Component{

  constructor(props){
      super(props);

      // let { pathname, query } = props.url;
      this.dbops = new dbops();
      this.state = { userinfo : props.userinfo,
        choice : -1,
        currentIndex : 1,
        answers : [],
        showResults : false,
        surveyfinished : false,
        savingResult : false,
        // answers: [1,1,1,0,0,0,0],
        // showResults : true
      };

      // console.log(" NEW E", this.state.answers.length);


  }


  saveAndExit = () => {

    //console.log(" save case ", this.props.caseid, analysis);
    let {choice, currentIndex } = this.state;
    let { answers, surveyfinished } = this.state;

    this.dbops.set_Doc_Merge('userCases', this.props.caseid, {
      "answers" : answers,
      "completed" : false,
    })
    .then((r)=>{
      console.log(r);
      this.dbops.redirect('/user/history');

      //this.setState({ showResults : true})
    })
    .catch((e)=>{
      console.log("svaing error ",e);
      this.dbops.error("Error", "Error while saving your progress")
    })

  }


  updateCase = () => {

    //console.log(" save case ", this.props.caseid, analysis);
    let {choice, currentIndex } = this.state;
    let { answers, surveyfinished } = this.state;
    let analysis = "Public";
    // let privateAvg = 0, publicAvg = 0;
      for(let i=0;i<Config.DUCM.length; i++)
      {
        try{
            let useranswer = Config.DUCM[i].options[answers[i]].answer;
            // let answerWeightage = Config.DUCM[i].options[answers[i]].weightage;
            //
            // //  ----------- COND 1 ------------
            // // Add weightage & calculate %'s of private and public
            // if(useranswer == "private")
            // privateAvg += answerWeightage;
            //
            // if(useranswer == "public")
            // publicAvg += answerWeightage;

            //  ----------- COND 2 ------------
            // if()
            // console.log(" is force ",Config.DUCM[i].force)
            let isForce = Config.DUCM[i].force;
            if(isForce)
            {
              console.log(" user answer ", useranswer, useranswer == "private")
              if(useranswer == "private")
              {
                analysis = "Private";
              }

            }
            // console.log(" Each question ", Config.DUCM[i].options[answers[i]].answer, answers[i]);
        }catch(e){

        }
      }

    // console.log(" analysis ", analysis);
    // return;

      this.dbops.set_Doc_Merge('userCases', this.props.caseid, {
            "analysis" : analysis,
            "answers" : answers,
            "completed" : true
          })
          .then((r)=>{
            console.log(r);

            this.setState({ showResults : true})
          })
          .catch((e)=>{
            console.log("svaing error ",e);
            this.dbops.error("Error", "error while saving your progress")
          })

    }


    getCase = (caseid) => {
      this.setState({ savingResult: true });
      this.dbops.get_data_fire('userCases', caseid)
      .then((response)=>{
        let data = response.data();
        // if(data.exists){

          // console.log("yes 2",data.answers);

          this.setState({ answers: data.answers , savingResult: false, caseidChecked: true });
        // }
        // this.dbops.success('Saved', 'your card has been added');

        // // this.setState({  });
        // this.retrieveFire();
      })
      .catch((response)=>{
        console.log("e ",response)
        this.setState({ savingResult: false, caseidChecked: true });
        // this.dbops.error('Error', 'Error while saving your card')
      });
    }

   componentDidMount(){
     this.dbops.listen_user_events( (user)=>{
       if(user){
         if(this.props.caseid)
         this.getCase(this.props.caseid);
         else {
           this.setState({ caseidChecked : true})
         }
       }
     }, (err)=>{
     }, true)
   }



  render(){

    let {choice, currentIndex, showResults, stepFinancial} = this.state;
    let percent = parseInt(((currentIndex-1)/Config.DUCM.length)*100);

    let { answers, surveyfinished, caseidChecked } = this.state;
    let analysis = "Public";
    // let privateAvg = 0, publicAvg = 0;
    if(this.state.showResults){
      for(let i=0;i<Config.DUCM.length; i++)
      {
        try{

            let useranswer = Config.DUCM[i].options[answers[i]].answer;
            // let answerWeightage = Config.DUCM[i].options[answers[i]].weightage;
            //
            // //  ----------- COND 1 ------------
            // // Add weightage & calculate %'s of private and public
            // if(useranswer == "private")
            // privateAvg += answerWeightage;
            //
            // if(useranswer == "public")
            // publicAvg += answerWeightage;

            //  ----------- COND 2 ------------
            // if()
            // console.log(" is force ",Config.DUCM[i].force)
            let isForce = Config.DUCM[i].force;
            if(isForce)
            {
              console.log(" user answer ", useranswer, useranswer == "private")
              if(useranswer == "private")
              {
                analysis = "Private";
              }

            }
            // console.log(" Each question ", Config.DUCM[i].options[answers[i]].answer, answers[i]);
        }catch(e){

        }
      }

      // if(publicAvg > privateAvg)
      //   analysis = "Public";
      // else
      //   analysis = "Private";
    }

      return <div>


      <Row type="flex" justify="space-around" align="top" style={sm([ styles.flexHeightMin ])}>
        <Col sm={24} md={22} lg={20}>

        {!showResults && caseidChecked &&
        <div>

        <Button type="primary" size={'large'} onClick={()=>{ this.saveAndExit() }} style={sm([ styles.bggreen, { float: 'right', zIndex: 99}])} icon="logout">Save & Exit</Button>

        {!showResults &&
          <div style={sm([styles.maxWid400, styles.selfCenter, styles.marTop40])}>
          <Progress percent={percent} showInfo={true}/>
          </div>
        }
        {/*{JSON.stringify(this.state.answers)}*/}
        <Spin spinning={this.state.savingResult} >
        {/*<p style={sm([ styles.textBold, styles.textCenter, styles.marTop40, styles.fs25  ])}>BUCM</p>*/}
{/*this.state.answers.length ? this.state.answers[index] : null*/}
        <Carousel ref={slider => (this.slider = slider)} afterChange={()=>{
        }}>
        {Config.DUCM.map((item,index)=>{
          return <Question currentOption={this.state.answers} onNext={(questionindex, optionindex)=>{

            let tempA = this.state.answers ? this.state.answers : [];
            tempA[questionindex] = optionindex;
            this.setState({ answers : tempA, surveyfinished : true }, ()=> {
              if(this.slider){
                if(currentIndex < Config.DUCM.length){
                  this.setState({ currentIndex : currentIndex+1})
                  this.slider.next();
                }else{
                  this.updateCase(analysis);

                }
              }
            })


          }}
          item={item}
          index={index}
          openHelp={()=>{ this.setState({ helpModal : true }) }}
          />
        })}


        </Carousel>
        </Spin>
        </div>
      }

      {showResults  && !stepFinancial  &&
        <div>
          {/*<h3 style={sm([ styles.textBold, styles.fs18, styles.marTop20 ])}>Report </h3>

          <p>{JSON.stringify(this.state.answers)}</p>
*/}
          {/*<Report />*/}
          <img src={'/static/images/cloud'+analysis+'.svg'} style={sm([ styles.w150, styles.selfCenter ])} />
          <h3 style={sm([ styles.textBold, styles.fs18, styles.marTop20, styles.textgreen, styles.textCenter ])}> <span style={sm([styles.textgreen])}>{analysis+' Cloud'}</span> </h3>
          <p style={sm([ styles.fs16, styles.textCenter ])}> is Recommended for your implementation</p>
          {/*<p >{analysis?analysis: ""} Cloud is preferred for development  {privateAvg} {publicAvg}</p>*/}
          {/*<p >{analysis?analysis: ""} Cloud is preferred for development </p>*/}
          <div style={sm([ styles.selfCenter, styles.maxWid400 ])}>
          <Button style={sm([ styles.bggreen ])} type="primary" size={'large'} onClick={()=>{this.setState({ stepFinancial: true }) }}>Continue to Financial Assessment</Button>
          </div>
          <div style={sm([ styles.selfCenter, styles.maxWid400, styles.marTop20 ])}>
          <Button type="primary" size={'large'} onClick={()=>{this.setState({ stepFinancial: false, currentIndex: 1, showResults : false }) }} icon="back">ReCheck Technical Assessment</Button>
          </div>

        </div>
      }

      {showResults && stepFinancial &&
        <div>

          <Financial answers={this.state.answers} analysis={analysis} />

        </div>
      }


        <Modal
            visible={this.state.helpModal }
              width={isM() ? '80%' : '70%'}
              height={isM() ? '80%' : '60%'}
            onClickAway={() => {
              this.setState({helpModal: false});
            }}
        >
          <div style={{ overflowY: 'scroll',height: '100%'}}>
            <div style={sm([ styles.pad20])}>

            <p style={sm([ styles.textBold, styles.textCenter, styles.marTop40, styles.fs25  ])}>Help</p>
            <p style={sm([  ])}>{ Config.DUCM[currentIndex-1] ? Config.DUCM[currentIndex-1].help : ""}</p>

            {Config.DUCM[currentIndex-1]['video'] && this.state.helpModal &&
            <YouTube
              videoId={Config.DUCM[currentIndex-1]['video']}
              opts={{
                height: '300',
                width: '100%',
              }}
            />
            }

            </div>
          </div>
        </Modal>


        </Col>
      </Row>
      </div>
  }

}
