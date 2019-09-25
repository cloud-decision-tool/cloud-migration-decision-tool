
import React, { Component } from 'react';
import {Row , Col,Button, Affix, Table, Divider, Slider, InputNumber, Icon, Carousel, Progress, message ,Tag} from 'antd';
import { sm, isM } from '../../util/util';
import styles from '../../../styles/styles';

import Config from '../../util/config';
import Modal from 'react-awesome-modal';
import dbops from '../../util/dbops';
import moment from 'moment';
import Report from './reporting';
// var numeral = require('numeral');
import numeral from 'numeral';
import CloudReview from './../cloud-comparison/cloudReview';

// const OptionBtn = props => <Button type="primary" size={'large'} onClick={props.onUserClicked}
// style={sm([ {minWidth: 300, padding:5, height: 50, backgroundColor: '#e8ecf1', borderColor: '#e8ecf1', color: '#000' }, styles.marRight20, styles.marTop40 ])}>{props.text}</Button>;


const data = Config.FinanceAttr.attrs;
let NData = [];
for(let i=0; i< data.length; i++){

  // console.log("DATA ",data[i].name)
    NData[i] = data[i];
    NData[i].key = i;
    NData[i].itemindex = i;
    NData[i].totalvalue = 0;

    if(NData[i].control)
    {
        NData[i].totalvalue = NData[i].costs.upfront + NData[i].costs.monthly + NData[i].costs.endofcontract;
    }
}

const datapublic = Config.FinanceAttrPublic.attrs;
let NDataPublic = [];
for(let i=0; i< datapublic.length; i++){

  // console.log("DATA ",data[i].name)
    NDataPublic[i] = datapublic[i];
    NDataPublic[i].key = i;
    NDataPublic[i].itemindex = i;
    NDataPublic[i].totalvalue = 0;

    if(NDataPublic[i].control)
    {
        NDataPublic[i].totalvalue = NDataPublic[i].costs.upfront + NDataPublic[i].costs.monthly + NDataPublic[i].costs.endofcontract;
    }
}


class SliderControl extends Component{
  state={
    initVal : this.props.initVal,
    itemindex : this.props.itemindex ? this.props.itemindex : 0,
  };

  componentDidMount(){
    this.setState({ loaded: true})
  }

  render(){
    let {active} = this.state;
    active = this.props.active ? true : false;

    let marks = {};
    marks[this.props.min] = this.props.min;
    marks[this.props.max] = this.props.max;
    if(!this.state.loaded)
    return null;

    return (
      <Slider
        min={this.props.min}
        max={this.props.max}
        onChange={(val)=>{
          this.setState({ initVal: val});
          if(this.props.onSliderChanged)
            this.props.onSliderChanged(this.state.itemindex, val);

        }}
        marks={marks}
        value={this.state.initVal}
        />
    )
  }
}

export default class extends Component{

  constructor(props){
      super(props);

      this.state = {
        choice : -1,
        preset : -1,
        bordered: false,
        loading: false,
        size: 'default',
        categories : props.analysis.toLowerCase() =="private" ? Config.FinanceCategories.categories : Config.FinanceCategoriesPublic.categories,
        title : null,
        showHeader: true,
        pagination:{ position: 'none' },
        analysis: false,
        footer: ()=>{ return <p>
          <Affix offsetBottom={20}>
          <p style={sm( styles.pad20, { background: 'white'})}>
          <Button
            loading={false}
            type="primary"
            style={sm([ styles.bggreen, styles.w200 ])}
            onClick={() => {
              this.setState({ analysis : true });
            }}
          >
            Continue
          </Button>
          </p>
          </Affix>

          </p>},
        rowSelection: {},
        hasData: true,

        tableData : props.analysis.toLowerCase() =="private" ? NData : NDataPublic
      };

      // console.log(" STABLE ",this.state.tableData);

      this.columns = [{
        title: '',
        dataIndex: 'name',
        key: 'name',
        width: 250,
        render: text => <div>
          {text.category? <h4><b>{text.category}</b></h4>: null}
          {text.name? <p>{text.name}</p>: null}
        </div>
      }, {
        title: 'Quantity',
        dataIndex: 'age',
        key: 'age',
        width: 300,
        render: (text, param) => <div>
          {param.control &&
            <SliderControl onSliderChanged={this.updateValue} initVal={param.initVal? param.initVal : 1} itemindex={param.itemindex} min={param.min} max={param.max} />
          }
        </div>
      },
      {
       title: '1 Year',
       dataIndex: 'totalvalue',
       key: 'totalvalue',
       width : 100,
       render: text => <div>
          { text ? '$'+text : ''}
       </div>
      }]
  }

