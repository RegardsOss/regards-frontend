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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import NumberRangeFacetSelectorComponent from '../../src/components/NumberRangeFacetSelectorComponent'
import FacetSelectorComponent from '../../src/components/FacetSelectorComponent'
import styles from '../../src/styles/styles'

import facetsNetworkDump from '../network-dump/search-results-dump'

const aFacetModel = facetsNetworkDump.facets[2]

describe('[SEARCH FACETS] Testing NumberRangeFacetSelectorComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NumberRangeFacetSelectorComponent)
  })
  const context = buildTestContext(styles)

  it('should render properly', () => {
    const props = {
      facet: aFacetModel,
      applyFilter: () => { },
    }
    const enzymeWrapper = shallow(<NumberRangeFacetSelectorComponent {...props} />, { context })
    // We assert here that the rendering is correctly delegated to FacetSelectorComponent
    assert.equal(enzymeWrapper.find(FacetSelectorComponent).length, 1, 'Rendering should be delegated to RangeFacetSelectorComponent')
  })
})
