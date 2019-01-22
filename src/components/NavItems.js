import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: this.props.config,
      index: this.props.index,
      activePath: this.props.activePath
    };
  }
  render() {
    return (
      <NavLink
        className="nav-item"
        activeClassName="selected"
        to={this.state.config.sampleRouteMapping[this.state.index]}
        onClick={() => this.props.tabClicked(this.state.index)}
        isActive={(match, location) =>
          this.props.checkActiveTab(match, location, this.state.index)
        }
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="h5">
            {this.state.config.sampleProps[this.state.index].title}
          </div>
          <div
            className={
              this.state.activePath === Number(this.state.index)
                ? 'h5 badge badge-normal'
                : 'h5 badge badge-normal'
            }
          >
            {this.state.config.sampleProps[this.state.index].type ===
            'FusionTime'
              ? this.state.config.sampleProps[this.state.index].type
              : null}
          </div>
        </div>
        <div className="p item-desc">
          {this.state.config.sampleProps[this.state.index].desc}
        </div>
      </NavLink>
    );
  }
}

export default NavItems;
