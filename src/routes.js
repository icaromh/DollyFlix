import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/app'
import IndexView from './components/indexView'

import SerieView from './containers/serieView'
import PlayerView from './containers/PlayerView'

export default (
  <Route path="/" component={App} onChange={() => window.scrollTo(0, 0)}>
    <IndexRoute component={IndexView} />
    <Route path="show/:slug" component={SerieView} />
    <Route path="show/:slug/:season/:episode" component={PlayerView} />
    <Route path="search/:slug" component={IndexView} />
  </Route>
)
