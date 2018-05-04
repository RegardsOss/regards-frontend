/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 **/

import AcceptAccountActions from './account/AcceptAccountActions'
import getAcceptAccountReducer from './account/AcceptAccountReducer'
import getAcceptAccountSelectors from './account/AcceptAccountSelectors'
import AccountActions from './account/AccountActions'
import getAccountReducer from './account/AccountReducer'
import getAccountSelectors from './account/AccountSelectors'
import AccountWaitingActions from './account/AccountWaitingActions'
import getAccountWaitingReducer from './account/AccountWaitingReducer'
import getAccountWaitingSelectors from './account/AccountWaitingSelectors'
import EnableAccountActions from './account/EnableAccountActions'
import getEnableAccountReducer from './account/EnableAccountReducer'
import getEnableAccountSelectors from './account/EnableAccountSelectors'
import RefuseAccountActions from './account/RefuseAccountActions'
import getRefuseAccountReducer from './account/RefuseAccountReducer'
import getRefuseAccountSelectors from './account/RefuseAccountSelectors'

/**
 * Admin instance actions/reducers/selectors.
 */
module.exports = {
  AcceptAccountActions,
  getAcceptAccountReducer,
  getAcceptAccountSelectors,
  AccountActions,
  getAccountReducer,
  getAccountSelectors,
  AccountWaitingActions,
  getAccountWaitingReducer,
  getAccountWaitingSelectors,
  EnableAccountActions,
  getEnableAccountReducer,
  getEnableAccountSelectors,
  RefuseAccountActions,
  getRefuseAccountReducer,
  getRefuseAccountSelectors,
}
