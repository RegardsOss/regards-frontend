/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import FacetSelectorComponent from '../../../../../src/components/user/results/facets/FacetSelectorComponent'

import styles from '../../../../../src/styles/styles'
import facetsNetworkDump from '../../../../dumps/results.dump'

describe('[SEARCH FACETS] Testing FacetSelectorComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FacetSelectorComponent)
  })
  const context = buildTestContext(styles)

  it('should render correctly without elements not covered by facets', () => {
    const noOtherFacet = facetsNetworkDump.facets[2]
    const props = {
      facet: noOtherFacet,
      facetValueFormatterForMenu: () => '',
      facetValueFormatterForFilter: () => '',
      onSelectFacet: () => { },
    }

    const enzymeWrapper = shallow(<FacetSelectorComponent {...props} />, { context })
    // verify there is one item per facet value
    assert.equal(enzymeWrapper.find(MenuItem).length, size(noOtherFacet.values), 'There should be one item for each facet value')
  })
  it('should render correctly with elements not covered by facets', () => {
    const facetWithOthers = facetsNetworkDump.facets[0]
    const props = {
      facet: facetWithOthers,
      facetValueFormatterForMenu: () => '',
      facetValueFormatterForFilter: () => '',
      onSelectFacet: () => { },
    }

    const enzymeWrapper = shallow(<FacetSelectorComponent {...props} />, { context })
    // verify there is one item per facet value + 1 for message other
    const allMenuItems = enzymeWrapper.find(MenuItem)
    assert.equal(allMenuItems.length, size(facetWithOthers.values) + 1, 'There should be one item for each facet value plus one for message')

    const messageItem = allMenuItems.findWhere(n => n.props().disabled)
    assert.lengthOf(messageItem, 1, 'There should be the message item')
    assert.equal(messageItem.props().primaryText, 'search.facets.filter.menu.others.message', 'It should have the right label')
  })
})
