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
  height: "100%",
  dataFormat: "json",
  dataSource: data
};

class Chart extends Component {
  render() {
    return <ReactFC {...chartConfigs} />;
  }
}

export default Chart;
