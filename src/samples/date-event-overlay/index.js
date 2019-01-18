import React, { Component } from 'react';
// Import fusioncharts.js files from fusioncharts module
import FusionCharts from 'fusioncharts';
// Import the timeseries file from fusioncharts module
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';
// Import ReactFusioncharts from react-fusioncharts module
// import ReactFC from 'react-fusioncharts';
import ReactFC from 'react-fusioncharts';

// Add core FusionCharts module and TimeSeries module as dependecies in react-fusioncharts
ReactFC.fcRoot(FusionCharts, TimeSeries);

const jsonify = res => res.json();
// This is the remote url to fetch the data.
const dataFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/date-range-event-overlay-data.json'
).then(jsonify);
// This is the remote url to fetch the schema.
const schemaFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/date-range-event-overlay-schema.json'
).then(jsonify);

class DateEventOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Here timeseriesDs is the configuration object which we will pass as a prop to our ReactFC component.
      timeseriesDs: {
        type: 'timeseries',
        renderAt: 'container',
        width: '100%',
        height: '100%',
        dataSource: {
          caption: {
            text: 'Interest Rate Analysis'
          },
          subCaption: {
            text: 'Federal Reserve (USA)'
          },
          yAxis: [
            {
              plot: 'Interest Rate',
              format: {
                suffix: '%'
              },
              title: 'Interest Rate'
            }
          ],
          xAxis: {
            plot: 'Time',
            timemarker: [
              {
                start: 'Jul-1981',
                end: 'Nov-1982',
                label:
                  'Economic downturn was triggered by {br} tight monetary policy in an effort to {br} fight mounting inflation.',
                timeFormat: '%b-%Y'
              },
              {
                start: 'Jul-1990',
                end: 'Mar-1991',
                label:
                  'This eight month recession period {br} was characterized by a sluggish employment recovery, {br} most commonly referred to as a jobless recovery.',
                timeFormat: '%b-%Y'
              },
              {
                start: 'Jun-2004',
                end: 'Jul-2006',
                label:
                  'The Fed after raising interest rates {br} at 17 consecutive meetings, ends its campaign {br} to slow the economy and forestall inflation.',
                timeFormat: '%b-%Y'
              },
              {
                start: 'Dec-2007',
                end: 'Jun-2009',
                label:
                  'Recession caused by the worst {br} collapse of financial system in recent {br} times.',
                timeFormat: '%b-%Y'
              }
            ]
          },
          // Initially data is set as null
          data: null
        }
      }
    };

    // In this method we will create our DataStore and using that we will create a custom DataTable which takes two
    // parameters, one is data another is schema. Check the method definition to get more info.
    this.createDataTable = this.createDataTable.bind(this);
  }

  createDataTable() {
    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      // First we are creating a DataStore
      const fusionDataStore = new FusionCharts.DataStore();
      // After that we are creating a DataTable by passing our data and schema as arguments
      const fusionTable = fusionDataStore.createDataTable(data, schema);
      // Afet that we simply mutated our timeseries datasource by attaching the above
      // DataTable into its data property.
      const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
      timeseriesDs.dataSource.data = fusionTable;
      this.setState({
        timeseriesDs
      });
    });
  }

  // We are creating the DataTable immidietly after the component is mounted
  componentDidMount() {
    this.createDataTable();
  }

  render() {
    return (
      <div className="App">
        <ReactFC {...this.state.timeseriesDs} />
      </div>
    );
  }
}

export default DateEventOverlay;
