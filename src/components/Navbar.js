import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    return (
      <nav className={`navbar navbar-expand-lg navbar-${this.props.mode} bg-${this.props.mode}`}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/" onClick={(e) => e.preventDefault()}>NARAYANA NEWS</a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item me-2">
                <select className="form-select" value={this.props.category} onChange={this.props.onCategoryChange}>
                  <option value="general">General</option>
                  <option value="business">Business</option>
                  <option value="health">Health</option>
                  <option value="science">Science</option>
                  <option value="sports">Sports</option>
                  <option value="technology">Technology</option>
                  <option value="entertainment">Entertainment</option>
                </select>
              </li>
              <li className="nav-item me-2">
                <select className="form-select" value={this.props.country} onChange={this.props.onCountryChange}>
                  <option value="us">United States</option>
                </select>
              </li>
            </ul>

            <form className="d-flex me-3">
              <input
                className="form-control"
                type="search"
                value={this.props.searchQuery}
                onChange={this.props.onSearchChange}
                placeholder="Search"
              />
            </form>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={this.props.toggleMode}
                checked={this.props.mode === 'dark'}
                id="modeSwitch"
              />
              <label className="form-check-label" htmlFor="modeSwitch">
                {this.props.mode === 'dark' ? 'Dark' : 'Light'} Mode
              </label>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
