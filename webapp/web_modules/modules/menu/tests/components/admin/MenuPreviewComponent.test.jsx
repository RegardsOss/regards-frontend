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
import SelectField from 'material-ui/SelectField'
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import MenuPreviewComponent from '../../../src/components/admin/MenuPreviewComponent'
import styles from '../../../src/styles'
import { aModuleCompleteConfiguration } from '../../dumps/configuration.dump'

const context = buildTestContext(styles)

/**
 * Test MenuPreviewComponent
 * @author Raphaël Mechali
 */
describe('[Menu] Testing MenuPreviewComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MenuPreviewComponent)
  })
  it('should render correctly with a minimal configuration (user app)', () => {
    const props = {
      appName: UIDomain.APPLICATIONS_ENUM.USER,
      project: 'any',
      roleList: {},
      moduleConfiguration: {},
    }
    const enzymeWrapper = shallow(<MenuPreviewComponent {...props} />, { context })
    const moduleLoader = enzymeWrapper.find(LazyModuleComponent)
    assert.lengthOf(enzymeWrapper.find(SelectField), 1, 'There should be the role selector')
    assert.lengthOf(moduleLoader, 1, 'There should be the menu module loader')
    testSuiteHelpers.assertWrapperProperties(moduleLoader, {
      appName: props.appName,
      project: props.project,
      admin: false,
      module: {
        type: modulesManager.VisibleModuleTypes.MENU,
        active: true,
        conf: {
          displayMode: UIDomain.MENU_DISPLAY_MODES_ENUM.PREVIEW,
          roleList: props.roleList,
          previewRole: enzymeWrapper.state().previewRole,
        },
      },
    }, 'It should provide right properties and configuration to loader, setting the module in PREVIEW display mode')
  })
  it('should render correctly with a complete configuration (user)', () => {
    const props = {
      appName: UIDomain.APPLICATIONS_ENUM.USER,
      project: 'any',
      roleList: {
        1: {
          content: {
            name: 'ROLE1',
          },
        },
      },
      moduleConfiguration: aModuleCompleteConfiguration,
    }
    const enzymeWrapper = shallow(<MenuPreviewComponent {...props} />, { context })
    const selector = enzymeWrapper.find(SelectField)
    assert.lengthOf(selector, 1, 'There should be the role selector')
    let moduleLoader = enzymeWrapper.find(LazyModuleComponent)
    assert.lengthOf(moduleLoader, 1, 'There should be the menu module loader')
    testSuiteHelpers.assertWrapperProperties(moduleLoader, {
      appName: props.appName,
      project: props.project,
      admin: false,
      module: {
        type: modulesManager.VisibleModuleTypes.MENU,
        active: true,
        conf: {
          displayMode: UIDomain.MENU_DISPLAY_MODES_ENUM.PREVIEW,
          previewRole: enzymeWrapper.state().previewRole,
          roleList: props.roleList,
          ...props.moduleConfiguration,
        },
      },
    }, 'It should provide right properties and configuration to loader, setting the module in PREVIEW display mode')

    // Update role through selector and check it was updated in preview
    selector.props().onChange(null, 0, 'ROLE1')
    enzymeWrapper.update()
    moduleLoader = enzymeWrapper.find(LazyModuleComponent)
    assert.equal(moduleLoader.props().module.conf.previewRole, 'ROLE1')
  })
  it('should render correctly in portal configuration mode, hiding role selector', () => {
    const props = {
      appName: UIDomain.APPLICATIONS_ENUM.PORTAL,
      project: 'any',
      roleList: {},
      moduleConfiguration: {},
    }
    const enzymeWrapper = shallow(<MenuPreviewComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(SelectField), 0, 'Role selector should be hidden for portal')
    const moduleLoader = enzymeWrapper.find(LazyModuleComponent)
    assert.lengthOf(moduleLoader, 1, 'There should be the menu module loader')
    testSuiteHelpers.assertWrapperProperties(moduleLoader, {
      appName: props.appName,
      project: props.project,
      admin: false,
      module: {
        type: modulesManager.VisibleModuleTypes.MENU,
        active: true,
        conf: {
          displayMode: UIDomain.MENU_DISPLAY_MODES_ENUM.PREVIEW,
          roleList: props.roleList,
          previewRole: enzymeWrapper.state().previewRole,
        },
      },
    }, 'It should provide right properties and configuration to loader, setting the module in PREVIEW display mode')
  })
})
