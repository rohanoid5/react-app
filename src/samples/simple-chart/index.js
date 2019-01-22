import React, { Component } from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import data from './data.json';

ReactFC.fcRoot(FusionCharts, TimeSeries, Charts, FusionTheme);

const chartConfigs = {
  type: 'column2d',
  width: '100%',
  height: '100%',
  dataFormat: 'json',
  dataSource: data
};

class Chart extends Component {
  componentDidUpdate() {}

  render() {
    return <ReactFC {...chartConfigs} />;
  }
}

export default Chart;
