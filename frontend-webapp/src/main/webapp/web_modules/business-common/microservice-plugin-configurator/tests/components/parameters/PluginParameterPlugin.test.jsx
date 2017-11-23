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
import { expect, assert } from 'chai'
import { shallow } from 'enzyme'
import values from 'lodash/values'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import IconMenu from 'material-ui/IconMenu'
import { Field } from '@regardsoss/form-utils'
import { PluginParameterPlugin } from '../../../src/components/parameters/PluginParameterPlugin'

const options = {
  context: buildTestContext(),
}

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[MICROSERVICE PLUGIN CONFIGURATOR] Testing plugin parameter plugin component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginParameterPlugin)
    assert.isDefined(ListItem)
    assert.isDefined(Field)
    assert.isDefined(IconMenu)
    assert.isDefined(RaisedButton)
  })

  it('should render a Raised Button and an IconMenu and Field', () => {
    const props = {
      microserviceName: STATIC_CONF.MSERVICES.DAM,
      pluginMetaData: DumpProvider.getFirstEntity('CommonClient', 'PluginMetaData'),
      pluginConfigurationList: values(DumpProvider.get('CommonClient', 'PluginConfiguration')),
      pluginMetaDataList: DumpProvider.get('CommonClient', 'PluginMetaData'),
      pluginParameter: {
        id: 0,
        name: 'plgInterface',
        value: '40',
        dynamic: false,
      },
      pluginParameterType: {
        name: 'plgInterface',
        type: 'IPluginInterfacer',
        paramType: 'PLUGIN',
      },
      fetchPluginConfigurationList: () => { },
    }
    const enzymeWrapper = shallow(<PluginParameterPlugin {...props} />, options)
    expect(enzymeWrapper.find(Field)).to.have.length(1)
    expect(enzymeWrapper.find(IconMenu)).to.have.length(1)
    expect(enzymeWrapper.find(RaisedButton)).to.have.length(1)
  })
})
