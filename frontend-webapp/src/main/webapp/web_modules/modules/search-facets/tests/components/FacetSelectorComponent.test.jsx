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
import size from 'lodash/size'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import MenuItem from 'material-ui/MenuItem'
import FacetSelectorComponent from '../../src/components/FacetSelectorComponent'

import styles from '../../src/styles/styles'
import facetsNetworkDump from '../network-dump/search-results-dump'

const aFacetModel = facetsNetworkDump.facets[2]

describe('[SEARCH FACETS] Testing FacetSelectorComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FacetSelectorComponent)
  })
  const context = buildTestContext(styles)

  it('should render properly', () => {
    const props = {
      facet: aFacetModel,
      facetValueFormatterForMenu: () => '',
      facetValueFormatterForFilter: () => '',
      applyFilter: () => { },
    }

    const enzymeWrapper = shallow(<FacetSelectorComponent {...props} />, { context })
    // verify there is one item per facet value
    assert.equal(enzymeWrapper.find(MenuItem).length, size(aFacetModel.values), 'There should be one item for each facet value')
  })
})
