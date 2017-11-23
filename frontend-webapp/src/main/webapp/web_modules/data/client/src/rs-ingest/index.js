/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import ProcessingChainActions from './processingChain/ProcessingChainActions'
import ProcessingChainReducer from './processingChain/ProcessingChainReducer'
import ProcessingChainSelectors from './processingChain/ProcessingChainSelectors'
import SIPActions from './sip/SIPActions'
import getSIPReducer from './sip/SIPReducer'
import getSIPSelectors from './sip/SIPSelectors'
import SIPImportActions from './sipImport/SIPImportActions'
import getSIPImportReducer from './sipImport/SIPImportReducer'
import getSIPImportSelectors from './sipImport/SIPImportSelectors'
import SessionActions from './session/SessionActions'
import getSessionReducer from './session/SessionReducer'
import getSessionSelectors from './session/SessionSelectors'

export default {
  ProcessingChainActions,
  ProcessingChainReducer,
  ProcessingChainSelectors,
  SIPActions,
  getSIPReducer,
  getSIPSelectors,
  SIPImportActions,
  getSIPImportReducer,
  getSIPImportSelectors,
  SessionActions,
  getSessionReducer,
  getSessionSelectors,
}
