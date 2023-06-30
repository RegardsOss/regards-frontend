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
import { Field } from '@regardsoss/form-utils'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { CardActionsComponent } from '@regardsoss/components'
import { AttributeModelFormComponent } from '../../src/components/AttributeModelFormComponent'
import { ELASTIC_CONFIGURATION_TYPES_ENUM } from '../../src/domain/ElasticConfigurationTypes'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Tests for AttributeModelFormComponent
 * @author Théo Lasserre
 */
describe('[ADMIN DATA ATTRIBUTEMODEL MANAGEMENT] Testing AttributeModelFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exist', () => {
    assert.isDefined(AttributeModelFormComponent)
    assert.isDefined(CardActionsComponent)
    assert.isDefined(Field)
  })

  it('should render correctly with SIMPLE ElasticConfiguration', () => {
    const props = {
      attrModelTypeList: ['STRING', 'JSON', 'INTEGER', 'DOUBLE'],
      attrModelRestrictionList: ['JSON_SCHEMA'],
      fragmentList: { },
      currentAttrModel: DumpProvider.getNthEntity('DataManagementClient', 'AttributeModel', 2),
      onSubmit: () => { },
      backUrl: 'http://www.test.com',
      handleUpdateAttributeModelRestriction: () => { },
      defaultFragmentName: 'test',
      // from reduxForm
      submitting: false,
      pristine: false,
      invalid: false.bool,
      handleSubmit: () => { },
      initialize: () => { },
      change: () => { },
      isRestrictedCheckboxToggled: false,
      selectedElasticConfig: ELASTIC_CONFIGURATION_TYPES_ENUM.SIMPLE,
    }
    const wrapper = shallow(
      <AttributeModelFormComponent
        {...props}
      />,
      { context },
    )

    // Check for indexed field
    const indexedField = wrapper.find(Field).find({ name: 'indexed' })
    assert.lengthOf(indexedField, 1, 'indexed field should be displayed')

    // Check for esMapping field
    const esMappingField = wrapper.find(Field).find({ name: 'esMapping' })
    assert.lengthOf(esMappingField, 0, 'esMapping field should not be displayed')
  })
  it('should render correctly with ADVANCED ElasticConfiguration', () => {
    const props = {
      attrModelTypeList: ['STRING', 'JSON', 'INTEGER', 'DOUBLE'],
      attrModelRestrictionList: ['JSON_SCHEMA'],
      fragmentList: { },
      currentAttrModel: DumpProvider.getNthEntity('DataManagementClient', 'AttributeModel', 3),
      onSubmit: () => { },
      backUrl: 'http://www.test.com',
      handleUpdateAttributeModelRestriction: () => { },
      defaultFragmentName: 'test',
      // from reduxForm
      submitting: false,
      pristine: false,
      invalid: false.bool,
      handleSubmit: () => { },
      initialize: () => { },
      change: () => { },
      isRestrictedCheckboxToggled: false,
      selectedElasticConfig: ELASTIC_CONFIGURATION_TYPES_ENUM.ADVANCED,
    }
    const wrapper = shallow(
      <AttributeModelFormComponent
        {...props}
      />,
      { context },
    )

    // Check for indexed field
    const indexedField = wrapper.find(Field).find({ name: 'indexed' })
    assert.lengthOf(indexedField, 0, 'indexed field should not be displayed')

    // Check for esMapping field
    const esMappingField = wrapper.find(Field).find({ name: 'esMapping' })
    assert.lengthOf(esMappingField, 1, 'esMapping field should be displayed')
  })
})
