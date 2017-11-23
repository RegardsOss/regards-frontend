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
import { PluginConfigurator, PluginListContainer } from '@regardsoss/microservice-plugin-configurator'
import PluginFormComponent from '../../src/components/PluginFormComponent'
import IngestProcessingPluginType from '../../src/components/IngestProcessingPluginType'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test PluginFormComponent
* @author Sébastien Binda
*/
describe('[ADMIN INGEST PROCESSING CHAIN MANAGEMENT] Testing PluginFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginFormComponent)
  })
  it('should render correctly', () => {
    const pluginMetaData = {
      pluginId: 'generationPlugin',
      pluginClassName: 'generationPluginClassName',
      interfaceNames: ['IClass'],
      author: 'author',
      version: '1.0.0',
      parameters: [],
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
    const props = {
      title: 'pluginForm',
      selectLabel: 'select',
      ingestPluginType: IngestProcessingPluginType.GENERATION,
      pluginConf: generationPlugin,
      fieldNamePrefix: 'generationPlugin',
      reduxFormChange: () => { },
      reduxFormGetField: () => { },
      reduxFormInitialize: () => { },
    }
    const enzymeWrapper = shallow(<PluginFormComponent {...props} />, { context })
    assert.equal(enzymeWrapper.find(PluginListContainer).length, 1, 'There should be a PluginListContainer rendered')
    assert.equal(enzymeWrapper.find(PluginConfigurator).length, 0, 'There should not be a PluginConfigurator rendered until a pluginMetaData is selected')
    enzymeWrapper.instance().handleSelectPluginMetaData(pluginMetaData)
    enzymeWrapper.update()
    assert.equal(enzymeWrapper.find(PluginConfigurator).length, 1, 'There should be a PluginConfigurator rendered after pluginMetaData is selected')
  })
})
