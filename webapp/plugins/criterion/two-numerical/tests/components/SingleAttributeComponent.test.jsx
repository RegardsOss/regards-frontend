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
  it('should render correctly with all locales', () => {
    const props = {
      label: criterionTestSuiteHelpers.getLabelStub(),
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER),
      error: false,
      min: '25',
      max: '45',
      onMinChanged: () => {},
      onMaxChanged: () => {},
    }
    UIDomain.LOCALES.forEach((locale) => {
      const enzymeWrapper = shallow(<SingleAttributeComponent {...props} />, {
        context: buildTestContext(styles, locale),
      })
      assert.include(enzymeWrapper.debug(), props.label[locale])
    })
  })
  it('should render correctly', () => {
    const props = {
      label: criterionTestSuiteHelpers.getLabelStub(),
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER),
      error: true,
      min: '45',
      max: '25',
      onMinChanged: () => {},
      onMaxChanged: () => {},
    }
    const enzymeWrapper = shallow(<SingleAttributeComponent {...props} />, { context })
    const criterionComponents = enzymeWrapper.find(NumericalCriterionComponent)
    assert.lengthOf(criterionComponents, 2, 'There should be one criterion component for value to enter')
    testSuiteHelpers.assertWrapperProperties(criterionComponents.at(0), {
      searchAttribute: props.searchAttribute,
      fieldBoundType: BOUND_TYPE.LOWER_BOUND,
      error: props.error,
      value: props.min,
      comparator: CommonDomain.EnumNumericalComparator.GE,
      availableComparators: SingleAttributeComponent.LOWER_BOUND_OPERATORS,
      onChange: props.onMinChanged,
    }, 'First numerical component properties should be correctly set')
    testSuiteHelpers.assertWrapperProperties(criterionComponents.at(1), {
      searchAttribute: props.searchAttribute,
      fieldBoundType: BOUND_TYPE.UPPER_BOUND,
      error: props.error,
      value: props.max,
      comparator: CommonDomain.EnumNumericalComparator.LE,
      availableComparators: SingleAttributeComponent.UPPER_BOUND_OPERATORS,
      onChange: props.onMaxChanged,
    }, 'Second numerical component properties should be correctly set')
  })
})
