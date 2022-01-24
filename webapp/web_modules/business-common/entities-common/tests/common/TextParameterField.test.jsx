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
import TextParameterField from '../../src/common/TextParameterField'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test TextParameterField
* @author Raphaël Mechali
*/
describe('[Entities Common] Testing TextParameterField', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TextParameterField)
  })
  it('should render correctly', () => {
    const props = {
      name: 'aText',
      label: 'AText(*)',
      validator: null,
      required: false,
    }
    shallow(<TextParameterField {...props} />, { context })
  })
  it('should validate values correctly, using validator and required', () => {
    // 1 - check validation
    const props = {
      name: 'aText',
      label: 'AText(*)',
      validator: (value) => value === 'TEST ERROR' ? 'error' : undefined, // spy validation
      required: true,
    }
    const enzymeWrapper = shallow(<TextParameterField {...props} />, { context })
    let validationError = enzymeWrapper.instance().validate('a valid value')
    assert.isUndefined(validationError, '[With validation] there should be no error for value "a valid value"')
    validationError = enzymeWrapper.instance().validate('TEST ERROR')
    assert.equal(validationError, 'error', '[With validation] there should be an error for value "TEST ERROR" (test validation)')
    validationError = enzymeWrapper.instance().validate()
    assert.isDefined(validationError, '[With validation] there should be an error for undefined value since required is true')

    // 2 - check no validation
    const props2 = {
      name: 'aText',
      label: 'AText(*)',
      validator: null,
      required: false,
    }
    enzymeWrapper.setProps(props2)
    validationError = enzymeWrapper.instance().validate('a valid value')
    assert.isUndefined(validationError, '[Without validation] there should be no error for value "a valid value"')
    validationError = enzymeWrapper.instance().validate('TEST ERROR')
    assert.isUndefined(validationError, 'error', '[Without validation] there should be no error for value "TEST ERROR" (no validation)')
    validationError = enzymeWrapper.instance().validate()
    assert.isUndefined(validationError, '[Without validation] there should be no error for undefined value since required is false')
  })
})
