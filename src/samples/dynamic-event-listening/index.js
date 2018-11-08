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

var defaultMessage = "Click on the plot to see the value along with the label";

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      enabled: false
    };

    this.trackPlotClick = this.trackPlotClick.bind(this);
    this.resetChart = this.resetChart.bind(this);
    this.dataPlotClick = this.dataPlotClick.bind(this);
  }

  trackPlotClick() {
    FusionCharts.addEventListener("dataplotClick", this.dataPlotClick);
    this.setState({
      message: defaultMessage,
      enabled: true
    });
  }

  dataPlotClick(eventObj, dataObj) {
    this.setState({
      message: [
        "You have clicked on plot ",
        <strong>{dataObj.categoryLabel}</strong>,
        " whose value is ",
        <strong>{dataObj.displayValue}</strong>
      ]
    });
  }

  resetChart() {
    FusionCharts.removeEventListener("dataplotClick", this.dataPlotClick);
    this.setState({
      message: "",
      enabled: false
    });
  }

  render() {
    return (
      <div>
        <ReactFC {...chartConfigs} />
        <div style={{ padding: "5px" }} id="message">
          {this.state.message || "Click the below buttons to add an event dynamically to a chart"}
        </div>
        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={this.state.enabled}
          onClick={this.trackPlotClick}
        >
          Add/ listen to data plot click event
        </button>
        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={!this.state.enabled}
          onClick={this.resetChart}
        >
          Remove data plot click event
        </button>
      </div>
    );
  }
}

export default Chart;
