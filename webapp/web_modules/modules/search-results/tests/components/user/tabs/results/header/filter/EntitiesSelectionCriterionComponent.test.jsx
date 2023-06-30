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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import EntitiesSelectionCriterionComponent from '../../../../../../../src/components/user/tabs/results/header/filter/EntitiesSelectionCriterionComponent'
import ApplyingCriterionComponent from '../../../../../../../src/components/user/tabs/results/header/filter/ApplyingCriterionComponent'
import styles from '../../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test EntitiesSelectionCriterionComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing EntitiesSelectionCriterionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EntitiesSelectionCriterionComponent)
  })
  it('should render correctly', () => {
    const props = {
      entitiesSelectionCriterion: {
        entitiesCount: 25,
        requestParameters: {},
      },
      onUnselectEntitiesSelection: () => {},
    }
    const enzymeWrapper = shallow(<EntitiesSelectionCriterionComponent {...props} />, { context })
    const delegateWrapper = enzymeWrapper.find(ApplyingCriterionComponent)
    assert.lengthOf(delegateWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(delegateWrapper, {
      label: 'search.filter.entities.selection.label',
      selectedCriterion: props.entitiesSelectionCriterion,
      onUnselectCriterion: props.onUnselectEntitiesSelection,
    })
  })
})
