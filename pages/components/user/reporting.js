
import React, { Component } from 'react';
import {BarChart} from 'react-easy-chart';
import {Row , Col,Button, Affix, Table, Divider, Slider, InputNumber, Icon, Carousel, Progress, message ,Tag} from 'antd';
import numeral from 'numeral';
import styles from '../../../styles/styles';

import { sm, isM } from '../../util/util';

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
const series = [
  {name: 'Private', data: [
    {category: 'A', value: Math.random()},
    {category: 'B', value: Math.random()},
    {category: 'C', value: Math.random()}
  ]},
  {name: 'Public', data: [
    {category: 'B', value: Math.random()},
    {category: 'C', value: Math.random()},
    {category: 'D', value: Math.random()}
  ]},
  {name: 'Hybrid', data: [
    {category: 'C', value: Math.random()},
    {category: 'D', value: Math.random()},
    {category: 'E', value: Math.random()}
  ]},
];

export default class extends Component{

  constructor(props){
      super(props);

      this.state = {
        yeardata : props.userData,
        series : []
      }
      // let { pathname, query } = props.url;
      // this.state = { path : pathname, query : query};

  }

  exportChart(asSVG) {

    // A Recharts component is rendered as a div that contains namely an SVG
    // which holds the chart. We can access this SVG by calling upon the first child/
    let chartSVG = ReactDOM.findDOMNode(this.LineChart).children[0];

    if (asSVG) {
        let svgURL = new XMLSerializer().serializeToString(chartSVG);
        let svgBlob = new Blob([svgURL], {type: "image/svg+xml;charset=utf-8"});
        FileSaver.saveAs(svgBlob, this.state.uuid + ".svg");
    } else {
        let svgBlob = new Blob([chartSVG.outerHTML], {type: "text/html;charset=utf-8"});
        FileSaver.saveAs(svgBlob, this.state.uuid + ".html");
    }
}

  convertMoney = (labelValue) => {

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

    ? Math.abs(Number(labelValue)) / 1.0e+9 + "B"
    // Six Zeroes for Millions
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? Math.abs(Number(labelValue)) / 1.0e+6 + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? Math.abs(Number(labelValue)) / 1.0e+3 + "K"

    : Math.abs(Number(labelValue));

}

  componentDidMount(){
    let NData = [];
    let oneyearupfront = 0, oneyearmonthly = 0, oneyearendofcontract = 0;
    for(let i=0; i< this.state.yeardata.length; i++){
        NData[i] = this.state.yeardata[i];
        NData[i].key = i;
        NData[i].itemindex = i;
        NData[i].totalupfront = 0;
        NData[i].totalvalue = 0;
        NData[i].totalendofcontract = 0;

        console.log(' Quantity ', NData[i].costs, this.state.yeardata[i])
        // NData[i].totalupfront = NData[i].costs.upfront;
        // NData[i].totalvalue = NData[i].costs.monthly;
        // NData[i].totalendofcontract = NData[i].costs.endofcontract;
        oneyearupfront += NData[i].costs.upfront;
        oneyearmonthly += NData[i].costs.monthly*(this.state.yeardata[i].initVal);
        oneyearendofcontract += NData[i].costs.endofcontract;
    }
    oneyearmonthly = 12*oneyearmonthly;

    // console.log(" ONE YEAR ",oneyearupfront,oneyearmonthly, oneyearendofcontract);
    let dataseries = [];

    dataseries.push({category: 'Year 0', value: 0 })
    for(let j=0; j<5 ; j++){
      // dataseries.push({category: 'Year '+(j+1), value: oneyearupfront+oneyearmonthly*12*(j+1)+oneyearendofcontract })
      dataseries.push({category: 'Year '+(j+1), value: oneyearupfront+oneyearmonthly*(j+1)+oneyearendofcontract })
    }
    this.setState({ series : [{name: this.props.analysis, data: dataseries}]
    })

  }

  render(){
      return <div className={'mar25'}>

        {/*<BarChart
          axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
          axes
          height={250}
          width={650}
          colorBars
          xType={'time'}
          data={[
            { x: '1-Jan-15', y: 20 },
            { x: '2-Jan-15', y: 10 },
            { x: '3-Jan-15', y: 33 }
          ]}
        />*/}

        <LineChart width={500} height={300} ref={ref=> this.LineChart = ref}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="category" type="category" allowDuplicatedCategory={false} />
        <YAxis dataKey="value"
        tickFormatter={(data)=>{
          // console.log('tick 22', data);
          return numeral(data).format('($0.0a)');
        }}
        // tick={(data)=>{
        //   console.log('tick', data.payload.value);
        //   return <span style={{ background:'#fff', border: '1px solid grey', padding: 5 }}>{(JSON.stringify(data))}</span>
        // }}
        // label={{ value: "YAxis Label" }}
        // label={(data)=>{
        //   return <div style={{ background:'#fff', border: '1px solid grey', padding: 5 }}>{(JSON.stringify(data))}</div>
        // }}
        />
        <Tooltip content={(data)=>{
          // console.log("style tooltip",data.payload[0]);
          if(!data)
          return;

          let tooldata = data? data.payload[0] : {};
          let va = 0;
          if(tooldata && tooldata['payload']){
            va = tooldata['payload'].value;
            va = numeral(va).format('($ 0.00 a)');
          }


          return <div style={{ background:'#fff', border: '1px solid grey', padding: 15 }}>{(va)}</div>
        }}/>
        <Legend />
        {this.state.series.map(s => (
          <Line dataKey="value" data={s.data} name={s.name} key={s.name} stroke="#8884d8" />
        ))}
      </LineChart>


      <div style={sm([ styles.selfCenter, styles.maxWid400, styles.marTop20 ])}>

      <Button type="default" onClick={this.exportChart} size={'large'} icon="graph" style={{ marginRight: 30}}>Export</Button>

      <Button type="primary" href="/user/history" size={'large'} icon="home">Home</Button>
      </div>


      </div>;
  }

}
