import React, { Component } from 'react';
import FusionCharts from 'fusioncharts/core';
import DragColumn2D from 'fusioncharts/viz/dragcolumn2d';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/es/fusioncharts.theme.fusion';

import data from './data.json';

ReactFC.fcRoot(FusionCharts, DragColumn2D, FusionTheme);

const chartConfigs = {
  type: 'dragcolumn2d',
  width: '100%',
  height: '85%',
  dataFormat: 'json',
  dataSource: data
};

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Drag any column for years 2017 or 2018 to see updated value along with the label',
    };

    this.dataplotDragEnd = this.dataplotDragEnd.bind(this);
  }

  dataplotDragEnd(eventObj, dataObj) {
    var prevValue = FusionCharts.formatNumber(dataObj.startValue.toFixed(2));
    var curValue = FusionCharts.formatNumber(dataObj.endValue.toFixed(2));
    this.setState({
      message: [<strong>{eventObj.data.datasetName}</strong>, " is modified to ", <strong>{'$' + curValue + 'M'}</strong>, " from ", <strong>{'$' + prevValue + 'M'}</strong>]
    });
  }

  render () {
    return (
      <div>
        <ReactFC {...chartConfigs} fcEvent-dataplotDragEnd={this.dataplotDragEnd}/>
        <p style={{ padding: '10px', background: '#f5f2f0' }}>{this.state.message}</p>
      </div>
    )
  }
}

export default Chart;