import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  state = {
    category: 'general',
    country: 'us',
    searchQuery: '',
    mode: 'light'
  };

  handleCategoryChange = (e) => this.setState({ category: e.target.value });
  handleCountryChange = (e) => this.setState({ country: e.target.value });
  handleSearchChange = (e) => this.setState({ searchQuery: e.target.value });
  toggleMode = () => this.setState({ mode: this.state.mode === 'light' ? 'dark' : 'light' });

  render() {
    const { category, country, searchQuery, mode } = this.state;

    return (
      <div className={mode === 'dark' ? 'bg-dark text-light min-vh-100' : 'bg-light text-dark min-vh-100'}>
        <Navbar
          category={category}
          country={country}
          searchQuery={searchQuery}
          onCategoryChange={this.handleCategoryChange}
          onCountryChange={this.handleCountryChange}
          onSearchChange={this.handleSearchChange}
          toggleMode={this.toggleMode}
          mode={mode}
        />
        <News
          key={`${country}-${category}-${searchQuery}-${mode}`}
          pageSize={6}
          category={category}
          country={country}
          searchQuery={searchQuery}
          mode={mode}
        />
      </div>
    );
  }
}
