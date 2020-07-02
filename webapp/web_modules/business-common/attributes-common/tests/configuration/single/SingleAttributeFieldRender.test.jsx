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
import { AutoCompleteTextField } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SingleAttributeFieldRender } from '../../../src/configuration/single/SingleAttributeFieldRender'
import styles from '../../../src/styles'
import { attributeModelsArray, attributeModelsDictionnary } from '../../dumps/AttributeModels.dump'

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
  it('should render correctly and filter available attributes', () => {
    const props = {
      attributeModels: attributeModelsArray,
      input: {
        value: 'att',
        onChange: PropTypes.func.isRequired,
      },
      meta: {
        invalid: true,
        error: 'hello',
      },
      label: 'MEMEMEME',
    }
    // create custom context to return attribute label when formatting message ID attribute.render.label
    const customContext = {
      ...context,
      intl: {
        ...context.intl,
        formatMessage: ({ id }, values) => id === 'attribute.render.label' ? values.label : context.intl.formatMessage({ id }, values),
      },
    }
    const enzymeWrapper = shallow(<SingleAttributeFieldRender {...props} />, { context: customContext })
    const autocompleteField = enzymeWrapper.find(AutoCompleteTextField)
    assert.lengthOf(autocompleteField, 1, 'There should be the autocomplete field')
    assert.isTrue(autocompleteField.props().isInError, 'Error state should be correctly reported')
    assert.equal(props.meta.error, autocompleteField.props().errorMessage, 'Error state should be correctly reported')


    enzymeWrapper.instance().onUpdateInput('attr3')
    assert.deepEqual(enzymeWrapper.state().inputValue, 'attr3', 'Filter text input should be updated')
    const attr3 = attributeModelsDictionnary[3]
    assert.deepEqual(enzymeWrapper.state().filteredAttributes, [{
      id: attr3.content.jsonPath,
      text: attr3.content.label, // as there is no fragment
      value: attr3.content.jsonPath,
    }], 'Only attr3 should be retained for current filter')
  })
})
