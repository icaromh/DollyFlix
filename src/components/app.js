import React, { Component } from 'react';

import SearchBar from '../containers/search_bar';
import SerieList from '../containers/serieList';
import MediaContainer from '../containers/media_container';

import NavBar from './nav_bar';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <MediaContainer />
        <SerieList />
      </div>
    );
  }
}
