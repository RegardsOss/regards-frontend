/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import sinon from 'sinon'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import PluginFormComponent from '../../src/components/PluginFormComponent'
import { PluginFormContainer } from '../../src/containers/PluginFormContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test PluginConfigurationFormContainer
* @author Sébastien Binda
*/
describe('[MICROSERVICE PLUGIN CONFIGURATOR] Testing PluginConfigurationFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginFormContainer)
  })
  it('should render correctly without plugin configuration provided', () => {
    const fetchPluginStub = sinon.stub()
    fetchPluginStub.returns(new Promise(() => { }))
    const fetchMetaDataStub = sinon.stub()
    fetchMetaDataStub.returns(new Promise(() => { }))
    const props = {
      microserviceName: 'rs-ms',
      pluginId: 'pluginId',
      formMode: 'create',
      backUrl: 'url',
      fetchPluginConfiguration: fetchPluginStub,
      createPluginConfiguration: () => new Promise(() => { }),
      updatePluginConfiguration: () => new Promise(() => { }),
      fetchPluginMetaData: fetchMetaDataStub,
    }
    const enzymeWrapper = shallow(<PluginFormContainer {...props} />, { context })
    assert.equal(enzymeWrapper.find(PluginFormComponent).length, 1, 'There should be a PluginFormComponent rendered')

    assert.equal(fetchMetaDataStub.calledOnce, true, 'Fetch plugins metadatas method should be called once at initialization')
    assert.equal(fetchMetaDataStub.calledWith(props.microserviceName), true, 'Fetch plugins metadatas method is not called with valid parameters')

    assert.equal(fetchPluginStub.callCount, 0, 'Fetch plugin configuration shouldnt be call as no pluginConfiguration is provided')
  })
  it('should render correctly wit plugin configuration provided', () => {
    const fetchPluginStub = sinon.stub()
    fetchPluginStub.returns(new Promise(() => { }))
    const fetchMetaDataStub = sinon.stub()
    fetchMetaDataStub.returns(new Promise(() => { }))
    const props = {
      microserviceName: 'rs-ms',
      pluginId: 'pluginId',
      pluginConfigurationId: 12,
      formMode: 'create',
      backUrl: 'url',
      fetchPluginConfiguration: fetchPluginStub,
      createPluginConfiguration: () => new Promise(() => { }),
      updatePluginConfiguration: () => new Promise(() => { }),
      fetchPluginMetaData: fetchMetaDataStub,
    }
    const enzymeWrapper = shallow(<PluginFormContainer {...props} />, { context })
    assert.equal(enzymeWrapper.find(PluginFormComponent).length, 1, 'There should be a PluginFormComponent rendered')

    assert.equal(fetchMetaDataStub.calledOnce, true, 'Fetch plugins metadatas method should be called once at initialization')
    assert.equal(fetchMetaDataStub.calledWith(props.microserviceName), true, 'Fetch plugins metadatas method is not called with valid parameters')

    assert.equal(fetchPluginStub.calledOnce, true, 'Fetch plugins configuration method should be called once at initialization')
    assert.equal(fetchPluginStub.calledWith(props.pluginConfigurationId, props.pluginId, props.microserviceName), true, 'Fetch plugins configuration method is not called with valid parameters')
  })
})
