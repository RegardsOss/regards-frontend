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
import { PageableInfiniteTableContainer } from '@regardsoss/components'
import IngestProcessingChainListComponent from '../../src/components/IngestProcessingChainListComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test IngestProcessingChainListComponent
* @author Sébastien Binda
*/
describe('[ADMIN INGEST PROCESSING CHAIN MANAGEMENT] Testing IngestProcessingChainListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(IngestProcessingChainListComponent)
  })
  it('should render correctly', () => {
    const props = {
      accessToken: 'toekn',
      fetchPage: () => new Promise(() => { }),
      onDelete: () => new Promise(() => { }),
      onEdit: () => new Promise(() => { }),
      onCreate: () => new Promise(() => { }),
      onBack: () => new Promise(() => { }),
      queryPageSize: 100,
    }
    const enzymeWrapper = shallow(<IngestProcessingChainListComponent {...props} />, { context })
    assert.equal(enzymeWrapper.find(PageableInfiniteTableContainer).length, 1, 'There should be an infinite table rendered')
  })
})
