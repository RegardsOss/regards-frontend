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
import { HateoasKeys } from '@regardsoss/display-control'
import { HateoasToggle } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import EnableConfigurationOnAllComponent from '../../../src/components/options/EnableConfigurationOnAllComponent'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test EnableConfigurationOnAllComponent
 * @author Raphaël Mechali
 */
describe('[ADMIN UI SERVICE MANAGEMENT] Testing EnableConfigurationOnAllComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EnableConfigurationOnAllComponent)
  })
  it('should render correctly', () => {
    const props = {
      uiPluginConfiguration: DumpProvider.getFirstEntity('AccessProjectClient', 'UIPluginConfiguration'),
      onToggleEnabledForAll: () => {},
    }
    const enzymeWrapper = shallow(<EnableConfigurationOnAllComponent {...props} />, { context })
    const toggle = enzymeWrapper.find(HateoasToggle)
    testSuiteHelpers.assertWrapperProperties(toggle, {
      entityLinks: props.uiPluginConfiguration.links,
      hateoasKey: HateoasKeys.UPDATE,
      toggled: props.uiPluginConfiguration.content.linkedToAllEntities,
      disabled: !props.uiPluginConfiguration.content.active,
      onToggle: enzymeWrapper.instance().onToggleEnabledForAll,
    })
  })
})
