/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import IngestProcessingChainListComponent from '../../src/components/IngestProcessingChainListComponent'
import { IngestProcessingChainListContainer } from '../../src/containers/IngestProcessingChainListContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test  IngestProcessingChainListContainer
* @author Sébastien Binda
*/
describe('[ADMIN INGEST PROCESSING CHAIN MANAGEMENT] Testing  IngestProcessingChainListContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(IngestProcessingChainListContainer)
  })
  it('should render correctly', () => {
    const props = {
      params: {
        project: 'project',
      },
      accessToken: 'token',
      deleteChain: () => new Promise(() => { }),
      fetchPage: () => new Promise(() => { }),
    }
    const enzymeWrapper = shallow(<IngestProcessingChainListContainer {...props} />, { context })
    assert.equal(enzymeWrapper.find(IngestProcessingChainListComponent).length, 1, 'The IngestProcessingChainListComponent should be rendered')
  })
})
