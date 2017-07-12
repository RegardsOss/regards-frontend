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
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { FieldArray } from 'redux-form'
import { Field } from '@regardsoss/form-utils'
import { UnconnectedAttributeRegroupementFormComponent } from '../../src/configuration/AttributeRegroupementFormComponent'


const context = buildTestContext()

/**
 * Tests for FormParametersConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing AttributeRegroupementFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(UnconnectedAttributeRegroupementFormComponent)
  })

  it('Should render a AttributeRegroupementFormComponent', () => {
    const props = {
      onClose: () => { },
      onSubmit: () => { },
      selectableAttributes: {},
      validateLabel: () => {},
      submitting: false,
      pristine: false,
      invalid: false,
      handleSubmit: () => { },
      initialize: () => { },
    }

    const wrapper = shallow(
      <UnconnectedAttributeRegroupementFormComponent {...props} />, { context },
    )

    const labelField = wrapper.find(Field).find({ name: 'label' })
    assert.lengthOf(labelField, 1, 'There should be a field for label in this form')

    const attributesField = wrapper.find(FieldArray).find({ name: 'attributes' })
    assert.lengthOf(attributesField, 1, 'There should be a field for attributes in this form')
  })
})
