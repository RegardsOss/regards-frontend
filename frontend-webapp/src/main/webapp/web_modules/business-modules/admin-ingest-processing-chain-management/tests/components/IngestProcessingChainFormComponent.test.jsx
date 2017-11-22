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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { IngestProcessingChainFormComponent } from '../../src/components/IngestProcessingChainFormComponent'
import { PluginFormComponent } from '../../src/components/PluginFormComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test IngestProcessingChainFormComponent
* @author Sébastien Binda
*/
describe('[ADMIN INGEST PROCESSING CHAIN MANAGEMENT] Testing IngestProcessingChainFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(IngestProcessingChainFormComponent)
  })
  it('should render correctly on creation mode', () => {
    const props = {
      onSubmit: () => { },
      onBack: () => { },
      // from reduxForm
      change: () => { },
      initialize: () => { },
      invalid: false,
      submitting: false,
      handleSubmit: () => { },
      getField: () => { },
    }
    const enzymeWrapper = shallow(<IngestProcessingChainFormComponent {...props} />, { context })
    assert.equal(enzymeWrapper.find(PluginFormComponent).length, 5, 'There should be 5 PluginFormComponent rendered. One for each processing chain plugable step.')
  })
  it('should render correctly on edition mode', () => {
    const preprocessingPlugin = {
      id: 1,
      pluginId: 'prePropPlugin',
      label: 'preProPluginConf',
      version: '1.0.0',
      priorityOrder: 1,
      active: true,
      pluginClassName: 'prePropClassName',
      parameters: [],
      iconUrl: null,
    }
    const validationPlugin = {
      id: 2,
      pluginId: 'validationPlugin',
      label: 'validationPluginConf',
      version: '1.0.0',
      priorityOrder: 1,
      active: true,
      pluginClassName: 'validationPluginClassName',
      parameters: [],
      iconUrl: null,
    }
    const generationPlugin = {
      id: 3,
      pluginId: 'generationPlugin',
      label: 'generationPluginConf',
      version: '1.0.0',
      priorityOrder: 1,
      active: true,
      pluginClassName: 'generationPluginClassName',
      parameters: [],
      iconUrl: null,
    }
    const tagPlugin = {
      id: 4,
      pluginId: 'tagPlugin',
      label: 'tagPluginConf',
      version: '1.0.0',
      priorityOrder: 1,
      active: true,
      pluginClassName: 'tagPluginClassName',
      parameters: [],
      iconUrl: null,
    }
    const postprocessingPlugin = {
      id: 5,
      pluginId: 'postProcessingPlugin',
      label: 'postProcessingPluginConf',
      version: '1.0.0',
      priorityOrder: 1,
      active: true,
      pluginClassName: 'postProcessingPluginClassName',
      parameters: [],
      iconUrl: null,
    }
    const props = {
      processingChain: {
        id: 1,
        name: 'test',
        description: 'test',
        preprocessingPlugin,
        validationPlugin,
        generationPlugin,
        tagPlugin,
        postprocessingPlugin,
      },
      onSubmit: () => { },
      onBack: () => { },
      // from reduxForm
      change: () => { },
      initialize: () => { },
      invalid: false,
      submitting: false,
      handleSubmit: () => { },
      getField: () => { },
    }
    const enzymeWrapper = shallow(<IngestProcessingChainFormComponent {...props} />, { context })
    assert.equal(enzymeWrapper.find(PluginFormComponent).length, 5, 'There should be 5 PluginFormComponent rendered. One for each processing chain plugable step.')
    assert.equal(enzymeWrapper.find(PluginFormComponent).find({ fieldNamePrefix: 'validationPlugin' }).prop('pluginConf'), validationPlugin, 'Invalid validationPlugin configuration used for PluginFormComponent')
    assert.equal(enzymeWrapper.find(PluginFormComponent).find({ fieldNamePrefix: 'generationPlugin' }).prop('pluginConf'), generationPlugin, 'Invalid generationPlugin configuration used for PluginFormComponent')
    assert.equal(enzymeWrapper.find(PluginFormComponent).find({ fieldNamePrefix: 'tagPlugin' }).prop('pluginConf'), tagPlugin, 'Invalid tagPlugin configuration used for PluginFormComponent')
    assert.equal(enzymeWrapper.find(PluginFormComponent).find({ fieldNamePrefix: 'postprocessingPlugin' }).prop('pluginConf'), postprocessingPlugin, 'Invalid postprocessingPlugin configuration used for PluginFormComponent')
    assert.equal(enzymeWrapper.find(PluginFormComponent).find({ fieldNamePrefix: 'preprocessingPlugin' }).prop('pluginConf'), preprocessingPlugin, 'Invalid preprocessingPlugin configuration used for PluginFormComponent')
  })
})
