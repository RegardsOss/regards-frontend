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
import MenuItem from 'material-ui/MenuItem'
import { AccessDomain, DamDomain } from '@regardsoss/domain'
import { DropDownButton } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import OneElementServicesComponent from '../../../../../../../src/components/user/tabs/results/common/options/OneElementServicesComponent'
import styles from '../../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test OneElementServicesComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing OneElementServicesComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OneElementServicesComponent)
  })
  it('should render correctly when empty', () => {
    const props = {
      services: null,
      onServiceStarted: () => { },
    }
    const enzymeWrapper = shallow(<OneElementServicesComponent {...props} />, { context })
    const innerButton = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(innerButton, 1, 'It should use a drop down button to render')
    assert.isOk(innerButton.props().title, 'The tooltip should be defined')
    assert.equal(innerButton.props().onChange, props.onServiceStarted, 'The button should invoke onServiceStarted when a menu item is selected')
    assert.lengthOf(innerButton.find(MenuItem), 0, ' There should be no option as there is no service')
    assert.isTrue(enzymeWrapper.props().disabled, 'The button should be disabled when there is no service')
  })
  it('should render all services available', () => {
    const props = {
      services: [{
        content: {
          configId: '0',
          label: 'ui-service-0',
          iconUrl: null,
          applicationModes: [AccessDomain.applicationModes.ONE],
          entityTypes: [DamDomain.ENTITY_TYPES_ENUM.DATA],
          type: AccessDomain.pluginTypes.UI,
        },
      }, {
        content: {
          configId: '0',
          label: 'catalog-service-0',
          iconUrl: 'http://my-little-poney/ponatator.gif',
          applicationModes: [AccessDomain.applicationModes.ONE],
          entityTypes: [DamDomain.ENTITY_TYPES_ENUM.DATA],
          type: AccessDomain.pluginTypes.CATALOG,
        },
      }],
      onServiceStarted: () => { },
    }
    const enzymeWrapper = shallow(<OneElementServicesComponent {...props} />, { context })
    assert.isFalse(enzymeWrapper.props().disabled, 'The button should be enabled when there are service')
    const innerButton = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(innerButton, 1, 'It should use a drop down button to render')
    assert.isOk(innerButton.props().title, 'The tooltip should be defined')
    assert.equal(innerButton.props().onChange, props.onServiceStarted, 'The button should invoke onServiceStarted when a menu item is selected')
    const menuItems = innerButton.find(MenuItem)
    assert.lengthOf(menuItems, props.services.length, 'There should be no option as there is no service')

    props.services.forEach((service, index) => {
      const currentMenuItem = menuItems.at(index)
      assert.equal(currentMenuItem.props().primaryText, service.content.label, 'Service label should be menu label')
      assert.equal(currentMenuItem.props().value, service, 'Service should be menu value (for events handling)')
      if (!service.content.iconUrl) {
        // check the menu has no icon
        assert.isNotOk(currentMenuItem.props().leftIcon, `There should be no icon for service ${service.content.label}`)
      } else {
        // check the menu has an icon
        assert.isOk(currentMenuItem.props().leftIcon, `There should be an icon for service ${service.content.label}`)
      }
    })
  })
})
