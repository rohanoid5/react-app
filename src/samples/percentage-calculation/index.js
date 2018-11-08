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
      actualValue: "Hover on the plot to see the percentage along with the label",
      message: "Hover on the plot to see the value along with the label"
    };

    this.dataplotrollover = this.dataplotrollover.bind(this);
    this.dataplotrollout = this.dataplotrollout.bind(this);
    this.renderComplete = this.renderComplete.bind(this);
  }

  dataplotrollover(eventObj, dataObj) {
    const value = ((dataObj.value / this.state.total) * 100).toFixed(2);
    this.setState({
      message: [
        <strong>{dataObj.categoryLabel}</strong>,
        " is ",
        <strong>{value}</strong>,
        "% of top 8 oil reserve countries"
      ]
    });
  }

  dataplotrollout(eventObj, dataObj) {
    this.setState({
      message: this.state.actualValue
    });
  }

  renderComplete(chart) {
    const chartData = chart.getJSONData();
    this.setState({
      total: chartData.data.reduce((p, c) => p + Number(c.value), 0)
    });
  }

  render() {
    return (
      <div>
        <ReactFC
          {...chartConfigs}
          onRender={this.renderComplete}
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
