/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  it('should render correctly with a minimal configuration', () => {
    const props = {
      appName: 'any',
      project: 'any',
      moduleConfiguration: {},
    }
    const enzymeWrapper = shallow(<MenuPreviewComponent {...props} />, { context })
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
        },
      },
    }, 'It should provide right properties and configuration to loader, setting the module in PREVIEW display mode')
  })
  it('should render correctly with a complete configuration', () => {
    const props = {
      appName: 'any',
      project: 'any',
      moduleConfiguration: aModuleCompleteConfiguration,
    }
    const enzymeWrapper = shallow(<MenuPreviewComponent {...props} />, { context })
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
          ...props.moduleConfiguration,
        },
      },
    }, 'It should provide right properties and configuration to loader, setting the module in PREVIEW display mode')
  })
})
