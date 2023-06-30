/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import size from 'lodash/size'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import MenuItem from 'material-ui/MenuItem'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import FacetSelectorComponent from '../../../../../../../src/components/user/tabs/results/header/facets/FacetSelectorComponent'
import styles from '../../../../../../../src/styles'
import { attributes } from '../../../../../../dumps/attributes.dump'
import resultsDump from '../../../../../../dumps/results.dump'

const context = buildTestContext(styles)

/**
 * Test FacetSelectorComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing FacetSelectorComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FacetSelectorComponent)
  })
  it('should render correctly without elements not covered by facets', () => {
    const noOtherFacet = resultsDump.facets[2]
    const props = {
      facet: {
        facetLabels: { en: 'EN', fr: 'FR' },
        attribute: attributes[1],
        model: noOtherFacet,
      },
      facetValueFormatter: () => '',
      onSelectFacetValue: () => { },
    }

    const enzymeWrapper = shallow(<FacetSelectorComponent {...props} />, { context })
    // verify there is one item per facet value
    assert.equal(enzymeWrapper.find(MenuItem).length, size(noOtherFacet.values), 'There should be one item for each facet value')
    // verify that label is resolved from facet label
    const savedLocale = context.intl.locale
    context.intl.locale = 'en'
    assert.equal(enzymeWrapper.instance().getLabel(), 'EN')
    context.intl.locale = 'fr'
    assert.equal(enzymeWrapper.instance().getLabel(), 'FR')
    context.intl.locale = savedLocale
  })
  it('should render correctly with elements not covered by facets', () => {
    const facetWithOthers = resultsDump.facets[0]
    const props = {
      facet: {
        facetLabels: { en: 'EN', fr: 'FR' },
        attribute: attributes[1],
        model: facetWithOthers,
      },
      facetValueFormatter: () => '',
      onSelectFacetValue: () => { },
    }

    const enzymeWrapper = shallow(<FacetSelectorComponent {...props} />, { context })
    // verify there is one item per facet value + 1 for message other
    const allMenuItems = enzymeWrapper.find(MenuItem)
    assert.equal(allMenuItems.length, size(facetWithOthers.values) + 1, 'There should be one item for each facet value plus one for message')

    const messageItem = allMenuItems.findWhere((n) => n.props().disabled)
    assert.lengthOf(messageItem, 1, 'There should be the message item')
    assert.equal(messageItem.props().primaryText, 'search.facets.filter.menu.others.message', 'It should have the right label')
  })
})
