import React, { Component } from 'react';
import FusionCharts from 'fusioncharts/core';
import Column2D from 'fusioncharts/viz/column2d';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/es/fusioncharts.theme.fusion';
import GammelTheme from 'fusioncharts/themes/es/fusioncharts.theme.gammel';
import CandyTheme from 'fusioncharts/themes/es/fusioncharts.theme.candy';
import ZuneTheme from 'fusioncharts/themes/es/fusioncharts.theme.zune';
import OceanTheme from 'fusioncharts/themes/es/fusioncharts.theme.ocean';
import CarbonTheme from 'fusioncharts/themes/es/fusioncharts.theme.carbon';
import data from './data.json';

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme, GammelTheme, CandyTheme, ZuneTheme, OceanTheme, CarbonTheme);

const chartConfigs = {
  type: 'column2d',
  width: '100%',
  height: '100%',
  dataFormat: 'json',
  dataSource: data
};

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chart: {},
      currentVal: 'fusion'
    };

    this.renderComplete = this.renderComplete.bind(this);
    this.radioHandler = this.radioHandler.bind(this);
  }

  renderComplete(chart) {
    this.setState({ chart });
  }

  // Handler for radio buttons to change chart theme.
  radioHandler(e) {
    this.state.chart.setChartAttribute('theme', e.currentTarget.value);
    this.setState({
      currentVal: e.currentTarget.value
    });
  }

  render() {
    return (
      <div>
        <ReactFC {...chartConfigs} onRender={this.renderComplete} />
        <br />
        <center>
          <span>Choose a theme:</span>
          <div className="change-type">
            <div>
              <input type="radio" value="fusion" onChange={this.radioHandler} checked={this.state.currentVal === 'fusion'} />
              <label>Fusion</label>
            </div>
            <div>
              <input type="radio" value="gammel" onChange={this.radioHandler} checked={this.state.currentVal === 'gammel'} />
              <label>Gammel</label>
            </div>
            <div>
              <input type="radio" value="candy" onChange={this.radioHandler} checked={this.state.currentVal === 'candy'} />
              <label>Candy</label>
            </div>
            <div>
              <input type="radio" value="zune" onChange={this.radioHandler} checked={this.state.currentVal === 'zune'} />
              <label>Zune</label>
            </div>
            <div>
              <input type="radio" value="ocean" onChange={this.radioHandler} checked={this.state.currentVal === 'ocean'} />
              <label>Ocean</label>
            </div>
            <div>
              <input type="radio" value="carbon" onChange={this.radioHandler} checked={this.state.currentVal === 'carbon'} />
              <label>Carbon</label>
            </div>
          </div>
        </center>
      </div>
    );
  }
}

export default Chart;
