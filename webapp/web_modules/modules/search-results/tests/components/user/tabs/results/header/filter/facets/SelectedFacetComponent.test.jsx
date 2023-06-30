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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { CatalogDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SelectedFacetComponent from '../../../../../../../../src/components/user/tabs/results/header/filter/facets/SelectedFacetComponent'
import ApplyingCriterionComponent from '../../../../../../../../src/components/user/tabs/results/header/filter/ApplyingCriterionComponent'
import styles from '../../../../../../../../src/styles'
import { attributes } from '../../../../../../../dumps/attributes.dump'
import resultsDump from '../../../../../../../dumps/results.dump'

const context = buildTestContext(styles)

/**
 * Test SelectedFacetComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing SelectedFacetComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SelectedFacetComponent)
  })
  it('should render correctly', () => {
    const props = {
      label: 'my.custom.label',
      selectedFacetValue: {
        facetType: CatalogDomain.FACET_TYPES_ENUM.BOOLEAN,
        facetValue: resultsDump.facets[3].values[0].value,
        facetLabels: { en: 'EN3', fr: 'FR3' },
        attribute: attributes[1],
        requestParameters: {},
      },
      onUnselectFacetValue: () => {},
    }
    const wrapper = shallow(<SelectedFacetComponent {...props} />, { context })
    const delegateWrapper = wrapper.find(ApplyingCriterionComponent)
    assert.lengthOf(delegateWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(delegateWrapper, {
      label: props.label,
      selectedCriterion: props.selectedFacetValue,
      onUnselectCriterion: props.onUnselectFacetValue,
    })
  })
})
