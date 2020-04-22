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
import { CommonDomain, DamDomain, UIDomain } from '@regardsoss/domain'
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
  it('should render correctly with all locales', () => {
    const props = {
      label: criterionTestSuiteHelpers.getLabelStub(),

      error1: true,
      attribute1: {
        ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER),
        name: 'Attr1',
        jsonPath: 'x.attr1',
      },
      value1: 'abc',
      comparator1: CommonDomain.EnumNumericalComparator.GE,
      availableComparators1: [CommonDomain.EnumNumericalComparator.LE, CommonDomain.EnumNumericalComparator.GE],
      onValue1Changed: () => {},

      error2: false,
      attribute2: {
        ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER),
        name: 'Attr2',
        jsonPath: 'y.attr2',
      },
      value2: '35',
      comparator2: CommonDomain.EnumNumericalComparator.EQ,
      availableComparators2: [CommonDomain.EnumNumericalComparator.LE, CommonDomain.EnumNumericalComparator.EQ, CommonDomain.EnumNumericalComparator.GE],
      onValue2Changed: () => {},
    }
    UIDomain.LOCALES.forEach((locale) => {
      const enzymeWrapper = shallow(<MultipleAttributesComponent {...props} />, {
        context: buildTestContext(styles, locale),
      })
      assert.include(enzymeWrapper.debug(), props.label[locale])
    })
  })
  it('should render correctly', () => {
    const props = {
      label: criterionTestSuiteHelpers.getLabelStub(),

      error1: true,
      attribute1: {
        ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER),
        name: 'Attr1',
        jsonPath: 'x.attr1',
      },
      value1: 'abc',
      comparator1: CommonDomain.EnumNumericalComparator.GE,
      availableComparators1: [CommonDomain.EnumNumericalComparator.LE, CommonDomain.EnumNumericalComparator.GE],
      onValue1Changed: () => {},

      error2: false,
      attribute2: {
        ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER),
        name: 'Attr2',
        jsonPath: 'y.attr2',
      },
      value2: '35',
      comparator2: CommonDomain.EnumNumericalComparator.EQ,
      availableComparators2: [CommonDomain.EnumNumericalComparator.LE, CommonDomain.EnumNumericalComparator.EQ, CommonDomain.EnumNumericalComparator.GE],
      onValue2Changed: () => {},
    }
    const enzymeWrapper = shallow(<MultipleAttributesComponent {...props} />, { context })
    const criterionComponents = enzymeWrapper.find(NumericalCriterionComponent)
    assert.lengthOf(criterionComponents, 2, 'There should be one criterion component for each attribute to search')
    testSuiteHelpers.assertWrapperProperties(criterionComponents.at(0), {
      searchAttribute: props.attribute1,
      fieldBoundType: BOUND_TYPE.ANY_BOUND,
      error: props.error1,
      value: props.value1,
      comparator: props.comparator1,
      availableComparators: props.availableComparators1,
      onChange: props.onValue1Changed,
    }, 'First numerical component properties should be correctly set')
    testSuiteHelpers.assertWrapperProperties(criterionComponents.at(1), {
      searchAttribute: props.attribute2,
      fieldBoundType: BOUND_TYPE.ANY_BOUND,
      error: props.error2,
      value: props.value2,
      comparator: props.comparator2,
      availableComparators: props.availableComparators2,
      onChange: props.onValue2Changed,
    }, 'Second numerical component properties should be correctly set')
  })
})
