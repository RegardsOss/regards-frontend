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
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { PluginListContainer, PluginFormContainer } from '@regardsoss/microservice-plugin-configurator'
import { ServiceFormComponent } from '../../src/components/ServiceFormComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test ServiceFormComponent
* @author Sébastien Binda
*/
describe('[ADMIN CATALOG SERVICES] Testing ServiceFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ServiceFormComponent)
  })
  it('should render correctly creation form', () => {
    const props = {
      mode: 'create',
      backUrl: 'backUrl',
      onUpdate: () => { },
      onCreate: () => { },
    }
    const enzymeWrapper = shallow(<ServiceFormComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(PluginListContainer), 1, 'The component should display the list of available services')
    assert.lengthOf(enzymeWrapper.find(PluginFormContainer), 0, 'The component should display the service plugin configurator')
  })
  it('should render correctly edit form', () => {
    const props = {
      mode: 'edit',
      pluginConfiguration: DumpProvider.getFirstEntity('CommonClient', 'PluginConfiguration'),
      backUrl: 'backUrl',
      onUpdate: () => { },
      onCreate: () => { },
    }
    const enzymeWrapper = shallow(<ServiceFormComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(PluginListContainer), 1, 'The component should display the list of available services')
    assert.lengthOf(enzymeWrapper.find(PluginFormContainer), 1, 'The component should display the service plugin configurator')
  })
})
