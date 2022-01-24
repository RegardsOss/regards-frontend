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
import IconButton from 'material-ui/IconButton'
import { HateoasKeys } from '@regardsoss/display-control'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import DenyAccessComponent from '../../../../src/components/list/options/DenyAccessComponent'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test DenyAccessComponent
 * @author Raphaël Mechali
 */
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing DenyAccessComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DenyAccessComponent)
  })
  it('should render correctly loading', () => {
    const props = {
      entity: {
        content: DumpProvider.getFirstEntity('AccessProjectClient', 'ProjectUser').content,
        links: [{ rel: HateoasKeys.INACTIVE }],
      },
      isLoading: true,
      onDeny: () => { },
      onDisable: () => { },
    }
    const enzymeWrapper = shallow(<DenyAccessComponent {...props} />, { context })
    const button = enzymeWrapper.find(IconButton)
    assert.lengthOf(button, 1, 'There should be the button')
    assert.isTrue(button.props().disabled, 'It should be disabled due to loading props')
    assert.equal(button.props().title, 'projectUser.list.table.action.disable', 'The resolved action should be disable access')
  })
  it('should render correctly with disable access option', () => {
    const spiedCall = {
      count: 0,
      lastType: null,
      lastId: null,
    }
    const props = {
      entity: {
        content: DumpProvider.getFirstEntity('AccessProjectClient', 'ProjectUser').content,
        links: [{ rel: HateoasKeys.INACTIVE }],
      },
      isLoading: false,
      onDeny: (id) => {
        spiedCall.count += 1
        spiedCall.lastType = 'deny'
        spiedCall.lastId = id
      },
      onDisable: (id) => {
        spiedCall.count += 1
        spiedCall.lastType = 'disable'
        spiedCall.lastId = id
      },
    }
    const enzymeWrapper = shallow(<DenyAccessComponent {...props} />, { context })
    const button = enzymeWrapper.find(IconButton)
    assert.lengthOf(button, 1, 'There should be the button')
    assert.isFalse(button.props().disabled, 'Button should be enabled as it is not loading and has disable access option available')
    assert.equal(button.props().title, 'projectUser.list.table.action.disable', 'The resolved action should be dissable access')
    assert.isOk(button.props().onClick, 'On click callback should be set')
    // Test callback: the disable callback should be invoked
    assert.deepEqual(spiedCall, { count: 0, lastType: null, lastId: null }, 'Callback should not have been invoked yet')
    button.props().onClick()
    assert.deepEqual(spiedCall, { count: 1, lastType: 'disable', lastId: props.entity.content.id }, 'Callback should have been invoked for disable access option')
  })
  it('should render correctly with deny access (new user) option', () => {
    const spiedCall = {
      count: 0,
      lastType: null,
      lastId: null,
    }
    const props = {
      entity: {
        content: DumpProvider.getFirstEntity('AccessProjectClient', 'ProjectUser').content,
        links: [{ rel: HateoasKeys.DENY }],
      },
      isLoading: false,
      onDeny: (id) => {
        spiedCall.count += 1
        spiedCall.lastType = 'deny'
        spiedCall.lastId = id
      },
      onDisable: (id) => {
        spiedCall.count += 1
        spiedCall.lastType = 'disable'
        spiedCall.lastId = id
      },
    }
    const enzymeWrapper = shallow(<DenyAccessComponent {...props} />, { context })
    const button = enzymeWrapper.find(IconButton)
    assert.lengthOf(button, 1, 'There should be the button')
    assert.isFalse(button.props().disabled, 'Button should be enabled as it is not loading and has deny access option available')
    assert.equal(button.props().title, 'projectUser.list.table.action.deny', 'The resolved action should be deny access')
    assert.isOk(button.props().onClick, 'On click callback should be set')
    // Test callback: the deny callback should be invoked
    assert.deepEqual(spiedCall, { count: 0, lastType: null, lastId: null }, 'Callback should not have been invoked yet')
    button.props().onClick()
    assert.deepEqual(spiedCall, { count: 1, lastType: 'deny', lastId: props.entity.content.id }, 'Callback should have been invoked for deny access option')
  })
  it('should render correctly without any option', () => {
    const props = {
      entity: {
        content: DumpProvider.getFirstEntity('AccessProjectClient', 'ProjectUser').content,
        links: [{ rel: HateoasKeys.CREATE }, { rel: HateoasKeys.DELETE }, { rel: HateoasKeys.LIST }],
      },
      isLoading: false,
      onDeny: () => { },
      onDisable: () => { },
    }
    const enzymeWrapper = shallow(<DenyAccessComponent {...props} />, { context })
    const button = enzymeWrapper.find(IconButton)
    assert.lengthOf(button, 1, 'There should be the button')
    assert.isTrue(button.props().disabled, 'Button should be disabled as it has no option available')
    assert.isOk(button.props().title, 'The button should show some random option (for graphical coherence)')
  })
})
