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
import { RadioButton } from 'material-ui/RadioButton'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { PluginConfigurationPickerComponent } from '@regardsoss/components'
import { Field } from '@regardsoss/form-utils'
import { SearchEngineConfigurationFormComponent } from '../../../src/components/configuration/SearchEngineConfigurationFormComponent'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test SearchEngineConfigurationFormComponent
* @author Sébastien Binda
*/
describe('[ADMIN SEARCH ENGINES] Testing SearchEngineConfigurationFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchEngineConfigurationFormComponent)
  })
  it('should render correctly a create form', () => {
    const props = {
      mode: 'create',
      onBack: () => { },
      onUpdate: () => { },
      onCreate: () => { },
      pluginConfigurationList: DumpProvider.get('CommonClient', 'PluginConfiguration'),
      pluginMetaDataList: DumpProvider.get('CommonClient', 'PluginMetaData'),
      dataset: DumpProvider.getFirstEntityContent('DataManagementClient', 'Dataset'),
      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => { },
      initialize: () => { },
      change: () => { },
    }
    assert.isNotEmpty(props.pluginMetaDataList)
    assert.isNotEmpty(props.pluginConfigurationList)
    const enzymeWrapper = shallow(<SearchEngineConfigurationFormComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find('form'), 1, 'The component should display a form')
    assert.lengthOf(enzymeWrapper.find(Field).find({ name: 'label' }), 1, 'label field should be displayed')
    assert.lengthOf(enzymeWrapper.find(Field).find({ name: 'dataset' }), 0, 'dataset field should not be displayed by default')
    assert.lengthOf(enzymeWrapper.find(RadioButton), 2, 'The component should display two radio buttons')
    const pluginPicker = enzymeWrapper.find(PluginConfigurationPickerComponent)
    assert.lengthOf(pluginPicker, 1, 'The component should display two radio buttons')
    assert.equal(pluginPicker.at(0).prop('pluginMetaDataList'), props.pluginMetaDataList, 'Invalid prop for PluginConfigurationPickerComponent')
    assert.equal(pluginPicker.at(0).prop('pluginConfigurationList'), props.pluginConfigurationList, 'Invalid prop for PluginConfigurationPickerComponent')
    assert.equal(pluginPicker.at(0).prop('currentPluginConfiguration'), props.currentPluginConfiguration, 'Invalid prop for PluginConfigurationPickerComponent')

    assert.lengthOf(enzymeWrapper.find(Field).find({ name: 'configuration' }), 0, 'The component should not isplay plugin configuration field by default')

    const datasetRadio = enzymeWrapper.find(RadioButton).find({ value: 'selected' }).at(0)
    assert.isDefined(datasetRadio)
  })

  it('should render correctly a edition form', () => {
    const props = {
      mode: 'edit',
      searchEngineConfiguration: DumpProvider.getNthEntity('CatalogClient', 'SearchEngineConfiguration', 1),
      onBack: () => { },
      onUpdate: () => { },
      onCreate: () => { },
      pluginConfigurationList: DumpProvider.get('CommonClient', 'PluginConfiguration'),
      pluginMetaDataList: DumpProvider.get('CommonClient', 'PluginMetaData'),
      dataset: DumpProvider.getFirstEntityContent('DataManagementClient', 'Dataset'),
      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => { },
      initialize: () => { },
      change: () => { },
    }
    assert.isNotEmpty(props.pluginMetaDataList)
    assert.isNotEmpty(props.pluginConfigurationList)
    assert.isDefined(props.searchEngineConfiguration)
    const enzymeWrapper = shallow(<SearchEngineConfigurationFormComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find('form'), 1, 'The component should display a form')
    assert.lengthOf(enzymeWrapper.find(Field).find({ name: 'label' }), 1, 'label field should be displayed')
    assert.lengthOf(enzymeWrapper.find(Field).find({ name: 'dataset' }), 1, 'dataset field should be displayed as the actual configuration is associated to a dataset')
    assert.lengthOf(enzymeWrapper.find(RadioButton), 2, 'The component should display two radio buttons')
    const pluginPicker = enzymeWrapper.find(PluginConfigurationPickerComponent)
    assert.lengthOf(pluginPicker, 1, 'The component should display two radio buttons')
    assert.equal(pluginPicker.at(0).prop('pluginMetaDataList'), props.pluginMetaDataList, 'Invalid prop for PluginConfigurationPickerComponent')
    assert.equal(pluginPicker.at(0).prop('pluginConfigurationList'), props.pluginConfigurationList, 'Invalid prop for PluginConfigurationPickerComponent')
    assert.equal(pluginPicker.at(0).prop('currentPluginConfiguration'), props.searchEngineConfiguration.content.configuration, 'Invalid prop for PluginConfigurationPickerComponent')

    assert.lengthOf(enzymeWrapper.find(Field).find({ name: 'configuration' }), 0, 'The component should not isplay plugin configuration field by default')
  })
})
