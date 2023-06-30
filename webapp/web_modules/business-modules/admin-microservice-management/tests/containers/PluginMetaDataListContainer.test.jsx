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
import { expect, assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { PluginMetaDataListContainer } from '../../src/containers/PluginMetaDataListContainer'

const context = buildTestContext()

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN MICROSERVICE MANAGEMENT] Testing plugin metata data list container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginMetaDataListContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })

  it('should render self and subcomponents', () => {
    const props = {
      // from router
      params: {
        project: 'projectName',
        microserviceName: 'some-microservice',
      },
      // from mapStateToProps
      pluginMetaDataListOrganizedByType: [
        {
          type: 'someType',
          item: {
            pluginId: 6,
            pluginType: 'Other',
            pluginClassName: 'Kerberos',
            author: 'Jules Verne',
            version: '0.0.5',
            description: 'Allows the users to log in with their usual email and password.',
          },
        }, {
          type: 'someOtherType',
          item: {
            pluginId: 7,
            pluginType: 'Other',
            pluginClassName: 'Toto',
            author: 'Jean-Paul Sartre',
            version: '2.0.0',
            description: 'This plugin is pretty useless actually.',
          },
        },
      ],
      isPluginMetaDataListFetching: false,
      // from mapDispatchToProps1
      fetchClearPluginCache: () => { },
      fetchPluginTypeList: () => { },
      fetchPluginMetaDataList: () => { },
    }

    const enzymeWrapper = shallow(<PluginMetaDataListContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
  })
})
