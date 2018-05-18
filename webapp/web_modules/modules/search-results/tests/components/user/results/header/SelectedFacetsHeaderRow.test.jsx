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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ShowableAtRender } from '@regardsoss/components'
import SelectedFacetsHeaderRow from '../../../../../src/components/user/results/header/SelectedFacetsHeaderRow'
import SelectedFacetComponent from '../../../../../src/components/user/results/facets/SelectedFacetComponent'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test SelectedFacetsHeaderRow
* @author Raphaël Mechali
*/
describe('[Search Results] Testing SelectedFacetsHeaderRow', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SelectedFacetsHeaderRow)
  })
  it('should render hidden when not showing facets', () => {
    const props = {
      showingFacettes: false,
      filters: [],
      onDeleteFilter: () => { },
    }
    const enzymeWrapper = shallow(<SelectedFacetsHeaderRow {...props} />, { context })
    const showableWrapper = enzymeWrapper.find(ShowableAtRender)
    assert.isFalse(showableWrapper.props().show)
  })
  it('should render hidden without selected facets', () => {
    const props = {
      showingFacettes: true,
      filters: [],
      onDeleteFilter: () => { },
    }
    const enzymeWrapper = shallow(<SelectedFacetsHeaderRow {...props} />, { context })
    const showableWrapper = enzymeWrapper.find(ShowableAtRender)
    assert.isFalse(showableWrapper.props().show)
  })
  it('should render with selected  facets', () => {
    const props = {
      showingFacettes: true,
      filters: [{
        filterKey: '1',
        filterLabel: 'F1',
        openSearchQuery: 'idk1',
      }, {
        filterKey: '2',
        filterLabel: 'F2',
        openSearchQuery: 'idk2',
      }],
      onDeleteFilter: () => { },
    }
    const enzymeWrapper = shallow(<SelectedFacetsHeaderRow {...props} />, { context })
    const showableWrapper = enzymeWrapper.find(ShowableAtRender)
    assert.isTrue(showableWrapper.props().show, 'selected facets should be displayed')
    assert.lengthOf(enzymeWrapper.find(SelectedFacetComponent), 2, 'There should be the rendered components')
  })
})
