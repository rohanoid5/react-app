import React, { Component } from "react";
import FusionCharts from "fusioncharts/core";
import Column2D from "fusioncharts/viz/column2d";
import Bar2D from "fusioncharts/viz/bar2d";
import Pie2D from "fusioncharts/viz/pie2d";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/es/fusioncharts.theme.fusion";

import data from "./data.json";

ReactFC.fcRoot(FusionCharts, Column2D, Bar2D, Pie2D, FusionTheme);

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
      chart: {},
      currentVal: "column2d"
    };

    this.renderComplete = this.renderComplete.bind(this);
    this.radioHandler = this.radioHandler.bind(this);
  }

  renderComplete(chart) {
    this.setState({ chart });
  }

  radioHandler(e) {
    this.state.chart.chartType(e.currentTarget.value);
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
          <span>Choose a chart type:</span>
          <div className="change-type">
            <div>
              <input
                type="radio"
                value="column2d"
                onChange={this.radioHandler}
                checked={this.state.currentVal === "column2d"}
              />
              <label>Column 2D Chart</label>
            </div>
            <div>
              <input
                type="radio"
                value="bar2d"
                onChange={this.radioHandler}
                checked={this.state.currentVal === "bar2d"}
              />
              <label>Bar 2D Chart</label>
            </div>
            <div>
              <input
                type="radio"
                value="pie2d"
                onChange={this.radioHandler}
                checked={this.state.currentVal === "pie2d"}
              />
              <label>Pie 2D Chart</label>
            </div>
          </div>
        </center>
      </div>
    );
  }
}

export default Chart;
