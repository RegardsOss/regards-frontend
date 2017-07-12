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
 */
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { AIPStatus, aipStates, aipDataTypes } from '@regardsoss/model'
import AIPStatusActions from '../../src/model/AIPStatusActions'
import AIPStatusReducers from '../../src/model/AIPStatusReducers'
import AIPStatusSelectors from '../../src/model/AIPStatusSelectors'

const backendServerResultList = {
  content: [{
    content: {
      id: 1,
      ipId: 'ip_idX',
      sipId: 'sip_spaceX_01',
      type: aipDataTypes[0],
      state: aipStates[0],
      date: '1997-07-16T19:20+01:00',
      comment: 'I am the spaceX program, I have nothing to do here =)',
    },
    links: [],
  }],
  metadata: {
    number: '0',
    size: '100',
    totalElements: 1,
  },
  links: [],
}
// URL options and parameters
const options = {}

const entityTester = new ReduxEntityTester(AIPStatusActions, AIPStatusReducers, AIPStatusSelectors, PropTypes.objectOf(AIPStatus).isRequired, backendServerResultList, options)

describe('[ARCHIVAL STORAGE AIP STATUS] Testing model AIPStatus', () => {
  before(() => {
    entityTester.beforeAll()
  })
  after(() => {
    entityTester.afterAll()
  })
  it('should retrieve the list of items, reduce it, and store it within the store.', (done) => {
    entityTester.runTests(done)
  })
})
