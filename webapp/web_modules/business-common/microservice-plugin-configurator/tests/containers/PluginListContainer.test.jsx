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
import PluginListComponent from '../../src/components/PluginListComponent'
import { PluginListContainer } from '../../src/containers/PluginListContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test  PluginListContainer
* @author Sébastien Binda
*/
describe('[MICROSERVICE PLUGIN CONFIGURATOR] Testing  PluginListContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginListContainer)
  })
  it('should render correctly', () => {
    const fetchStub = sinon.stub()
    fetchStub.returns(new Promise(() => { }))
    const props = {
      title: 'title',
      selectLabel: 'select ...',
      microserviceName: 'rs-ms',
      pluginType: 'pluginTest',
      selectedPluginId: null,
      handleSelect: () => { },
      fetchPlugins: fetchStub,
    }
    const enzymeWrapper = shallow(<PluginListContainer {...props} />, { context })
    assert.equal(enzymeWrapper.find(PluginListComponent).length, 1, 'There should be a PluginListComponent rendered')
    assert.equal(fetchStub.calledOnce, true, 'Fetch plugins method should be called once at initialization')
    assert.equal(fetchStub.calledWith(props.microserviceName, props.pluginType), true, 'Fetch plugins method is not called with valid parameters')
  })
})
