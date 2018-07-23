/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import keys from 'lodash/keys'
import { shallow } from 'enzyme'
import { spy } from 'sinon'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DamDomain } from '@regardsoss/domain'
import { Field } from '@regardsoss/form-utils'
import { ModulePaneStateField } from '@regardsoss/modules-api'
import { AttributesListConfigurationComponent } from '@regardsoss/attributes-common'
import SearchResultsConfigurationComponent from '../../../src/components/admin/SearchResultsConfigurationComponent'
import Styles from '../../../src/styles/styles'

/**
 * Tests for FormParametersConfigurationComponent
 * @author Sébastien binda
 */
describe('[Search Results] Testing SearchResultsConfigurationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  const options = { context: buildTestContext(Styles) }

  it('Should render a SearchResultsConfigurationComponent to configure search results in data mode', () => {
    const selectCallback = spy()
    const props = {
      defaultSelected: DamDomain.ENTITY_TYPES_ENUM.DATA,
      onSelectType: selectCallback,
      disabled: false,

      dataAttributeModels: {},
      datasetAttributeModels: {},
      documentAttributeModels: {},
      currentFormValues: {},
      initialFormValues: {},
      isCreating: true,
      adminConf: {

      },
      currentNamespace: 'conf',
      changeField: () => { },
    }

    const wrapper = shallow(<SearchResultsConfigurationComponent {...props} />, options)

    // verify each configuration field is available
    const wrapperInstance = wrapper.instance()

    const wrapperFieldsProps = keys(wrapperInstance).filter(key =>
      key.match(/CONF_.*/) && // math all CONF fields
      // remove specific view fields, that cannot be found outside specific view configuration
      !['CONF_DATA_SECTION_LABEL_FR', 'CONF_DATA_SECTION_LABEL_EN',
        'CONF_QUICKLOOKS_WIDTH', 'CONF_QUICKLOOKS_SPACING',
        'CONF_DATASETS_SECTION_LABEL_FR', 'CONF_DATASETS_SECTION_LABEL_EN',
      ].includes(key))
    const allFields = wrapper.find(Field)
    wrapperFieldsProps.forEach((fieldProperty) => {
      const fieldName = wrapperInstance[fieldProperty]
      const field = allFields.findWhere(currentField => currentField.props().name === fieldName)
      assert.lengthOf(field, 1, `There should be the field for configuration key "${fieldProperty} (${fieldName})"`)
    })

    // also verify the module pane state field
    const paneField = wrapper.find(ModulePaneStateField)
    assert.lengthOf(paneField, 1, 'There should be the pane field')
    assert.equal(paneField.props().currentNamespace, props.currentNamespace, 'It should use the right namespace')

    // finally check that each data view configuration array is available
    const listFields = wrapper.find(AttributesListConfigurationComponent)
    assert.lengthOf(listFields.findWhere(l => l.props().attributesListFieldName === 'conf.data.columns'), 1, 'There should be view columns list field')
    assert.lengthOf(listFields.findWhere(l => l.props().attributesListFieldName === 'conf.data.facets'), 1, 'There should be view facets list field')
    assert.lengthOf(listFields.findWhere(l => l.props().attributesListFieldName === 'conf.data.sorting'), 1, 'There should be view sorting list field')
  })
})