  updateWithPreset = (preset) =>{
    let Tdata = this.state.tableData;
    let TNData = [];
    for(let i=0; i< Tdata.length; i++){
        TNData[i] = data[i];
        TNData[i].initVal = this.state.categories[preset].preset[i];
    }
    console.log(" CCDATA ",TNData);

    this.setState({ tableData : TNData, preset : preset });

  }

  updateValue = (itemindex, val)=>{
    let temp = this.state.tableData;
    let item = temp[itemindex];
    item.totalvalue = item.costs.upfront + item.costs.monthly*val + item.costs.endofcontract;
    item.initVal = val;
    temp[itemindex] = item;
    this.setState({ tableData : temp });
  }

  componentDidMount(){
    this.setState({ loaded : true });
  }

  render(){
    const state = this.state;

    if(!this.state.loaded)
      return null;

    return <Row type="flex" justify="space-around" align="top" style={sm([   ])}>
        <Col sm={24} md={24} lg={24} style={sm([ styles.flexMinHeight ])}>

          <h3 style={sm([ styles.textBold, styles.fs18, styles.textCenter, { marginTop: 5} ])}>Financial Assessment</h3>

          {this.state.preset < 0 &&
            <div>
            <p style={sm([ styles.textBold, styles.mar5, styles.textCenter, styles.marBot20, styles.fs18 ])}>Choose your usage tier</p>
            <Row type="flex" justify="center" align="top" style={sm([   ])}>

              {Config.FinanceCategories.categories.map( (item,index) => {
                return <Col >
                <Tag onClick={()=>{
                  this.updateWithPreset(index);
                }} key={"tag"+index} color={item.color} style={sm([ styles.w150, styles.hauto ])}><span style={sm([ styles.textwhite, styles.textBold, styles.fs18, styles.textCenter, styles.w100p, styles.mar5, styles.displayinline])}>{item.name}</span></Tag>
                </Col>
              })}

            </Row>
            </div>
          }
          {this.state.preset >= 0 && !this.state.analysis && this.props.analysis.toLowerCase() === "public" &&
            <div>
              <p>You were reconmmeneded public cloud so you got nothing!</p>
              <CloudReview />
            </div>
          }
          {this.state.preset >= 0 && !this.state.analysis && this.props.analysis.toLowerCase() === "private" &&
          <Row type="flex" justify="center" align="top" style={sm([   ])}>
          <Col sm={24} md={23} lg={22}>

            <Table {...this.state}
            onRow={(record, index) => {
              return {
                onSliderChanged: (aaa)=>{
                  console.log('test',aaa)
                }
              };
            }}
            pagination={{ pageSize: 30, position: 'none' }}
            // footer={()=>{<div>
            //   <p>testing</p>
            // </div>}}
             rowSelection={null} columns={this.columns} dataSource={state.hasData ? this.state.tableData : null} />

            <br/>
            <br/>
            <br/>
            <br/>

          </Col>
          </Row>
          }

          {this.state.analysis &&
          <Row type="flex" justify="center" align="top" style={sm([   ])}>
          <Col sm={24} md={23} lg={22}>

            <Report analysis={this.props.analysis} userData={this.state.tableData} />

          </Col>
          </Row>
          }

        </Col>
      </Row>
    }
}
