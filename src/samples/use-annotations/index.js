import React, { Component } from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import data from './data.json';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const chartConfigs = {
  type: 'spline',
  width: '100%',
  height: '100%',
  dataFormat: 'json',
  dataSource: data
};

class Chart extends Component {
  render() {
    return <ReactFC {...chartConfigs} />;
  }
}

export default Chart;
