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
import { Parameter } from '../../src/definitions/parameters/Parameter'
import ParametersConfigurationComponent from '../../src/components/ParametersConfigurationComponent'
import BooleanParameterField from '../../src/common/BooleanParameterField'
import ChoiceParameterField from '../../src/common/ChoiceParameterField'
import DateParameterField from '../../src/common/DateParameterField'
import TextParameterField from '../../src/common/TextParameterField'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test ParametersConfigurationComponent
* @author Raphaël Mechali
*/
describe('[Entities Common] Testing ParametersConfigurationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ParametersConfigurationComponent)
  })
  it('should render parameters correctly', () => {
    const choices = ['c1', 'c2']
    const validator = () => { }
    const props = {
      parameters: [
        Parameter.buildBooleanEditor('bool', null, true, 'Bool'),
        Parameter.buildChoiceEditor('choice', null, choices, false, 'Choice'),
        Parameter.buildTextEditor('text', null, validator, false, 'Text'),
        Parameter.buildDateEditor('date', null, false, 'Date'),
      ],
      parametersValues: {},
      initialize: () => { },
    }
    const enzymeWrapper = shallow(<ParametersConfigurationComponent {...props} />, { context })
    // There should be a renderer for each parameter
    const booleanField = enzymeWrapper.find(BooleanParameterField)
    assert.lengthOf(booleanField, 1, 'The boolean parameter field should be displayed')
    assert.equal(booleanField.props().name, 'bool', 'Name should be reported from parameter name')
    assert.equal(booleanField.props().label, 'entities.common.services.parameter.required', 'The field is mandatory, it use an i18n key')

    const choiceField = enzymeWrapper.find(ChoiceParameterField)
    assert.lengthOf(choiceField, 1, 'The choice parameter field should be displayed')
    assert.equal(choiceField.props().name, 'choice', 'Name should be reported from parameter name')
    assert.equal(choiceField.props().label, 'Choice', 'Label should be reported from parameter label')
    assert.equal(choiceField.props().choices, choices, 'Choices should be reported to the field')

    const textField = enzymeWrapper.find(TextParameterField)
    assert.lengthOf(textField, 1, 'The text parameter field should be displayed')
    assert.equal(textField.props().name, 'text', 'Name should be reported from parameter name')
    assert.equal(textField.props().label, 'Text', 'Label should be reported from parameter label')
    assert.equal(textField.props().validator, validator, 'Validator should be reported to the field')
    assert.equal(textField.props().required, false, 'Required value should be reported to text field')

    const dateField = enzymeWrapper.find(DateParameterField)
    assert.lengthOf(dateField, 1, 'The date parameter field should be displayed')
    assert.equal(dateField.props().name, 'date', 'Name should be reported from parameter name')
    assert.equal(dateField.props().label, 'Date', 'Label should be reported from parameter label')
    assert.equal(dateField.props().required, false, 'Required value should be reported to date field')
  })

  it('should initialize parameter values correctly', () => {
    const props = {
      parameters: [
        Parameter.buildBooleanEditor('bool', true, true),
        Parameter.buildChoiceEditor('choice', 'c1', ['c1', 'c2'], false),
        Parameter.buildDateEditor('date', '1994-11-05T08:15:30-05:00', false),
        Parameter.buildTextEditor('text', 'x', () => { }, false),
      ],
      parametersValues: {
        bool: false, // bool field should be intilized to false
        choice: 'c2', // choice should use c2 value
        // text field should initialize to default parameter value 'x'
      },
      initialize: ({
        bool, choice, date, text,
      }) => {
        assert.equal(bool, false, 'The boolean field should be initialized using parameters values')
        assert.equal(choice, 'c2', 'The choice field should be initialized using parameters values')
        assert.equal(text, 'x', 'The text field should be initialized using default parameter value')
        assert.equal(date, '1994-11-05T08:15:30-05:00', 'The date field should be initialized using default parameter value')
      },
    }
    shallow(<ParametersConfigurationComponent {...props} />, { context })
  })
})
