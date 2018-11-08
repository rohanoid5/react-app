import React, { Component } from "react";
import FusionCharts from "fusioncharts/core";
import Column2D from "fusioncharts/viz/column2d";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/es/fusioncharts.theme.fusion";

import data from "./data.json";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const chartConfigs = {
  type: "column2d",
  width: "600",
  height: "350",
  dataFormat: "json",
  dataSource: data
};

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chart: {},
      currentVal: "medium"
    };

    this.renderComplete = this.renderComplete.bind(this);
    this.radioHandler = this.radioHandler.bind(this);
  }

  renderComplete(chart) {
    this.setState({chart});
  }

  // Handler for radio buttons to change chart size.
  radioHandler(e) {
    switch (e.currentTarget.value) {
      case "small":
        this.state.chart.resizeTo(400, 250);
        break;

      case "medium":
        this.state.chart.resizeTo(600, 350);
        break;

      case "large":
        this.state.chart.resizeTo(700, 400);
        break;
    }
    this.setState({
      currentVal: e.currentTarget.value
    });
  }

  render() {
    return (
      <div>
        <ReactFC {...chartConfigs} onRender={this.renderComplete} />
        <br />
        <center className="chart-radios">
          <span>Choose a dimension:</span>
          <div className="change-type">
            <div>
              <input
                type="radio"
                value="small"
                onChange={this.radioHandler}
                checked={this.state.currentVal === "small"}
              />
              <label>400 x 250</label>
            </div>
            <div>
              <input
                type="radio"
                value="medium"
                onChange={this.radioHandler}
                checked={this.state.currentVal === "medium"}
              />
              <label>600 x 350</label>
            </div>
            <div>
              <input
                type="radio"
                value="large"
                onChange={this.radioHandler}
                checked={this.state.currentVal === "large"}
              />
              <label>700 x 400</label>
            </div>
          </div>
        </center>
      </div>
    );
  }
}

export default Chart;
