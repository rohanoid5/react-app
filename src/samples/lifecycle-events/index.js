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
  height: "85%",
  dataFormat: "json",
  dataSource: data
};

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: [
        "You will see notifications here for the chart lifecycle events"
      ]
    };

    this.beforeDataUpdate = this.beforeDataUpdate.bind(this);
    this.dataUpdated = this.dataUpdated.bind(this);
    this.drawComplete = this.drawComplete.bind(this);
    this.renderComplete = this.renderComplete.bind(this);
  }

  beforeDataUpdate() {
    this.state.message = [<strong>Status: </strong>, " beforeDataUpdate"];
  }

  dataUpdated() {
    let newMessage = this.state.message.slice();
    newMessage.push(", dataUpdated");
    this.setState({
      message: newMessage
    });
  }

  drawComplete() {
    let newMessage = this.state.message.slice();
    newMessage.push(", drawComplete");
    this.setState({
      message: newMessage
    });
  }

  renderComplete() {
    let newMessage = this.state.message.slice();
    newMessage.push(", renderComplete");
    this.setState({
      message: newMessage
    });
  }

  render() {
    return (
      <div>
        <ReactFC
          {...chartConfigs}
          fcEvent-beforeDataUpdate={this.beforeDataUpdate}
          fcEvent-dataUpdated={this.dataUpdated}
          fcEvent-drawComplete={this.drawComplete}
          fcEvent-renderComplete={this.renderComplete}
        />
        <p style={{ padding: "10px", background: "#f5f2f0" }}>
          {this.state.message}
        </p>
      </div>
    );
  }
}

export default Chart;
