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
 */
import Chip from 'material-ui/Chip'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import SelectedFacetComponent from '../../../../../../src/components/user/results/facets/selected/SelectedFacetComponent'
import styles from '../../../../../../src/styles/styles'
import resultsDump from '../../../../../dumps/results.dump'

describe('[Search Results] Testing SelectedFacetComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SelectedFacetComponent)
  })
  const context = buildTestContext(styles)

  it('should render properly', () => {
    let spiedDeletedFacet = null
    const props = {
      label: 'my.custom.label',
      selectedFacet: {
        label: { en: 'EN0', fr: 'FR0' },
        model: resultsDump.facets[0],
        value: resultsDump.facets[0].values[0],
      },
      onUnselectFacet: (selectedFacet) => {
        spiedDeletedFacet = selectedFacet
      },
    }
    const wrapper = shallow(<SelectedFacetComponent {...props} />, { context })
    const chipWrapper = wrapper.find(Chip)
    assert.lengthOf(chipWrapper, 1)
    assert.include(wrapper.debug(), props.label, 'Label should be display')
    assert.equal(chipWrapper.props().onRequestDelete, wrapper.instance().onUnselect, 'Callback should be correctly reported')
    // test delete callback
    wrapper.instance().onUnselect()
    assert.deepEqual(spiedDeletedFacet, props.selectedFacet, 'Facet shoud be correctly provided when deleting')
  })
})
