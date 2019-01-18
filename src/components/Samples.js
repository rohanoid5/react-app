import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';

import config from '../samples/config.json';

import NavItems from './NavItems';

import SimpleChart from '../samples/simple-chart';
import Pie3DChart from '../samples/3d-pie-chart';
import ColumnLineAreaCombiChart from '../samples/column-line-area-combi-chart';
import FetchDataFromJsonUrl from '../samples/fetch-data-from-json-url';
import FetchDataFromXmlUrl from '../samples/fetch-data-from-xml-url';
import UpdateChartData from '../samples/update-chart-data';
import UpdateChartAttributes from '../samples/update-chart-attributes';
import TriggerEventsFromChart from '../samples/trigger-events-from-chart';
import PercentageCalculation from '../samples/percentage-calculation';
import ClientSideExporting from '../samples/client-side-exporting';
import DrillDown from '../samples/drill-down';
import SimpleGauge from '../samples/simple-gauge';
import SimpleMap from '../samples/simple-map';
import ApplyTheme from '../samples/apply-theme';
import ChangeChartTypeRuntime from '../samples/change-chart-type-runtime';
import UseAnnotations from '../samples/use-annotations';
import LifecycleEvents from '../samples/lifecycle-events';
import SpecialEvents from '../samples/special-events';
import DynamicEventListening from '../samples/dynamic-event-listening';
import SliceDataPlots from '../samples/slice-data-plots';
import ResponsiveCharts from '../samples/responsive-charts';
import UCATM from '../samples/update-chart-attribute-through-method';
import SimpleTimeSeries from '../samples/simple-timeseries';
import MultivariateTimeSeries from '../samples/multivariate-timeseries';
import ColumnChartTimeAxis from '../samples/column-chart-time-axis';
import InteractiveCandlestickChart from '../samples/interactive-candlestick-chart';
import AnnotatingData from '../samples/annotating-data/index.js';
import SingleEventOverlay from '../samples/single-event-overlay/index.js';
import MultiSeriesTimeAxis from '../samples/multi-series-time-axis/index.js';
import AreaTimeAxis from '../samples/area-time-axis/index.js';
import DateEventOverlay from '../samples/date-event-overlay/index.js';
import AddingReferenceLine from '../samples/adding-reference-line/index.js';

var options = {
  tabSize: '4',
  smartIndent: true,
  lineNumbers: true,
  readOnly: true,
  theme: 'dracula',
  mode: 'javascript',
  viewportMargin: Infinity
};

class Samples extends Component {
  constructor(props) {
    super(props);

    var locationArr = window.location.pathname.split('/');
    var paths = Object.values(config.sampleRouteMapping);
    var activePath = paths.findIndex(
      element => element === '/' + locationArr[locationArr.length - 1]
    );
    if (activePath === -1) {
      activePath = 1;
    } else {
      ++activePath;
    }

    this.state = {
      editorText: '',
      activePath: activePath,
      button: 'js',
      showModal: false,
      config: config
    };
  }

  checkActiveTab(match, location, i) {
    if (
      (location.pathname === '/' && parseInt(i) === 1) ||
      (match && match.url === location.pathname)
    ) {
      function makeActive() {
        return true;
      }
      return makeActive;
    }
  }

  tabClicked(index) {
    this.setState({
      activePath: index
    });
  }

  buttonClicked(button) {
    this.setState({
      button: button
    });
  }

  modalToggle(modal, event) {
    var modalEle = document.getElementById('myModal');
    if (
      event &&
      (event.target !== modalEle && !modalEle.contains(event.target))
    ) {
      modal = true;
    }
    this.setState({
      showModal: modal
    });
  }

  toggleFusion() {}

