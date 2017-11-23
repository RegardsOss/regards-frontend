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
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { ListItem } from 'material-ui/List'
import { Field } from '@regardsoss/form-utils'
import PluginParameterBoolean from '../../../src/components/parameters/PluginParameterBoolean'

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
const context = buildTestContext()

describe('[MICROSERVICE PLUGIN CONFIGURATOR] Testing plugin parameter boolean component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginParameterBoolean)
    assert.isDefined(Field)
    assert.isDefined(ListItem)
  })

  it('should render a Field', () => {
    const props = {
      microserviceName: STATIC_CONF.MSERVICES.DAM,
      pluginMetaData: DumpProvider.getFirstEntity('CommonClient', 'PluginMetaData'),
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
    }
    const enzymeWrapper = shallow(<PluginParameterBoolean {...props} />, { context })
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(1)
  })
})
