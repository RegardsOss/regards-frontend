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
import GenericPluginParameter from '../../src/components/parameters/GenericPluginParameter'
import PluginParameterString from '../../src/components/parameters/PluginParameterString'
import PluginParameterNumber from '../../src/components/parameters/PluginParameterNumber'
import PluginParameterBoolean from '../../src/components/parameters/PluginParameterBoolean'
import PluginParameterPlugin from '../../src/components/parameters/PluginParameterPlugin'

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN PROJECT MANAGEMENT] Testing generic plugin parameter component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(GenericPluginParameter)
    assert.isDefined(PluginParameterString)
    assert.isDefined(PluginParameterNumber)
    assert.isDefined(PluginParameterBoolean)
    assert.isDefined(PluginParameterPlugin)
  })

  it('should render a PluginParameterString when the parameter type is a String', () => {
    const props = {
      pluginParameter: {
        id: 0,
        name: 'suffix',
        value: '_thesuffix',
        dynamic: false,
      },
      pluginParameterType: {
        name: 'suffix',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
      },
      microserviceName: STATIC_CONF.MSERVICES.DAM,
      mode: 'edit',
    }
    const enzymeWrapper = shallow(<GenericPluginParameter {...props} />)
    const subComponent = enzymeWrapper.find(PluginParameterString)
    expect(subComponent).to.have.length(1)
  })

  it('should render a PluginParameterNumber when the parameter type is a Number', () => {
    const props = {
      pluginParameter: {
        id: 0,
        name: 'height',
        value: '23',
        dynamic: false,
      },
      pluginParameterType: {
        name: 'height',
        type: 'java.lang.Integer',
        paramType: 'PRIMITIVE',
      },
      microserviceName: STATIC_CONF.MSERVICES.DAM,
      mode: 'edit',
    }
    const enzymeWrapper = shallow(<GenericPluginParameter {...props} />)
    const subComponent = enzymeWrapper.find(PluginParameterNumber)
    expect(subComponent).to.have.length(1)
  })

  it('should render a PluginParameterBoolean when the parameter type is a Boolean', () => {
    const props = {
      pluginParameter: {
        id: 0,
        name: 'isActive',
        value: 'false',
        dynamic: false,
      },
      pluginParameterType: {
        name: 'isActive',
        type: 'java.lang.Boolean',
        paramType: 'PRIMITIVE',
      },
      microserviceName: STATIC_CONF.MSERVICES.DAM,
      mode: 'edit',
    }
    const enzymeWrapper = shallow(<GenericPluginParameter {...props} />)
    const subComponent = enzymeWrapper.find(PluginParameterBoolean)
    expect(subComponent).to.have.length(1)
  })

  it('should render a PluginParameterPlugin when the parameter type is a Plugin', () => {
    const props = {
      microserviceName: STATIC_CONF.MSERVICES.DAM,
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
      mode: 'edit',
    }
    const enzymeWrapper = shallow(<GenericPluginParameter {...props} />)
    const subComponent = enzymeWrapper.find(PluginParameterPlugin)
    expect(subComponent).to.have.length(1)
  })
})
