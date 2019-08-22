
import React, { Component } from 'react';
import {BarChart} from 'react-easy-chart';
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

      let { pathname, query } = props.url;
      this.state = { path : pathname, query : query};

  }

  render(){
      return <div className={'mar25'}>
        Reporting Test
        <p>----------</p>

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

        <LineChart width={600} height={300}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="category" type="category" allowDuplicatedCategory={false} />
        <YAxis dataKey="value"/>
        <Tooltip/>
        <Legend />
        {series.map(s => (
          <Line dataKey="value" data={s.data} name={s.name} key={s.name} />
        ))}
      </LineChart>

      </div>;
  }

}
