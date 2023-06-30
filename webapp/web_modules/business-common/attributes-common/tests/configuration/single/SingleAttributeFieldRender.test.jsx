/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AutoCompleteTextField } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers, ReduxFormTestHelper } from '@regardsoss/tests-helpers'
import { DamDomain } from '@regardsoss/domain'
import { SingleAttributeFieldRender } from '../../../src/configuration/single/SingleAttributeFieldRender'
import styles from '../../../src/styles'
import { attributeModelsArray, attributeModelsDictionary } from '../../dumps/AttributeModels.dump'

const context = buildTestContext(styles)

/**
 * Test SingleAttributeFieldRender
 * @author Raphaël Mechali
 */
describe('[Attributes Common] Testing SingleAttributeFieldRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SingleAttributeFieldRender)
  })
  it('should render correctly and filter available attributes on value change', () => {
    const spyUpdate = {}
    const props = {
      attributeModels: attributeModelsArray,
      input: {
        ...ReduxFormTestHelper.getInputFieldProps('X', ''),
        onChange: (value) => {
          spyUpdate.value = value
        },
      },
      meta: ReduxFormTestHelper.getMetaFieldProps('hello', true),
      label: 'MEMEMEME',
      intl: context.intl,
    }
    const enzymeWrapper = shallow(<SingleAttributeFieldRender {...props} />, { context })
    const convertToHint = ({ content: { jsonPath } }) => ({
      id: jsonPath,
      text: jsonPath,
      value: jsonPath,
    })
    // 0 - init, check error and non filtered list
    let autocompleteField = enzymeWrapper.find(AutoCompleteTextField)
    assert.lengthOf(autocompleteField, 1, '0 - There should be the autocomplete field')
    assert.isTrue(autocompleteField.props().isInError, '0 - Autocomplete should be in error')
    assert.equal(autocompleteField.props().errorMessage, props.meta.error, '0 - Autocomplete should show rigth error message')
    assert.equal(autocompleteField.props().currentHintText, props.input.value, '0 - Autocomplete value should be correctly reported')
    assert.deepEqual(autocompleteField.props().currentHints, attributeModelsArray.map(convertToHint), '0 - Available attributes should not be filtered')

    // 1 - Simulate user typing in progress
    enzymeWrapper.instance().onUpdateInput('a')
    assert.equal(spyUpdate.value, 'a')

    const props1 = {
      ...props,
      meta: ReduxFormTestHelper.getMetaFieldProps(null, false),
      input: {
        ...ReduxFormTestHelper.getInputFieldProps('X', spyUpdate.value),
        onChange: props.input.onChange,
      },
    }
    enzymeWrapper.setProps(props1)
    autocompleteField = enzymeWrapper.find(AutoCompleteTextField)
    assert.lengthOf(autocompleteField, 1, '1 - There should be the autocomplete field')
    assert.isFalse(autocompleteField.props().isInError, '1 - Autocomplete should not be in error')
    assert.isUndefined(autocompleteField.props().errorMessage, '1 - Autocomplete should show no error message')
    assert.equal(autocompleteField.props().currentHintText, props1.input.value, '1 - Autocomplete value should be correctly reported')
    assert.deepEqual(autocompleteField.props().currentHints, [ // alphabetical order on jsonPath
      DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.label),
      attributeModelsDictionary[3],
      attributeModelsDictionary[2],
      attributeModelsDictionary[1],
      attributeModelsDictionary[4],
      DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.tags),
    ].map(convertToHint), '1 - Available attributes should be filtered')

    // 2 - Simulate more user typing in progress
    enzymeWrapper.instance().onUpdateInput('attr')
    assert.equal(spyUpdate.value, 'attr')

    const props2 = {
      ...props,
      input: {
        ...ReduxFormTestHelper.getInputFieldProps('X', spyUpdate.value),
        onChange: props.input.onChange,
      },
    }
    enzymeWrapper.setProps(props2)
    autocompleteField = enzymeWrapper.find(AutoCompleteTextField)
    assert.lengthOf(autocompleteField, 1, '2 - There should be the autocomplete field')
    assert.equal(autocompleteField.props().currentHintText, props2.input.value, '2 - Autocomplete value should be correctly reported')
    assert.deepEqual(autocompleteField.props().currentHints, [ // alphabetical order on jsonPath
      attributeModelsDictionary[3],
      attributeModelsDictionary[2],
      attributeModelsDictionary[1],
      attributeModelsDictionary[4],
    ].map(convertToHint), '2 - Available attributes should be filtered')
    // 3 - Simulate selection or full typing
    enzymeWrapper.instance().onUpdateInput(attributeModelsDictionary[2].content.jsonPath)
    assert.equal(spyUpdate.value, attributeModelsDictionary[2].content.jsonPath)

    const props3 = {
      ...props,
      input: {
        ...ReduxFormTestHelper.getInputFieldProps('X', spyUpdate.value),
        onChange: props.input.onChange,
      },
    }
    enzymeWrapper.setProps(props3)
    autocompleteField = enzymeWrapper.find(AutoCompleteTextField)
    assert.lengthOf(autocompleteField, 1, '3 - There should be the autocomplete field')
    assert.equal(autocompleteField.props().currentHintText, props3.input.value, '3 - Autocomplete value should be correctly reported')
    assert.deepEqual(autocompleteField.props().currentHints, [
      attributeModelsDictionary[2],
    ].map(convertToHint), '3 - Available attributes should be filtered')
  })
})
