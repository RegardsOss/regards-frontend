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
import Chip from 'material-ui/Chip'
import { CatalogDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ApplyingCriterionComponent from '../../../../../../src/components/user/results/header/filter/ApplyingCriterionComponent'
import styles from '../../../../../../src/styles'
import { attributes } from '../../../../../dumps/attributes.dump'
import resultsDump from '../../../../../dumps/results.dump'

const context = buildTestContext(styles)

/**
 * Test ApplyingCriterionComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ApplyingCriterionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ApplyingCriterionComponent)
  })
  it('should render correctly with a selected facet value', () => {
    let spiedDeletedCrit = null
    const props = {
      label: 'my.custom.label1',
      selectedCriterion: {
        facetType: CatalogDomain.FACET_TYPES_ENUM.BOOLEAN,
        facetValue: resultsDump.facets[3].values[0].value,
        facetLabels: { en: 'EN3', fr: 'FR3' },
        attribute: attributes[1],
        requestParameters: {},
      },
      onUnselectCriterion: (crit) => {
        spiedDeletedCrit = crit
      },
      filterIcon: <div />,
    }
    const enzymeWrapper = shallow(<ApplyingCriterionComponent {...props} />, { context })
    const chipWrapper = enzymeWrapper.find(Chip)
    assert.lengthOf(chipWrapper, 1)
    assert.include(enzymeWrapper.debug(), props.label, 'Label should be display')
    assert.equal(chipWrapper.props().onRequestDelete, enzymeWrapper.instance().onUnselectCriterion, 'Callback should be correctly reported')
    // test delete callback
    enzymeWrapper.instance().onUnselectCriterion()
    assert.deepEqual(spiedDeletedCrit, props.selectedCriterion, 'Criterion shoud be correctly provided when deleting')
  })
  it('should render correctly with an entities selection', () => {
    let spiedDeletedCrit = null
    const props = {
      label: 'my.custom.label1',
      selectedCriterion: {
        entitiesCount: 25,
        requestParameters: {},
      },
      onUnselectCriterion: (crit) => {
        spiedDeletedCrit = crit
      },
      filterIcon: <div />,
    }
    const enzymeWrapper = shallow(<ApplyingCriterionComponent {...props} />, { context })
    const chipWrapper = enzymeWrapper.find(Chip)
    assert.lengthOf(chipWrapper, 1)
    assert.include(enzymeWrapper.debug(), props.label, 'Label should be display')
    assert.equal(chipWrapper.props().onRequestDelete, enzymeWrapper.instance().onUnselectCriterion, 'Callback should be correctly reported')
    // test delete callback
    enzymeWrapper.instance().onUnselectCriterion()
    assert.deepEqual(spiedDeletedCrit, props.selectedCriterion, 'Criterion shoud be correctly provided when deleting')
  })
  it('should render correctly with a selected geometry', () => {
    let spiedDeletedCrit = null
    const props = {
      label: 'my.custom.label2',
      selectedCriterion: {
        point1: [1, 2],
        point2: [3, 4],
        requestParameters: {},
      },
      onUnselectCriterion: (crit) => {
        spiedDeletedCrit = crit
      },
      filterIcon: <div />,
    }
    const enzymeWrapper = shallow(<ApplyingCriterionComponent {...props} />, { context })
    const chipWrapper = enzymeWrapper.find(Chip)
    assert.lengthOf(chipWrapper, 1)
    assert.include(enzymeWrapper.debug(), props.label, 'Label should be display')
    assert.equal(chipWrapper.props().onRequestDelete, enzymeWrapper.instance().onUnselectCriterion, 'Callback should be correctly reported')
    // test delete callback
    enzymeWrapper.instance().onUnselectCriterion()
    assert.deepEqual(spiedDeletedCrit, props.selectedCriterion, 'Criterion shoud be correctly provided when deleting')
  })
})
