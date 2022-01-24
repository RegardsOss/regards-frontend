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
import ReferencesManagerComponent from '../../src/components/ReferencesManagerComponent'
import { ReferencesManagerContainer } from '../../src/containers/ReferencesManagerContainer'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ReferencesManagerContainer
 * @author Théo Lasserre
 */
describe('[ADMIN FEATURE MANAGEMENT] Testing ReferencesManagerContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ReferencesManagerContainer)
  })
  it('should render correctly', () => {
    const props = {
      featureManagerFilters: {},
      params: {
        project: 'any',
      },
      fetchReferences: () => { },
      clearSelection: () => { },
      deleteReferences: () => { },
      notifyReferences: () => { },
      meta: {
        number: 0,
      },
      tableSelection: [],
      selectionMode: 'any',
      areAllSelected: false,
      isFetching: false,
    }
    const enzymeWrapper = shallow(<ReferencesManagerContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(ReferencesManagerComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      featureManagerFilters: props.featureManagerFilters,
      onRefresh: enzymeWrapper.instance().onRefresh,
      deleteReferences: props.deleteReferences,
      notifyReferences: props.notifyReferences,
      tableSelection: props.tableSelection,
      selectionMode: props.selectionMode,
      areAllSelected: props.areAllSelected,
      isFetching: props.isFetching,
    }, 'Component should define the expected properties')
  })
})
