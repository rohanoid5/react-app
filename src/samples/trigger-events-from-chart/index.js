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
      actualValue: "Hover on the plot to see the value along with the label",
      message: "Hover on the plot to see the value along with the label"
    };

    this.dataplotrollover = this.dataplotrollover.bind(this);
    this.dataplotrollout = this.dataplotrollout.bind(this);
  }

  dataplotrollover(eventObj, dataObj) {
    this.setState({
      message: [
        "You are currently hovering over ",
        <strong>{dataObj.categoryLabel}</strong>,
        " whose value is ",
        <strong>{dataObj.displayValue}</strong>
      ]
    });
  }

  dataplotrollout(eventObj, dataObj) {
    this.setState({
      message: this.state.actualValue
    });
  }

  render() {
    return (
      <div>
        <ReactFC
          {...chartConfigs}
          fcEvent-dataplotRollOver={this.dataplotrollover}
          fcEvent-dataplotRollOut={this.dataplotrollout}
        />
        <p style={{ padding: "10px", background: "#f5f2f0" }}>
          {this.state.message}
        </p>
      </div>
    );
  }
}

export default Chart;
