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

    this.state = chartConfigs;

    this.updateData = this.updateData.bind(this);
  }

  getRandomNumber() {
    var max = 290,
      min = 30;
    return Math.round((max - min) * Math.random() + min);
  }

  updateData() {
    const prevDs = Object.assign({}, this.state.dataSource);
    prevDs.data[2].value = this.getRandomNumber();
    prevDs.data[3].value = this.getRandomNumber();
    this.setState({
      dataSource: prevDs
    });
  }

  render() {
    return (
      <div>
        <ReactFC {...this.state} />
        <center>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={this.updateData}
          >
            Change Chart Data
          </button>
        </center>
      </div>
    );
  }
}

export default Chart;
