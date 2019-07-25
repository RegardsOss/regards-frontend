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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { expect, assert } from 'chai'
import { PluginConfigurationContainer } from '../../../src/containers/plugin/PluginConfigurationContainer'
import PluginConfigurationComponent from '../../../src/components/plugin/PluginConfigurationComponent'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN MICROSERVICE MANAGEMENT] Testing plugin configuration container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginConfigurationContainer)
    assert.isDefined(PluginConfigurationComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      // from router
      params: {
        project: 'projectName',
        microserviceName: 'some-microservice',
        pluginId: 'aPluginId',
        pluginConfigurationId: 0,
        formMode: 'create',
      },
      // from mapStateToProps
      pluginConfiguration: {
        content: {
          pluginId: '6',
          pluginType: 'Other',
          pluginClassName: 'Kerberos',
          author: 'Jules Verne',
          version: '0.0.5',
          description: 'Allows the users to log in with their usual email and password.',
        },
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
      updatePluginConfiguration: () => {
      },
      deletePluginConfiguration: () => {
      },
    }
    const enzymeWrapper = shallow(<PluginConfigurationContainer {...props} />, { context })
    expect(enzymeWrapper.find(PluginConfigurationComponent)).to.have.length(1)
  })
})
