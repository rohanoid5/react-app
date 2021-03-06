import React, { Component } from 'react';
import FusionCharts from 'fusioncharts';
import Maps from 'fusioncharts/fusioncharts.maps';
import World from 'fusioncharts/maps/fusioncharts.world';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import data from './data.json';

ReactFC.fcRoot(FusionCharts, Maps, World, FusionTheme);

const chartConfigs = {
  type: 'world',
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
