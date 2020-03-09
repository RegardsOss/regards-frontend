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
import TextField from 'material-ui/TextField'
import { DamDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import CriterionComponent from '../../src/components/CriterionComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test CriterionComponent
 * @author <%= author %>
 */
describe('[<%= name %>] Testing CriterionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CriterionComponent)
  })
  it('should render correctly', () => {
    const props = {
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.STRING),
      searchText: 'any',
      onTextInput: () => {},
    }
    const enzymeWrapper = shallow(<CriterionComponent {...props} />, { context })
    // Is there attribute label?
    assert.include(enzymeWrapper.debug(), props.searchAttribute.label, 'Attribute label should be displayed')
    // Check that text field properties are set from this component properties
    const textField = enzymeWrapper.find(TextField)
    assert.lengthOf(TextField, 1, 'There should be the text field')
    testSuiteHelpers.assertWrapperProperties(textField, {
      value: props.value,
      onChange: props.onTextInput,
    }, 'Text field properties should be correctly set')
  })
})
