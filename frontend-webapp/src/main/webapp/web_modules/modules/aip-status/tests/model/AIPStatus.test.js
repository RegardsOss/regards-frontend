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
import { StorageShapes } from '@regardsoss/shape'
import { AIP_STATES } from '@regardsoss/domain/archival-storage'
import { ENTITY_TYPES } from '@regardsoss/domain/dam'
import { aipStatusActions, aipStatusReducer, aipStatusSelectors } from '../../src/clients/AIPStatusClient'

const backendServerResultList = {
  content: [{
    content: {
      id: 1,
      ipId: 'ip_idX',
      sipId: 'sip_spaceX_01',
      type: ENTITY_TYPES[0],
      state: AIP_STATES[0],
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

const entityTester = new ReduxEntityTester(aipStatusActions, aipStatusReducer, aipStatusSelectors, StorageShapes.AIPStatusList.isRequired, backendServerResultList, options)

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
