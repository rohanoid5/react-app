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
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/single-event-overlay-data.json'
).then(jsonify);
// This is the remote url to fetch the schema.
const schemaFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/single-event-overlay-schema.json'
).then(jsonify);

class SingleEventOverlay extends Component {
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
                start: 'Mar-1980',
                label: 'US inflation peaked at 14.8%.',
                timeFormat: '%b-%Y',
                style: {
                  marker: {
                    fill: '#D0D6F4'
                  }
                }
              },
              {
                start: 'May-1981',
                label:
                  'To control inflation, the Fed started {br} raising interest rates to over {br} 20%.',
                timeFormat: '%b-%Y'
              },
              {
                start: 'Jun-1983',
                label:
                  'By proactive actions of Mr.Volcker, {br} the inflation falls to 2.4% {br} from the peak of over 14% {br} just three years ago.',
                timeFormat: '%b-%Y',
                style: {
                  marker: {
                    fill: '#D0D6F4'
                  }
                }
              },
              {
                start: 'Oct-1987',
                label:
                  'The Dow Jones Industrial Average lost {br} about 30% of it’s value.',
                timeFormat: '%b-%Y',
                style: {
                  marker: {
                    fill: '#FBEFCC'
                  }
                }
              },
              {
                start: 'Jan-1989',
                label:
                  'George H.W. Bush becomes {br} the 41st president of US!',
                timeFormat: '%b-%Y'
              },
              {
                start: 'Aug-1990',
                label:
                  'The oil prices spiked to $35 {br} per barrel from $15 per barrel {br} because of the Gulf War.',
                timeFormat: '%b-%Y'
              },
              {
                start: 'Dec-1996',
                label:
                  'Alan Greenspan warns of the dangers {br} of "irrational exuberance" in financial markets, {br} an admonition that goes unheeded',
                timeFormat: '%b-%Y'
              },
              {
                start: 'Sep-2008',
                label: 'Lehman Brothers collapsed!',
                timeFormat: '%b-%Y'
              },
              {
                start: 'Mar-2009',
                label:
                  'The net worth of US households {br} stood at a trough of $55 trillion.',
                timeFormat: '%b-%Y',
                style: {
                  marker: {
                    fill: '#FBEFCC'
                  }
                }
              },
              {
                start: 'Oct-2009',
                label: 'Unemployment rate peaked {br} in given times to 10%.',
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

export default SingleEventOverlay;
