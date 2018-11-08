import React, { Component } from "react";
import FusionCharts from "fusioncharts/core";
import Column2D from "fusioncharts/viz/column2d";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/es/fusioncharts.theme.fusion";

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
    this.changeBackgroundColor = this.changeBackgroundColor.bind(this);
    this.changeCaptionTextAlignment = this.changeCaptionTextAlignment.bind(
      this
    );
    this.resetChart = this.resetChart.bind(this);
  }

  renderComplete(chart) {
    this.setState({ chart });
  }

  changeBackgroundColor() {
    this.state.chart.setChartAttribute("bgColor", "#efefef");
  }

  changeCaptionTextAlignment() {
    this.state.chart.setChartAttribute("captionAlignment", "left");
  }

  resetChart() {
    this.state.chart.setChartAttribute("bgColor", null);
    this.state.chart.setChartAttribute("captionAlignment", null);
  }

  render() {
    return (
      <div>
        <ReactFC {...chartConfigs} onRender={this.renderComplete} />
        <center>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={this.changeBackgroundColor}
          >
            Change Background
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={this.changeCaptionTextAlignment}
          >
            Change Caption Alignment
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
