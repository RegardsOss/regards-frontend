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
import { expect, assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { PluginConfigurationFormContainer } from '../../../src/containers/plugin/PluginConfigurationFormContainer'
import PluginConfigurationFormComponent from '../../../src/components/plugin/PluginConfigurationFormComponent'

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN MICROSERVICE MANAGEMENT] Testing plugin configuration form container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginConfigurationFormContainer)
    assert.isDefined(PluginConfigurationFormComponent)
  })

  it('should render self and subcomponents in create mode', () => {
    const props = {
      // from router
      params: {
        project: 'projectName',
        microserviceName: 'some-microservice',
        pluginId: 'aPluginId',
        pluginConfigurationId: '0',
        formMode: 'create',
      },
      // from mapStateToProps
      pluginConfiguration: {
        pluginId: 6,
        pluginType: 'Other',
        pluginClassName: 'Kerberos',
        author: 'Jules Verne',
        version: '0.0.5',
        description: 'Allows the users to log in with their usual email and password.',
      },
      pluginMetaData: {
        pluginId: '8',
        pluginType: 'Other',
        pluginClassName: 'Titi',
        author: 'Victor Hugo',
        version: '2.0.5',
        description: 'This plugin is pretty useless actually.',
      },
      isPluginConfigurationFetching: false,
      // from mapDispatchToProps
      fetchPluginConfiguration: () => { },
      createPluginConfiguration: () => { },
      updatePluginConfiguration: () => { },
      fetchPluginMetaDataList: () => { },
    }
    const enzymeWrapper = shallow(<PluginConfigurationFormContainer {...props} />)
    expect(enzymeWrapper.find(PluginConfigurationFormComponent)).to.have.length(1)
  })
})
