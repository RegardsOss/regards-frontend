/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import TextField from 'material-ui/TextField'
import { EnumNumericalComparator } from '@regardsoss/domain/common'
import { NumericalComparator } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import NumericalCriteriaComponent from '../../src/components/NumericalCriteriaComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test NumericalCriteriaComponent
 * @author Raphaël Mechali
 */
describe('[PLUGIN TWO NUMERICAL CRITERIA] Testing NumericalCriteriaComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NumericalCriteriaComponent)
  })
  it('should render correctly', () => {
    const props = {
      onChange: () => { },
      label: 'any',
      comparator: EnumNumericalComparator.GE,
      availableComparators: [EnumNumericalComparator.EQ, EnumNumericalComparator.LE, EnumNumericalComparator.GE],
      value: 25,
      reversed: false,
      hideAttributeName: false,
      hideComparator: false,
    }
    const enzymeWrapper = shallow(<NumericalCriteriaComponent {...props} />, { context })

    // test numerical comparator render
    const numericalComparator = enzymeWrapper.find(NumericalComparator)
    assert.lengthOf(numericalComparator, 1, ' There should be the numerical component')
    testSuiteHelpers.assertWrapperProperties(numericalComparator, {
      value: props.comparator,
      onChange: enzymeWrapper.instance().handleChangeComparator,
      comparators: props.availableComparators,
    }, 'Properties should be correctly reported to numerical component')

    // test text field render
    const textField = enzymeWrapper.find(TextField)
    assert.lengthOf(textField, 1, 'There should be the text field')
    testSuiteHelpers.assertWrapperProperties(textField, {
      type: 'number',
      value: 25,
      onChange: enzymeWrapper.instance().handleChangeValue,
    }, 'Properties should be correctly reported to text field')
  })
})
