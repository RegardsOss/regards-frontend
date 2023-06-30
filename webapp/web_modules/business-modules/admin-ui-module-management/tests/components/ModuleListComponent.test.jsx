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
import { assert, expect } from 'chai'
import keys from 'lodash/keys'
import { spy } from 'sinon'
import { TableBody, TableRow } from 'material-ui/Table'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { ShowableAtRender } from '@regardsoss/components'
import ModuleListComponent from '../../src/components/ModuleListComponent'

/**
 * Tests for ModuleListComponent
 * @author Sébastien binda
 */
describe('[ADMIN UI MODULE MANAGEMENT] Testing Modules list component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  const options = {
    context: buildTestContext(),
  }

  const testModules = [{
    content: {
      id: 0,
      type: 'aType',
      name: 'module',
      description: 'First Module',
      active: true,
      applicationId: 'user',
      container: 'content',
      conf: {},
    },
    links: [],
  }, {
    content: {
      id: 1,
      type: 'aType',
      name: 'module',
      description: 'Second Module',
      active: true,
      applicationId: 'user',
      container: 'content',
      conf: {},
    },
    links: [],
  }, {
    content: {
      id: 2,
      type: 'aType',
      name: 'module',
      description: 'Third Module',
      active: false,
      applicationId: 'user',
      container: 'content',
      conf: {},
    },
    links: [],
  }]

  it('Should render correctly a list of availables modules', () => {
    const props = {
      modules: testModules,
      onActivation: () => { },
      onCreate: () => { },
      onEdit: () => { },
      onDelete: () => { },
      onDuplicate: () => { },
      backUrl: '#',
    }

    const wrapper = shallow(
      <ModuleListComponent {...props} />,
      options,
    )

    expect(wrapper.find(TableBody).find(TableRow)).to.have.length(3)
  })

  it('Check actions on ModuleListComponent', () => {
    const onEditCallback = spy()
    const onDeleteCallback = spy()
    const onDuplicateCallBack = spy()

    const props = {
      modules: testModules,
      onActivation: () => { },
      onCreate: () => { },
      onDuplicate: onDuplicateCallBack,
      onEdit: onEditCallback,
      onDelete: onDeleteCallback,
      backUrl: '#',
    }

    const wrapper = shallow(
      <ModuleListComponent {...props} />,
      options,
    )

    const numberOfHateoasIconByModule = 2
    const numberOfResourceIconByModule = 1
    const buttons = wrapper.find(TableBody).find(TableRow).find('Connect(WithHateoasDisplayControl(IconButton))')
    assert.lengthOf(buttons, keys(testModules).length * numberOfHateoasIconByModule, `There should be ${keys(testModules).length * numberOfHateoasIconByModule} HateoasIconAction buttons available in the module form page`)
    const rbuttons = wrapper.find(TableBody).find(TableRow).find('Connect(WithResourceDisplayControl(IconButton))')
    assert.lengthOf(rbuttons, keys(testModules).length * numberOfResourceIconByModule, `There should be ${keys(testModules).length * numberOfResourceIconByModule} ResourceIconAction buttons available in the module form page`)

    const editButton = buttons.first()
    editButton.simulate('click')
    assert.isTrue(onEditCallback.calledOnce, 'After click on the edit button, the edit callback function should be called')

    const duplicateButton = rbuttons.at(0)
    duplicateButton.simulate('click')
    assert.isTrue(onDuplicateCallBack.calledOnce, 'After click on the duplicate button, the duplicate callback function should be called')

    const deleteButton = buttons.at(1)
    assert.isDefined(deleteButton)
    assert.equal(wrapper.find(ShowableAtRender).prop('show'), false, 'Confirm dialog should not be displayed')
    deleteButton.simulate('click')
    assert.equal(wrapper.find(ShowableAtRender).prop('show'), true, 'Confirm dialog should be displayed')

    assert.equal(wrapper.find('Connect(WithHateoasDisplayControl(Toggle))').find({ toggled: true }).length, 2, 'There should be two active modules')
    assert.equal(wrapper.find('Connect(WithHateoasDisplayControl(Toggle))').find({ toggled: false }).length, 1, 'There should be one inactive module')
  })
})
