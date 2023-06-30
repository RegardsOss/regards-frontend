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
import { Field, FieldArray } from '@regardsoss/form-utils'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { JsonSchemaComponent } from '../../src/components/JsonSchemaComponent'
import { ELASTIC_CONFIGURATION_TYPES_ENUM } from '../../src/domain/ElasticConfigurationTypes'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Tests for JsonSchemaComponent
 * @author Théo Lasserre
 */
describe('[ADMIN DATA ATTRIBUTEMODEL MANAGEMENT] Testing JsonSchemaComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exist', () => {
    assert.isDefined(JsonSchemaComponent)
    assert.isDefined(Field)
  })

  it('should render correctly with SIMPLE ElasticConfiguration and RestricCheckbox not toggled', () => {
    const props = {
      selectedElasticConfig: ELASTIC_CONFIGURATION_TYPES_ENUM.SIMPLE,
      isRestrictedCheckboxToggled: false,
      // redux form
      change: () => { },
    }
    const wrapper = shallow(
      <JsonSchemaComponent
        {...props}
      />,
      { context },
    )

    // Check for restrict field
    const restrictField = wrapper.find(Field).find({ name: 'restriction.JSON_SCHEMA.restrict' })
    assert.lengthOf(restrictField, 1, 'restrict field should be displayed')

    // Check for indexableFields
    const indexableFields = wrapper.find(FieldArray).find({ name: 'restriction.JSON_SCHEMA.indexableFields' })
    assert.lengthOf(indexableFields, 0, 'indexableFields should not be displayed')
  })

  it('should render correctly with SIMPLE ElasticConfiguration and RestricCheckbox toggled', () => {
    const props = {
      selectedElasticConfig: ELASTIC_CONFIGURATION_TYPES_ENUM.SIMPLE,
      isRestrictedCheckboxToggled: true,
      // redux form
      change: () => { },
    }
    const wrapper = shallow(
      <JsonSchemaComponent
        {...props}
      />,
      { context },
    )

    // Check for restrict field
    const restrictField = wrapper.find(Field).find({ name: 'restriction.JSON_SCHEMA.restrict' })
    assert.lengthOf(restrictField, 1, 'restrict field should be displayed')

    // Check for indexableFields
    const indexableFields = wrapper.find(FieldArray).find({ name: 'restriction.JSON_SCHEMA.indexableFields' })
    assert.lengthOf(indexableFields, 1, 'indexableFields should be displayed')
  })

  it('should render correctly with ADVANCED ElasticConfiguration', () => {
    const props = {
      selectedElasticConfig: ELASTIC_CONFIGURATION_TYPES_ENUM.ADVANCED,
      isRestrictedCheckboxToggled: false,
      // redux form
      change: () => { },
    }
    const wrapper = shallow(
      <JsonSchemaComponent
        {...props}
      />,
      { context },
    )

    // Check for restrict field
    const restrictField = wrapper.find(Field).find({ name: 'restriction.JSON_SCHEMA.restrict' })
    assert.lengthOf(restrictField, 0, 'restrict field should not be displayed')

    // Check for indexableFields
    const indexableFields = wrapper.find(FieldArray).find({ name: 'restriction.JSON_SCHEMA.indexableFields' })
    assert.lengthOf(indexableFields, 0, 'indexableFields should not be displayed')
  })
})
