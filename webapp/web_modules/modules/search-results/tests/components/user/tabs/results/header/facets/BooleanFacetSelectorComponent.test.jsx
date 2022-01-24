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
import BooleanFacetSelectorComponent from '../../../../../../../src/components/user/tabs/results/header/facets/BooleanFacetSelectorComponent'
import FacetSelectorComponent from '../../../../../../../src/components/user/tabs/results/header/facets/FacetSelectorComponent'
import styles from '../../../../../../../src/styles'
import { attributes } from '../../../../../../dumps/attributes.dump'
import resultsDump from '../../../../../../dumps/results.dump'

const context = buildTestContext(styles)

/**
 * Test BooleanFacetSelectorComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing BooleanFacetSelectorComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(BooleanFacetSelectorComponent)
  })
  it('should render correctly', () => {
    const props = {
      facet: {
        facetLabels: { en: 'EN3', fr: 'FR3' },
        attribute: attributes[1],
        model: resultsDump.facets[3],
      },
      onSelectFacetValue: () => { },
    }
    const enzymeWrapper = shallow(<BooleanFacetSelectorComponent {...props} />, { context })
    const wrapperInstance = enzymeWrapper.instance()
    const innerSelector = enzymeWrapper.find(FacetSelectorComponent)
    assert.lengthOf(innerSelector, 1)
    testSuiteHelpers.assertWrapperProperties(innerSelector, {
      facet: props.facet,
      facetValueFormatter: wrapperInstance.formatFacetValue,
      onSelectFacetValue: wrapperInstance.onSelectFacetValue,
    })
  })
})
