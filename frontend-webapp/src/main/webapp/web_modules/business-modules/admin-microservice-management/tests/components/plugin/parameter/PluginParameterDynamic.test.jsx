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
import Chip from 'material-ui/Chip'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import PluginParameterDynamic from '../../../../src/components/plugin/parameter/PluginParameterDynamic'

const options = {
  context: buildTestContext(),
}

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN PROJECT MANAGEMENT] Testing plugin parameter dynamic component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginParameterDynamic)
    assert.isDefined(Chip)
  })

  it('should render a Chip', () => {
    const props = {
      microserviceName: STATIC_CONF.MSERVICES.DAM,
      pluginConfiguration: {
        content: {
          id: 2,
          label: 'Random configuration',
          version: '0.0.1',
          priorityOrder: 1,
          active: false,
          pluginClassName: 'Kerberos',
        },
      },
      pluginParameter: {
        id: 0,
        name: 'suffix',
        value: 'dynavalue0',
        dynamic: true,
        dynamicsValues: [
          {
            value: 'dynavalue0',
          },
          {
            value: 'dynavalue1',
          },
        ],
      },
      pluginParameterType: {
        name: 'suffix',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
        optional: true,
        defaultValue: 'default',
      },
    }
    const enzymeWrapper = shallow(<PluginParameterDynamic {...props} />, options)
    const subComponent = enzymeWrapper.find(Chip)
    expect(subComponent).to.have.length(2)
  })
})
