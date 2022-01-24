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
import { assert } from 'chai'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { PluginListComponent } from '../../src/components/PluginListComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test PluginListComponent
* @author Sébastien Binda
*/
describe('[MICROSERVICE PLUGIN CONFIGURATOR] Testing PluginListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginListComponent)
  })
  it('should render correctly with empty list', () => {
    const props = {
      title: 'title',
      selectLabel: 'select ...',
      defaultSelectedPluginId: null,
      onChange: () => { },
    }
    const enzymeWrapper = shallow(<PluginListComponent {...props} />, { context })
    assert.equal(enzymeWrapper.find(DropDownMenu).length, 1, 'There should be a DropDown rendered')
    assert.equal(enzymeWrapper.find(MenuItem).length, 1, 'There should be only one option in the DropDown for an empty list')
  })
  it('should render correctly', () => {
    const props = {
      title: 'title',
      selectLabel: 'select ...',
      pluginList: {
        0: {
          content: {
            pluginId: 'pluginId',
            pluginClassName: 'className',
            interfaceNames: ['IClass'],
            author: 'author',
            description: 'description',
            version: '1.0.0',
            parameters: [],
          },
        },
      },
      defaultSelectedPluginId: 'pluginId',
      onChange: () => { },
    }
    const enzymeWrapper = shallow(<PluginListComponent {...props} />, { context })
    assert.equal(enzymeWrapper.find(DropDownMenu).length, 1, 'There should be a DropDown rendered')
    assert.equal(enzymeWrapper.find(MenuItem).length, 2, 'There should be two options in the DropDown')
  })
})
