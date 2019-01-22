import React, { Component } from 'react';
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import data from './data.json';

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const chartConfigs = {
  type: 'column2d',
  width: '100%',
  height: '100%',
  dataFormat: 'jsonurl',
  dataSource: './data/data.json'
};

class Chart extends Component {
  render() {
    return <ReactFC {...chartConfigs} />;
  }
}

export default Chart;
