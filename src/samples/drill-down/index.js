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
  dataFormat: 'json',
  dataSource: data
};
const alterChart = chart => {
  chart.configureLink(
    {
      type: 'pie2d',
      width: '500',
      overlayButton: {
        message: 'Back',
        fontColor: '880000',
        bgColor: 'FFEEEE',
        borderColor: '660000'
      }
    },
    0
  );
};

class Chart extends Component {
  render() {
    return <ReactFC {...chartConfigs} onRender={alterChart} />;
  }
}

export default Chart;
