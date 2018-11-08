import React, { Component } from "react";
import FusionCharts from "fusioncharts/core";
import Pie3D from "fusioncharts/viz/pie3d";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/es/fusioncharts.theme.fusion";

import data from "./data.json";

ReactFC.fcRoot(FusionCharts, Pie3D, FusionTheme);

const chartConfigs = {
  type: "Pie3D",
  width: "100%",
  height: 400,
  dataFormat: "json",
  dataSource: data
};

class Chart extends Component {
  render() {
    return <ReactFC {...chartConfigs} />;
  }
}

export default Chart;
