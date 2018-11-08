import React, { Component } from "react";
import FusionCharts from "fusioncharts/core";
import Column2D from "fusioncharts/viz/column2d";
import StackedColumn2D from "fusioncharts/viz/stackedcolumn2d";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/es/fusioncharts.theme.fusion";

import data1 from "./data1.json";
import data2 from "./data2.json";

ReactFC.fcRoot(FusionCharts, Column2D, StackedColumn2D, FusionTheme);

const chart1Configs = {
  type: "column2d",
  width: 700,
  height: 400,
  dataFormat: "json",
  dataSource: data1
};
const chart2Configs = {
  type: "stackedcolumn2d",
  width: 600,
  height: 500,
  dataFormat: "json",
  dataSource: data2
};

class Chart extends Component {
  constructor(props) {
    super(props);
    this.exportChart = this.exportChart.bind(this);
  }

  exportChart(e) {
    FusionCharts.batchExport({
      exportFormat: "pdf"
    });
  }

  render() {
    return (
      <div>
        <ReactFC {...chart1Configs} />
        <ReactFC {...chart2Configs} />
        <center>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={this.exportChart}
          >
            Export both charts as a single PDF
          </button>
        </center>
      </div>
    );
  }
}

export default Chart;