  render() {
    var editorText = '';
    if (this.state.button === 'js') {
      editorText = this.state.config.sampleProps[this.state.activePath].code;
    } else if (this.state.button === 'data') {
      editorText = this.state.config.sampleProps[this.state.activePath].data;
    } else if (this.state.button === 'schema') {
      editorText = this.state.config.sampleProps[this.state.activePath].schema;
    }

    return (
      <BrowserRouter basename="react-fusioncharts-component">
        <div
          className={
            'demo bg-light-purple pt-4 pb-4 chart-' +
            this.state.config.sampleProps[this.state.activePath].directory
          }
        >
          <div className="container container-1200 info-wrapper">
            <div className="row">
              <div className="col-12 d-flex justify-content-center d-md-none">
                <div
                  id="mobileChart-selector"
                  className="base-dropdown chart-selector"
                  onClick={() => this.modalToggle(true)}
                >
                  <div className="selector">
                    {this.state.config.sampleProps[this.state.activePath].title}
                  </div>
                  <div className="placeholder">Quick Demo:</div>
                  <div className="caret">
                    <i className="fc_dropdown" />
                  </div>
                </div>
              </div>
            </div>
            <div
              id="myModal"
              className={'modal'.concat(
                this.state.showModal ? ' sumo' : ' hidden'
              )}
              onClick={event => this.modalToggle(false, event)}
            >
              <div className="modal-content">
                <div className="nav-list">
                  {Object.keys(this.state.config.sampleProps).map(i => (
                    <NavLink
                      className="nav-item"
                      activeClassName="selected"
                      key={'tab-' + i}
                      to={this.state.config.sampleRouteMapping[i]}
                      onClick={() => this.tabClicked(i)}
                      isActive={(match, location) =>
                        this.checkActiveTab(match, location, i)
                      }
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div className="h5">
                          {this.state.config.sampleProps[i].title}
                        </div>
                        <div className="h5 badge badge-normal">
                          {this.state.config.sampleProps[i].type ===
                          'FusionTime'
                            ? this.state.config.sampleProps[i].type
                            : null}
                        </div>
                      </div>
                      <div className="p item-desc">
                        {this.state.config.sampleProps[i].desc}
                      </div>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="side-nav col-3 d-none d-md-block">
                <div className="nav-heading">Quick Demo:</div>
                <div className="nav-list">
                  {Object.keys(this.state.config.sampleProps).map(i => (
                    <NavItems
                      activePath={this.state.activePath}
                      config={this.state.config}
                      index={i}
                      key={'tab-' + i}
                      tabClicked={() => this.tabClicked(i)}
                      checkActiveTab={(match, location) =>
                        this.checkActiveTab(match, location, i)
                      }
                    />
                  ))}
                </div>
              </div>
              <div className="col-md-9 col-12">
                <div className="card shadow">
                  <div className="card-body chart-wrapper">
                    <div className="chart-wrapper-inner">
                      <Route exact path="/" component={SimpleChart} />
                      <Route path="/simple-chart" component={SimpleChart} />
                      <Route path="/3d-pie-chart" component={Pie3DChart} />
                      <Route
                        path="/column-line-area-combi-chart"
                        component={ColumnLineAreaCombiChart}
                      />
                      <Route
                        path="/fetch-data-from-json-url"
                        component={FetchDataFromJsonUrl}
                      />
                      <Route
                        path="/fetch-data-from-xml-url"
                        component={FetchDataFromXmlUrl}
                      />
                      <Route
                        path="/update-chart-data"
                        component={UpdateChartData}
                      />
                      <Route
                        path="/update-chart-attributes"
                        component={UpdateChartAttributes}
                      />
                      <Route
                        path="/trigger-events-from-chart"
                        component={TriggerEventsFromChart}
                      />
                      <Route
                        path="/percentage-calculation"
                        component={PercentageCalculation}
                      />
                      <Route
                        path="/export-charts"
                        component={ClientSideExporting}
                      />
                      <Route path="/drill-down" component={DrillDown} />
                      <Route path="/simple-gauge" component={SimpleGauge} />
                      <Route path="/world-map" component={SimpleMap} />
                      <Route
                        path="/change-chart-type-runtime"
                        component={ChangeChartTypeRuntime}
                      />
                      <Route
                        path="/use-annotations"
                        component={UseAnnotations}
                      />
                      <Route
                        path="/lifecycle-events"
                        component={LifecycleEvents}
                      />
                      <Route path="/special-events" component={SpecialEvents} />
                      <Route
                        path="/dynamic-event-listening"
                        component={DynamicEventListening}
                      />
                      <Route
                        path="/slice-data-plots"
                        component={SliceDataPlots}
                      />
                      <Route
                        path="/responsive-charts"
                        component={ResponsiveCharts}
                      />
                      <Route
                        path="/update-chart-attribute-through-method"
                        component={UCATM}
                      />
                      <Route path="/apply-theme" component={ApplyTheme} />
                      <Route
                        path="/simple-timeseries"
                        component={SimpleTimeSeries}
                      />
                      <Route
                        path="/multivariate-timeseries"
                        component={MultivariateTimeSeries}
                      />
                      <Route
                        path="/column-chart-time-axis"
                        component={ColumnChartTimeAxis}
                      />
                      <Route
                        path="/interactive-candlestick-chart"
                        component={InteractiveCandlestickChart}
                      />
                      <Route
                        path="/annotating-data"
                        component={AnnotatingData}
                      />
                      <Route
                        path="/single-event-overlay"
                        component={SingleEventOverlay}
                      />
                      <Route
                        path="/multi-series-time-axis"
                        component={MultiSeriesTimeAxis}
                      />
                      <Route
                        path="/column-time-axis"
                        component={ColumnChartTimeAxis}
                      />
                      <Route path="/area-time-axis" component={AreaTimeAxis} />
                      <Route
                        path="/date-event-overlay"
                        component={DateEventOverlay}
                      />
                      <Route
                        path="/adding-reference-line"
                        component={AddingReferenceLine}
                      />
                    </div>
                  </div>
                </div>

                <div className="code-view mt-2">
                  <div
                    className="card-shadow"
                    style={{ background: '#03040B' }}
                  >
                    <div
                      className="code-nav-btns btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        id="js"
                        onClick={() => this.buttonClicked('js')}
                        className={'btn btn-code'.concat(
                          this.state.button === 'js' ? ' selected' : ''
                        )}
                      >
                        JavaScript
                      </button>
                      <button
                        type="button"
                        id="data"
                        onClick={() => this.buttonClicked('data')}
                        className={'btn btn-code'.concat(
                          this.state.button === 'data' ? ' selected' : ''
                        )}
                      >
                        Data
                      </button>
                      {this.state.config.sampleProps[this.state.activePath]
                        .schema ? (
                        <button
                          type="button"
                          id="data"
                          onClick={() => this.buttonClicked('schema')}
                          className={'btn btn-code'.concat(
                            this.state.button === 'schema' ? ' selected' : ''
                          )}
                        >
                          Schema
                        </button>
                      ) : null}
                    </div>
                    <div className="card-body p-0">
                      <div className="code-panel">
                        <div className="code-panel-header">
                          <div id="chartCode">
                            <CodeMirror value={editorText} options={options} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Samples;
