/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import AllowAccessComponent from '../../../../src/components/list/options/AllowAccessComponent'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test AllowAccessComponent
 * @author Raphaël Mechali
 */
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing AllowAccessComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AllowAccessComponent)
  })
  it('should render correctly loading', () => {
    const props = {
      entity: {
        content: DumpProvider.getFirstEntity('AccessProjectClient', 'ProjectUser').content,
        links: [{ rel: HateoasKeys.ACTIVE }],
      },
      isLoading: true,
      onEnable: () => { },
      onValidate: () => { },
    }
    const enzymeWrapper = shallow(<AllowAccessComponent {...props} />, { context })
    const button = enzymeWrapper.find(IconButton)
    assert.lengthOf(button, 1, 'There should be the button')
    assert.isTrue(button.props().disabled, 'It should be disabled due to loading props')
    assert.equal(button.props().title, 'projectUser.list.table.action.enable', 'The resolved action should be enable')
  })
  it('should render correctly with enable option', () => {
    const spiedCall = {
      count: 0,
      lastType: null,
      lastId: null,
    }
    const props = {
      entity: {
        content: DumpProvider.getFirstEntity('AccessProjectClient', 'ProjectUser').content,
        links: [{ rel: HateoasKeys.ACTIVE }],
      },
      isLoading: false,
      onEnable: (id) => {
        spiedCall.count += 1
        spiedCall.lastType = 'enable'
        spiedCall.lastId = id
      },
      onValidate: (id) => {
        spiedCall.count += 1
        spiedCall.lastType = 'validate'
        spiedCall.lastId = id
      },
    }
    const enzymeWrapper = shallow(<AllowAccessComponent {...props} />, { context })
    const button = enzymeWrapper.find(IconButton)
    assert.lengthOf(button, 1, 'There should be the button')
    assert.isFalse(button.props().disabled, 'Button should be enabled as it is not loading and has enable option available')
    assert.equal(button.props().title, 'projectUser.list.table.action.enable', 'The resolved action should be enable')
    assert.isOk(button.props().onClick, 'On click callback should be set')
    // Test callback: the enable callback should be invoked
    assert.deepEqual(spiedCall, { count: 0, lastType: null, lastId: null }, 'Callback should not have been invoked yet')
    button.props().onClick()
    assert.deepEqual(spiedCall, { count: 1, lastType: 'enable', lastId: props.entity.content.id }, 'Callback should have been invoked for enable option')
  })
  it('should render correctly with validate (new user) option', () => {
    const spiedCall = {
      count: 0,
      lastType: null,
      lastId: null,
    }
    const props = {
      entity: {
        content: DumpProvider.getFirstEntity('AccessProjectClient', 'ProjectUser').content,
        links: [{ rel: HateoasKeys.ACCEPT }],
      },
      isLoading: false,
      onEnable: (id) => {
        spiedCall.count += 1
        spiedCall.lastType = 'enable'
        spiedCall.lastId = id
      },
      onValidate: (id) => {
        spiedCall.count += 1
        spiedCall.lastType = 'validate'
        spiedCall.lastId = id
      },
    }
    const enzymeWrapper = shallow(<AllowAccessComponent {...props} />, { context })
    const button = enzymeWrapper.find(IconButton)
    assert.lengthOf(button, 1, 'There should be the button')
    assert.isFalse(button.props().disabled, 'Button should be enabled as it is not loading and has validate option available')
    assert.equal(button.props().title, 'projectUser.list.table.action.accept', 'The resolved action should be validate')
    assert.isOk(button.props().onClick, 'On click callback should be set')
    // Test callback: the validate callback should be invoked
    assert.deepEqual(spiedCall, { count: 0, lastType: null, lastId: null }, 'Callback should not have been invoked yet')
    button.props().onClick()
    assert.deepEqual(spiedCall, { count: 1, lastType: 'validate', lastId: props.entity.content.id }, 'Callback should have been invoked for validate option')
  })
  it('should render correctly without any option', () => {
    const props = {
      entity: {
        content: DumpProvider.getFirstEntity('AccessProjectClient', 'ProjectUser').content,
        links: [{ rel: HateoasKeys.CREATE }, { rel: HateoasKeys.DELETE }, { rel: HateoasKeys.LIST }],
      },
      isLoading: false,
      onEnable: () => { },
      onValidate: () => { },
    }
    const enzymeWrapper = shallow(<AllowAccessComponent {...props} />, { context })
    const button = enzymeWrapper.find(IconButton)
    assert.lengthOf(button, 1, 'There should be the button')
    assert.isTrue(button.props().disabled, 'Button should be disabled as it has no option available')
    assert.isOk(button.props().title, 'The button should show some random option (for graphical coherence)')
  })
})
