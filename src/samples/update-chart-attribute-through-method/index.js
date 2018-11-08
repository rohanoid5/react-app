import React, { Component } from "react";
import FusionCharts from 'fusioncharts/core';
import Column2D from 'fusioncharts/viz/column2d';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/es/fusioncharts.theme.fusion';

import data from "./data.json";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const chartConfigs = {
  type: "column2d",
  width: "100%",
  height: "80%",
  dataFormat: "json",
  dataSource: data
};

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chart: {}
    };

    this.renderComplete = this.renderComplete.bind(this);
    this.changeCaption = this.changeCaption.bind(this);
    this.changeXAxis = this.changeXAxis.bind(this);
    this.changeYAxis = this.changeYAxis.bind(this);
    this.resetChart = this.resetChart.bind(this);
  }

  renderComplete(chart) {
    this.setState({ chart });
  }

  changeCaption() {
    this.state.chart.setChartAttribute("caption", "CAPTION");
  }

  changeXAxis() {
    this.state.chart.setChartAttribute("xAxisName", "X-AXIS NAME");
  }

  changeYAxis() {
    this.state.chart.setChartAttribute("yAxisName", "Y-AXIS NAME");
  }

  resetChart() {
    Object.keys(chartConfigs.dataSource.chart).map(i => {
      this.state.chart.setChartAttribute(i, chartConfigs.dataSource.chart[i]);
    });
  }

  render() {
    return (
      <div>
        <ReactFC {...chartConfigs} onRender={this.renderComplete} />
        <center>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={this.changeCaption}
          >
            Change Caption To: Caption
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={this.changeXAxis}
          >
            Change X_Axis Name To: X-Axis Name
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={this.changeYAxis}
          >
            Change Y_Axis Name To: Y-Axis Name
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={this.resetChart}
          >
            Reset
          </button>
        </center>
      </div>
    );
  }
}

export default Chart;
