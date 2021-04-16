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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { PANE_TYPES_ENUM } from '../../src/domain/PaneTypes'
import RequestManagerComponent from '../../src/components/RequestManagerComponent'
import { RequestManagerContainer } from '../../src/containers/RequestManagerContainer'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test RequestManagerContainer
 * @author Théo Lasserre
 */
describe('[ADMIN FEATURE MANAGEMENT] Testing RequestManagerContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RequestManagerContainer)
  })
  it('should render correctly', () => {
    const props = {
      filters: {},
      params: {
        project: 'any',
      },
      paneType: PANE_TYPES_ENUM.REFERENCES,
      onApplyFilters: () => { },
      fetchRequests: () => { },
      clearSelection: () => { },
      deleteRequests: () => { },
      retryRequests: () => { },
      meta: {
        number: 0,
      },
      tableSelection: [],
    }
    const enzymeWrapper = shallow(<RequestManagerContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(RequestManagerComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      filters: props.filters,
      onApplyFilters: props.onApplyFilters,
      onRefresh: enzymeWrapper.instance().onRefresh,
      project: props.params.project,
      deleteRequests: props.deleteRequests,
      retryRequests: props.retryRequests,
      tableSelection: props.tableSelection,
    }, 'Component should define the expected properties')
  })
})
