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
import Card from 'material-ui/Card'
import {
  PageableInfiniteTableContainer,
  TableHeaderAutoCompleteFilterContainer,
} from '@regardsoss/components'
import SelectField from 'material-ui/SelectField'
import SourcesComponent from '../../src/components/SourcesComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SourcesComponent
 * @author Théo Lasserre
 */
describe('[ADMIN DASHBOARD MANAGEMENT] Testing SourcesComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SourcesComponent)
  })
  it('should render correctly', () => {
    const props = {
      project: 'any',
      selectedSource: null,
      selectedSession: null,
      onSelected: () => { },
      onApplyFilters: () => { },
      filters: {},
    }
    const enzymeWrapper = shallow(<SourcesComponent {...props} />, { context })
    const cardWrapper = enzymeWrapper.find(Card)
    assert.lengthOf(cardWrapper, 1, 'There should be a Card')

    const tableHeaderFilterWrapper = enzymeWrapper.find(TableHeaderAutoCompleteFilterContainer)
    assert.lengthOf(tableHeaderFilterWrapper, 1, 'There should be a TableHeaderAutoCompleteFilterContainer')

    const selectWrapper = enzymeWrapper.find(SelectField)
    assert.lengthOf(selectWrapper, 1, 'There should be a SelectField')

    const tableWrapper = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(tableWrapper, 1, 'There should be a PageableInfiniteTableContainer')
  })
})
