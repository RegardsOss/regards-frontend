/*
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 */
import * as ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { configureStore } from '@regardsoss/store'
import rootReducer from './rootReducer'
import rootRouter from './rootRouter'
import './cdppResources'

/**
 * Main entry point for js application.
 *
 * @author Sébastien Binda
 */

// import global resources
require('../resources/logo_regards_blue_black.png')
require('../resources/logo_regards_blue_white.png')
require('../resources/logo_regards_grey_black.png')
require('../resources/logo_regards_grey_white.png')

// import static configuration parameters
if (process.env.NODE_ENV === 'production') {
  require('@regardsoss/webpack-config-front/src/conf/staticConfiguration')
} else {
  require('@regardsoss/webpack-config-front/src/conf/staticConfiguration.dev')
}

const store = configureStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={rootRouter} />
  </Provider>,
  document.getElementById('app'),
)
