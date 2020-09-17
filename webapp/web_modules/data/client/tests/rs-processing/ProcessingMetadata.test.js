/**
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
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { CommonShapes } from '@regardsoss/shape'

import ProcessingMetadataActions from '../../src/rs-processing/metadata/ProcessingMetadataActions'
import getProcessingMetadataReducer from '../../src/rs-processing/metadata/ProcessingMetadataReducer'
import getProcessingMetadataSelectors from '../../src/rs-processing/metadata/ProcessingMetadataSelectors'
import dump from './ProcessingMetadata.dump'

/**
 * Test ProcessingMetadata client
 * @author Théo Lasserre
 */
const options = {
}

const actions = new ProcessingMetadataActions('test/action')
const reducer = getProcessingMetadataReducer('test/action')
const selectors = getProcessingMetadataSelectors(['test', 'files'])

const entityTester = new ReduxEntityTester(actions, reducer, selectors, CommonShapes.PluginMetaDataList.isRequired, dump, options)

describe('[ADMIN CLIENT] Test client ProcessingMetadata', () => {
    before(() => {
        entityTester.beforeAll()
    })
    after(() => {
        entityTester.afterAll()
    })
    it('should retrieve the list of items, reduce it, and store it on the store.', (done) => {
        entityTester.runTests(done)    
    })
})