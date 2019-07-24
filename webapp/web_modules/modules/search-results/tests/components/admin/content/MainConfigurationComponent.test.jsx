/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { ModulePaneStateField } from '@regardsoss/modules-api'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DamDomain } from '@regardsoss/domain'
import MainConfigurationComponent from '../../../../src/components/admin/content/MainConfigurationComponent'
import styles from '../../../../src/styles'
import { configuration as dataConfiguration } from '../../../dumps/data.configuration.dump'
import { configuration as documentsConfiguration } from '../../../dumps/documents.configuration.dump'

const context = buildTestContext(styles)

/**
 * Test MainConfigurationComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing MainConfigurationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MainConfigurationComponent)
  })
  // Test that the component renders correctly with data / dataset and with documents
  const testCases = [{
    label: 'data and datasets',
    values: dataConfiguration,
    expectedViewsValue: MainConfigurationComponent.DISPLAYED_TYPES_CHOICES.DATA_AND_DATASET,
  }, {
    label: 'documents',
    values: documentsConfiguration,
    expectedViewsValue: MainConfigurationComponent.DISPLAYED_TYPES_CHOICES.DOCUMENTS,
  }]

  testCases.forEach(({ label, values, expectedViewsValue }) => it(`should render correctly with ${label} form values`, () => {
    const props = {
      currentNamespace: 'conf',
      currentFormValues: values,
      documentsForbidden: false,
      changeField: () => {},
    }
    const enzymeWrapper = shallow(<MainConfigurationComponent {...props} />, { context })
    // 1 - pane state presentation field
    const paneStateField = enzymeWrapper.find(ModulePaneStateField)
    assert.lengthOf(paneStateField, 1, 'There should be presentation pane state field')
    assert.equal(paneStateField.props().currentNamespace, props.currentNamespace, 'Pane state field namespace should be correctly set up')

    // 2 - views selector (check documents is enabled)
    const viewsRadioGroup = enzymeWrapper.find(RadioButtonGroup)
    assert.lengthOf(viewsRadioGroup, 1, 'There should be views radio button group')
    testSuiteHelpers.assertWrapperProperties(viewsRadioGroup, {
      onChange: enzymeWrapper.instance().onChangeDisplayedTypes,
      valueSelected: expectedViewsValue,
    }, 'Views selector group properties should be correctly set up')
    const radioButtons = viewsRadioGroup.find(RadioButton)
    assert.lengthOf(radioButtons, 3, 'There should be 3 possible view types selectors (data, data & dataset, documents)')
    assert.lengthOf(radioButtons.findWhere(n => n.props().disabled), 0, 'All choices should be available')
  }))

  it('should render correctly with disabled documents option', () => {
    const props = {
      currentNamespace: 'conf',
      currentFormValues: dataConfiguration,
      documentsForbidden: true,
      changeField: () => {},
    }
    const enzymeWrapper = shallow(<MainConfigurationComponent {...props} />, { context })
    // 1 - pane state presentation field
    const paneStateField = enzymeWrapper.find(ModulePaneStateField)
    assert.lengthOf(paneStateField, 1, 'There should be presentation pane state field')
    assert.equal(paneStateField.props().currentNamespace, props.currentNamespace, 'Pane state field namespace should be correctly set up')

    // 2 - views selector (check documents is enabled)
    const viewsRadioGroup = enzymeWrapper.find(RadioButtonGroup)
    assert.lengthOf(viewsRadioGroup, 1, 'There should be views radio button group')
    testSuiteHelpers.assertWrapperProperties(viewsRadioGroup, {
      onChange: enzymeWrapper.instance().onChangeDisplayedTypes,
      valueSelected: MainConfigurationComponent.DISPLAYED_TYPES_CHOICES.DATA_AND_DATASET,
    }, 'Views selector group properties should be correctly set up')
    const radioButtons = viewsRadioGroup.find(RadioButton)
    assert.lengthOf(radioButtons, 3, 'There should be 3 possible view types selectors (data, data & dataset, documents)')
    const disabledRadio = radioButtons.findWhere(n => n.props().disabled)
    assert.lengthOf(disabledRadio, 1, 'There should be one disabled radio button')
    assert.equal(disabledRadio.props().value, MainConfigurationComponent.DISPLAYED_TYPES_CHOICES.DOCUMENTS, 'It should be document view selector')
  })
  it('should update correctly module views groups state on user choice', () => {
    const spiedChangeField = {
      namespace: null,
      values: null,
    }
    const props = {
      currentNamespace: 'conf',
      currentFormValues: documentsConfiguration,
      documentsForbidden: false,
      changeField: (namespace, newValues) => {
        spiedChangeField.namespace = namespace
        spiedChangeField.values = newValues
      },
    }
    const enzymeWrapper = shallow(<MainConfigurationComponent {...props} />, { context })
    // 1 - Init state (documents)
    let viewsRadioGroup = enzymeWrapper.find(RadioButtonGroup)
    testSuiteHelpers.assertWrapperProperties(viewsRadioGroup, {
      onChange: enzymeWrapper.instance().onChangeDisplayedTypes,
      valueSelected: MainConfigurationComponent.DISPLAYED_TYPES_CHOICES.DOCUMENTS, // should display documents choice
    }, 'Views selector group properties should be correctly set up')
    assert.isNull(spiedChangeField.values, 'Change field should not have been called yet')
    // 2 -  Set view in data only mode
    enzymeWrapper.instance().onChangeDisplayedTypes(null, MainConfigurationComponent.DISPLAYED_TYPES_CHOICES.DATA)
    // check change field was called and only data view is enabled now
    assert.equal(spiedChangeField.namespace, 'conf', 'Change field should have been called for DATA (2)')
    assert.isTrue(spiedChangeField.values.viewsGroups[DamDomain.ENTITY_TYPES_ENUM.DATA].enabled, 'Data view should be enabled (2)')
    assert.isFalse(spiedChangeField.values.viewsGroups[DamDomain.ENTITY_TYPES_ENUM.DATASET].enabled, 'Dataset view be disabled (2)')
    assert.isFalse(spiedChangeField.values.viewsGroups[DamDomain.ENTITY_TYPES_ENUM.DOCUMENT].enabled, 'Document view should be disabled (2)')
    // 3 - Update properties to match that new mode and change to data & dataset
    enzymeWrapper.setProps({
      ...props,
      currentFormValues: spiedChangeField.values,
    })
    viewsRadioGroup = enzymeWrapper.find(RadioButtonGroup)
    testSuiteHelpers.assertWrapperProperties(viewsRadioGroup, {
      onChange: enzymeWrapper.instance().onChangeDisplayedTypes,
      valueSelected: MainConfigurationComponent.DISPLAYED_TYPES_CHOICES.DATA, // should display data only choice
    }, 'Views selector group properties should be correctly set up (3)')
    enzymeWrapper.instance().onChangeDisplayedTypes(null, MainConfigurationComponent.DISPLAYED_TYPES_CHOICES.DATA_AND_DATASET)
    assert.isTrue(spiedChangeField.values.viewsGroups[DamDomain.ENTITY_TYPES_ENUM.DATA].enabled, 'Data view should be enabled (3)')
    assert.isTrue(spiedChangeField.values.viewsGroups[DamDomain.ENTITY_TYPES_ENUM.DATASET].enabled, 'Dataset view be enabled (3)')
    assert.isFalse(spiedChangeField.values.viewsGroups[DamDomain.ENTITY_TYPES_ENUM.DOCUMENT].enabled, 'Document view should be disabled (3)')
    // 4 - Finally Show last values (data and dataset) and change for documents
    enzymeWrapper.setProps({
      ...props,
      currentFormValues: spiedChangeField.values,
    })
    viewsRadioGroup = enzymeWrapper.find(RadioButtonGroup)
    testSuiteHelpers.assertWrapperProperties(viewsRadioGroup, {
      onChange: enzymeWrapper.instance().onChangeDisplayedTypes,
      valueSelected: MainConfigurationComponent.DISPLAYED_TYPES_CHOICES.DATA_AND_DATASET, // should display data only choice
    }, 'Views selector group properties should be correctly set up (4)')
    enzymeWrapper.instance().onChangeDisplayedTypes(null, MainConfigurationComponent.DISPLAYED_TYPES_CHOICES.DOCUMENTS)
    assert.isFalse(spiedChangeField.values.viewsGroups[DamDomain.ENTITY_TYPES_ENUM.DATA].enabled, 'Data view should be disabled (4)')
    assert.isFalse(spiedChangeField.values.viewsGroups[DamDomain.ENTITY_TYPES_ENUM.DATASET].enabled, 'Dataset view be disabled (4)')
    assert.isTrue(spiedChangeField.values.viewsGroups[DamDomain.ENTITY_TYPES_ENUM.DOCUMENT].enabled, 'Document view should be enabled (4)')
  })
})
