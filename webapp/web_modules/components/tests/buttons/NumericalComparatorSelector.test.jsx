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
import { CommonDomain } from '@regardsoss/domain'
import NumericalComparatorSelector from '../../src/buttons/NumericalComparatorSelector'
import IconElementSelector from '../../src/buttons/IconElementSelector'
import styles from '../../src/buttons/styles'

const context = buildTestContext(styles)

/**
 * Test NumericalComparatorSelector
 * @author Raphaël Mechali
 */
describe('[Components] Testing NumericalComparatorSelector', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NumericalComparatorSelector)
  })
  it('should render correctly', () => {
    const testSets = [{
      operator: CommonDomain.EnumNumericalComparator.GE,
      operators: [CommonDomain.EnumNumericalComparator.GE, CommonDomain.EnumNumericalComparator.LE],
    }, {
      operator: CommonDomain.EnumNumericalComparator.EQ,
      operators: [CommonDomain.EnumNumericalComparator.GE, CommonDomain.EnumNumericalComparator.EQ, CommonDomain.EnumNumericalComparator.LE],
    }, {
      operator: CommonDomain.EnumNumericalComparator.LE,
    }]
    testSets.forEach(({ operator, operators }, index) => {
      const props = {
        operator,
        operators,
        onSelect: () => {},
      }
      const enzymeWrapper = shallow(<NumericalComparatorSelector {...props} />, { context })
      const iconElementSelectorWrapper = enzymeWrapper.find(IconElementSelector)
      assert.lengthOf(iconElementSelectorWrapper, 1, `#${index} There should be delegate selector`)
      testSuiteHelpers.assertWrapperProperties(iconElementSelectorWrapper, {
        value: props.operator,
        choices: props.operators || NumericalComparatorSelector.defaultProps.operators,
        choiceGraphics: NumericalComparatorSelector.COMPARATORS_DEFINITION,
        onChange: props.onSelect,
      }, 'Selector properties should be correctly computed')
    })
  })
})
