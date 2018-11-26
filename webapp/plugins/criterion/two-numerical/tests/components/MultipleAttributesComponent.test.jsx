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
import { CommonDomain, DamDomain } from '@regardsoss/domain'
import { BOUND_TYPE } from '@regardsoss/plugins-api'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import MultipleAttributesComponent from '../../src/components/MultipleAttributesComponent'
import NumericalCriterionComponent from '../../src/components/NumericalCriterionComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test MultipleAttributesComponent
 * @author Raphaël Mechali
 */
describe('[Two numerical criteria] Testing MultipleAttributesComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MultipleAttributesComponent)
  })
  it('should render correctly', () => {
    const props = {
      attribute1: {
        ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER),
        name: 'Attr1',
        jsonPath: 'x.attr1',
      },
      value1: 55,
      comparator1: CommonDomain.EnumNumericalComparator.EQ,
      availableComparators1: CommonDomain.EnumNumericalComparators,
      onChangeValue1: () => {},

      attribute2: {
        ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER),
        name: 'Attr2',
        jsonPath: 'x.attr2',
      },
      value2: null,
      comparator2: CommonDomain.EnumNumericalComparator.LE,
      availableComparators2: [CommonDomain.EnumNumericalComparator.LE],
      onChangeValue2: () => {},
    }
    const enzymeWrapper = shallow(<MultipleAttributesComponent {...props} />, { context })
    const criterionComponents = enzymeWrapper.find(NumericalCriterionComponent)
    assert.lengthOf(criterionComponents, 2, 'There should be one criterion component for each attribute to search')
    testSuiteHelpers.assertWrapperProperties(criterionComponents.at(0), {
      searchAttribute: props.attribute1,
      fieldBoundType: BOUND_TYPE.ANY_BOUND,
      value: props.value1,
      comparator: props.comparator1,
      availableComparators: props.availableComparators1,
      onChange: props.onChangeValue1,
      showAttributeLabel: true,
      showComparator: true,
    }, 'First numerical component properties should be correctly set')
    testSuiteHelpers.assertWrapperProperties(criterionComponents.at(1), {
      searchAttribute: props.attribute2,
      fieldBoundType: BOUND_TYPE.ANY_BOUND,
      value: props.value2,
      comparator: props.comparator2,
      availableComparators: props.availableComparators2,
      onChange: props.onChangeValue2,
      showAttributeLabel: true,
      showComparator: true,
    }, 'Second numerical component properties should be correctly set')
  })
})
