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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ResultsAndFacetsHeaderRow from '../../../../../src/components/user/results/header/ResultsAndFacetsHeaderRow'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test ResultsAndFacetsHeaderRow
* @author Raphaël Mechali
*/
describe('[Search Results] Testing ResultsAndFacetsHeaderRow', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ResultsAndFacetsHeaderRow)
  })
  it('should render correctly loading', () => {
    const props = {
      isFetching: true,
      showFacets: true,
      onSelectFacet: () => { },
      facets: [],
      resultsCount: 22,
    }
    shallow(<ResultsAndFacetsHeaderRow {...props} />, { context })
  })
  it('should render correctly facets', () => {
    const props = {
      isFetching: false,
      showFacets: true,
      onSelectFacet: () => { },
      facets: [],
      resultsCount: 22,
    }
    shallow(<ResultsAndFacetsHeaderRow {...props} />, { context })
  })
})