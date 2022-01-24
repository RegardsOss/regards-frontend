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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { FieldArray } from '@regardsoss/form-utils'
import { ModulePaneStateField } from '@regardsoss/modules-api'
import { AttributesListConfigurationComponent } from '@regardsoss/attributes-common'
import ModuleForm from '../../../src/components/admin/ModuleForm'
import SearchResultForm from '../../../src/components/admin/SearchResultForm'
import SelectedLevelFormRender from '../../../src/components/admin/levels/SelectedLevelFormRender'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing ModuleForm', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModuleForm)
  })

  it('should render properly', () => {
    const props = {
      project: 'any',
      appName: 'any',
      adminForm: {
        isCreating: true,
        isDuplicating: false,
        isEditing: false,
        changeField: () => { },
        form: {
          conf: {
            graphDatasetAttributes: [],
          },
        },
      },
      collectionModels: {},
      selectableAttributes: {},
    }
    const enzymeWrapper = shallow(<ModuleForm {...props} />, { context })
    // 1 - Test pane field
    const paneField = enzymeWrapper.find(ModulePaneStateField)
    assert.lengthOf(paneField, 1, 'There should be the pane field')
    assert.equal(paneField.props().currentNamespace, props.currentNamespace, 'It should use the right namespace')
    // 2 - test render component in array
    const field = enzymeWrapper.find(FieldArray)
    assert.equal(field.length, 1, 'There should be a field for levels')
    assert.equal(field.at(0).props().component, SelectedLevelFormRender, 'The render used should be the specific levels render')
    // 3 - check dataset attributes list configuration field
    const listConfigurationField = enzymeWrapper.find(AttributesListConfigurationComponent)
    assert.lengthOf(listConfigurationField, 1, 'There should be attributes list configuration field')
    assert.equal(listConfigurationField.props().attributesListFieldName, enzymeWrapper.instance().DATASET_ATTRIBUTES_FIELD_NAME,
      'It should be configurated to point out the right configuration field')
    assert.isFalse(listConfigurationField.props().allowAttributesGroups, 'It should forbid groups configuration')
    assert.isTrue(listConfigurationField.props().allowLabel, 'It should allow label configuration')
    // 4 - verify search result form is added
    assert.equal(enzymeWrapper.find(SearchResultForm).length, 1, 'The search result configuration form should be used to configure search results')
  })
})
