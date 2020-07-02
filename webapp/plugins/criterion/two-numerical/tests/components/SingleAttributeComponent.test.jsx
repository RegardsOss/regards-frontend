/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CommonDomain, DamDomain } from '@regardsoss/domain'
import { BOUND_TYPE } from '@regardsoss/plugins-api'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import SingleAttributeComponent from '../../src/components/SingleAttributeComponent'
import NumericalCriterionComponent from '../../src/components/NumericalCriterionComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SingleAttributeComponent
 * @author Raphaël Mechali
 */
describe('[Two numerical criteria] Testing SingleAttributeComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SingleAttributeComponent)
  })
  it('should render correctly', () => {
    const props = {
      searchAttribute: {
        ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER),
        name: 'Attr1',
        jsonPath: 'x.attr1',
      },
      value1: 55,
      value2: null,
      onChangeValue1: () => {},
      onChangeValue2: () => {},
    }
    const enzymeWrapper = shallow(<SingleAttributeComponent {...props} />, { context })
    const criterionComponents = enzymeWrapper.find(NumericalCriterionComponent)
    assert.lengthOf(criterionComponents, 2, 'There should be one criterion component for value to enter')
    testSuiteHelpers.assertWrapperProperties(criterionComponents.at(0), {
      searchAttribute: props.searchAttribute,
      fieldBoundType: BOUND_TYPE.LOWER_BOUND,
      value: props.value1,
      comparator: CommonDomain.EnumNumericalComparator.GE,
      onChange: props.onChangeValue1,
      showAttributeLabel: false,
      showComparator: false,
    }, 'First numerical component properties should be correctly set')
    testSuiteHelpers.assertWrapperProperties(criterionComponents.at(1), {
      searchAttribute: props.searchAttribute,
      fieldBoundType: BOUND_TYPE.UPPER_BOUND,
      value: props.value2,
      comparator: CommonDomain.EnumNumericalComparator.LE,
      onChange: props.onChangeValue2,
      showAttributeLabel: false,
      showComparator: false,
    }, 'Second numerical component properties should be correctly set')
  })
})
