/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, DumpProvider, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AppBar from 'material-ui/AppBar'
import PluginMetaDataListComponent from '../../src/components/PluginMetaDataListComponent'

const context = buildTestContext()

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN MICROSERVICE MANAGEMENT] Testing plugin metata data list component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginMetaDataListComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      microserviceName: 'some-microservice',
      // from mapStateToProps
      pluginMetaDataList: DumpProvider.get('CommonClient', 'PluginMetaData'),
      pluginTypes: [],
      getProjectConfigurationListURL: () => ' ',
      getAddURL: () => ' ',
      getBackURL: () => ' ',
      onClearPluginCache: () => { },
    }

    const enzymeWrapper = shallow(<PluginMetaDataListComponent {...props} />, { context })
    expect(enzymeWrapper.find(AppBar)).to.have.length(2)
  })
})
