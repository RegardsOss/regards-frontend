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
import find from 'lodash/find'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import RaisedButton from 'material-ui/RaisedButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import {
  buildTestContext, testSuiteHelpers, DumpProvider, ReduxFormTestHelper,
} from '@regardsoss/tests-helpers'
import { CommonDomain } from '@regardsoss/domain'
import { RenderPluginPluginParameterField } from '../../src/form-utils/RenderPluginPluginParameterField'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test RenderPluginPluginParameterField
* @author Sébastien Binda
*/
describe('[MICROSERVICE PLUGIN CONFIGURATOR] Testing RenderPluginPluginParameterField', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RenderPluginPluginParameterField)
  })
  it('should render correctly', () => {
    const microserviceName = 'rs-test'
    const pluginConf = DumpProvider.getEntityContentBy('CommonClient', 'PluginConfiguration', 'content.id', 202)
    assert.isDefined(pluginConf)
    const pluginMetaData = DumpProvider.getEntityContentBy('CommonClient', 'PluginMetaData', 'content.pluginId', 'FullPluginExample')
    assert.isDefined(pluginMetaData)
    const parameter = find(pluginMetaData.parameters, (p) => p.type === CommonDomain.PluginParameterTypes.PLUGIN)
    assert.isDefined(parameter)
    const input = ReduxFormTestHelper.getInputFieldProps('conf', parameter)
    const props = {
      label: 'test',
      microserviceName,
      pluginParameterType: parameter,
      input,
      fetchPluginMetadataList: () => new Promise(() => { }),
      fetchPluginConfigurationList: () => new Promise(() => { }),
    }
    const enzymeWrapper = shallow(<RenderPluginPluginParameterField {...props} />, { context })
    assert.equal(enzymeWrapper.find(RaisedButton).length, 1, 'There should be a RaisedButton rendered')
    assert.equal(enzymeWrapper.find(IconMenu).length, 1, 'There should be a IconMenu rendered')
    assert.equal(enzymeWrapper.find(MenuItem).length, 1, 'There should be only the no selection MenuItem rendered as no plugin has been fetched')
    enzymeWrapper.setState({
      pluginMetaDataList: [{ content: { pluginId: 'plugin1', version: '1.0.0' } }, { content: { pluginId: 'plugin2', version: '1.0.0' } }],
    })
    assert.equal(enzymeWrapper.find(MenuItem).length, 3, 'There should be 3 MenuItem rendered as 2 plugin has been fetched')
  })
})
