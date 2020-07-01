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
import flatMap from 'lodash/flatMap'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM, UI_PLUGIN_CONF_PARAMETER_TYPES } from '@regardsoss/domain/access'
import { BooleanParameterField, DateParameterField, TextParameterField } from '@regardsoss/entities-common'
import FieldsBuilderComponent from '../../src/components/FieldsBuilderComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test FieldsBuilderComponent
* @author Raphaël Mechali
*/
describe('[ADMIN UI SERVICE MANAGEMENT] Testing FieldsBuilderComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FieldsBuilderComponent)
  })
  it('should render correctly static parameters', () => {
    const commonProps = {
      staticParameter: true,
      name: 'testname',
    }

    // generate all possible parameter types / required combination
    const allTests = flatMap(UI_PLUGIN_CONF_PARAMETER_TYPES, (type) => [{ type, required: true }, { type, required: false }])
    // test each
    allTests.forEach(({ type, required }) => {
      const localProps = { parameter: { type, required }, ...commonProps }
      const enzymeWrapper = shallow(<FieldsBuilderComponent {...localProps} />, { context })
      assert.equal(enzymeWrapper.instance().getFieldName(), 'static.testname')
      switch (type) {
        case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.BOOL:
          assert.lengthOf(enzymeWrapper.find(BooleanParameterField), 1, 'Boolean should be rendered using a boolean field')
          break
        case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.DATE:
          assert.lengthOf(enzymeWrapper.find(DateParameterField), 1, 'Date should be rendered using a date field')
          break
        case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.CHAR:
        case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.FLOAT:
        case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.INT:
        case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.STRING: {
          const textfieldWrapper = enzymeWrapper.find(TextParameterField)
          assert.lengthOf(textfieldWrapper.find(TextParameterField), 1, 'String, char, float and int should be rendered using a text field')
          // check that types that should be parsed OR that are required have a validator
          if (required || type !== UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.STRING) {
            assert.isDefined(textfieldWrapper.props().validator, 'There should be a validator')
          }
        }
          break
        default:
          assert.fail(`Unknown type ${type}`)
      }
    })
  })
  it('should render correctly dynamic parameters', () => {
    const commonProps = {
      staticParameter: false,
      name: 'testname',
    }

    // generate all possible parameter types / required combination
    const allTests = flatMap(UI_PLUGIN_CONF_PARAMETER_TYPES, (type) => [{ type, required: true }, { type, required: false }])
    // test each
    allTests.forEach(({ type, required }) => {
      const localProps = { parameter: { type, required }, ...commonProps }
      const enzymeWrapper = shallow(<FieldsBuilderComponent {...localProps} />, { context })
      assert.equal(enzymeWrapper.instance().getFieldName(), 'dynamic.testname')
      switch (type) {
        case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.BOOL:
          assert.lengthOf(enzymeWrapper.find(BooleanParameterField), 1, 'Boolean should be rendered using a boolean field')
          break
        case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.DATE:
          assert.lengthOf(enzymeWrapper.find(DateParameterField), 1, 'Date should be rendered using a date field')
          break
        case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.CHAR:
        case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.FLOAT:
        case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.INT:
        case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.STRING: {
          const textfieldWrapper = enzymeWrapper.find(TextParameterField)
          assert.lengthOf(textfieldWrapper.find(TextParameterField), 1, 'String, char, float and int should be rendered using a text field')
          // check that required types are not required for user (as there is a parser, we check only non parsed type here)
          if (required && type === UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.STRING) {
            assert.isNotOk(textfieldWrapper.props().validator, 'There should be a validator')
          }
        }
          break
        default:
          assert.fail(`Unknown type ${type}`)
      }
    })
  })
})
