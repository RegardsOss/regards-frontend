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
 */
import { assert } from 'chai'
import { shallow } from 'enzyme'
import FlatButton from 'material-ui/FlatButton'
import { buildTestContext, testSuiteHelpers, ReduxFormTestHelper } from '@regardsoss/tests-helpers'
import { DescriptorHelper } from '../../../../src/domain/opensearch/DescriptorHelper'
import OSQueryFiltersFieldComponent from '../../../../src/components/opensearch/query/OSQueryFiltersFieldComponent'
import { openSearchDescriptor } from '../../../dumps/opensearch-descriptor.dump'
import OSQueryParameterSelectField from '../../../../src/components/opensearch/query/OSQueryParameterSelectField'
import OSQueryParameterInputField from '../../../../src/components/opensearch/query/OSQueryParameterInputField'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing OSQueryFiltersFieldComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exist', () => {
    assert.isDefined(OSQueryFiltersFieldComponent)
  })
  const fieldValues = [{
    value: '{p1}',
    name: 'param1',
    queryValue: 'v1',
  }, {
    value: '{p2}',
    name: 'param2',
    queryValue: 'v2a',
    options: ['v2a', 'v2b'],
  }]
  it('should render correctly', () => {
    const urlDescriptor = DescriptorHelper.getResourceURL(openSearchDescriptor)
    const props = {
      webserviceURL: 'http://test.com:3615/api-test',
      pageSizeParam: 'testPS',
      selectedPageSize: '777',
      pageIndexParam: 'testPI',
      firstPageIndex: 25,
      invalid: false,

      availableParameters: urlDescriptor.parameter,
      fields: {
        ...ReduxFormTestHelper.getFieldsProps(fieldValues),
        getAll: () => fieldValues, // currently selected parameters
        // simulate the mapping performed by redux form on values above
        map: (f) => fieldValues.map((v, index) => f(`myField[${index}]`, index)),
        get: (i) => fieldValues[i],
        push: () => {},
        remove: () => {},
        length: 2,
      },
    }

    const wrapper = shallow(<OSQueryFiltersFieldComponent {...props} />, { context })
    // 1- Check buttons
    const buttons = wrapper.find(FlatButton)
    assert.lengthOf(buttons, 2, 'There should be add filter and test request button')
    // 1.a- Add filter button
    assert.lengthOf(buttons.findWhere((n) => n.props().onClick === wrapper.instance().onShowDialog), 1, 'There should be add filter button')
    // 1.b - Test query button
    const testButton = buttons.findWhere((n) => !!n.props().href)
    assert.lengthOf(testButton, 1, 'There should be test request button')
    assert.equal(testButton.props().href, 'http://test.com:3615/api-test?param1=v1&param2=v2a&testPS=777&testPI=25', 'URL should be correctly computed from template URL, common and selected parameters')

    // Check selected parameters are correctly rendered for edition
    const p1InputField = wrapper.find(OSQueryParameterInputField)
    assert.lengthOf(p1InputField, 1, 'There should be input field for parameter 1')
    assert.deepEqual(p1InputField.props().filterParameter, props.fields.getAll()[0], 'Parameter 1 input field model should be correctly set')
    const p2SelectField = wrapper.find(OSQueryParameterSelectField)
    assert.lengthOf(p2SelectField, 1, 'There should be select field for parameter 2')
    assert.deepEqual(p2SelectField.props().filterParameter, props.fields.getAll()[1], 'Parameter 2 input field model should be correctly set')
  })
})
