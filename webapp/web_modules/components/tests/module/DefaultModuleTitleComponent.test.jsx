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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { UIDomain } from '@regardsoss/domain'
import { DefaultModuleTitleComponent } from '../../src/module/DefaultModuleTitleComponent'
import { ModuleIcon } from '../../src/module/ModuleIcon'
import ModuleTitleText from '../../src/module/ModuleTitleText'
import styles from '../../src/module/styles'

const context = buildTestContext(styles)

/**
 * Test DefaultModuleTitleComponent
 * @author Raphaël Mechali
 */
describe('[Components] Testing DefaultModuleTitleComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DefaultModuleTitleComponent)
  })
  it('should render correctly with minimal configuration', () => {
    const props = {
      type: 'any',
    }
    shallow(<DefaultModuleTitleComponent {...props} />, { context })
  })
  it('should render correctly with full configuration', () => {
    const props = {
      type: 'any',
      description: 'module description',
      page: {
        home: true,
        iconType: 'DEFAULT',
        customIconURL: 'any.svg',
        title: {
          en: 'Configured english title',
          fr: 'Titre français configuré',
        },
      },
    }

    const enzymeWrapper = shallow(<DefaultModuleTitleComponent {...props} />, { context })
    const moduleIconComp = enzymeWrapper.find(ModuleIcon)
    assert.lengthOf(moduleIconComp, 1, 'There should be module icon')
    testSuiteHelpers.assertWrapperProperties(moduleIconComp, {
      iconDisplayMode: props.page.iconType,
      defaultIconURL: UIDomain.getModuleDefaultIconURL(props.type),
      customIconURL: props.page.customIconURL,
    }, 'Module icon component properties should be correctly reported')

    const moduleTitleTextComp = enzymeWrapper.find(ModuleTitleText)
    testSuiteHelpers.assertWrapperProperties(moduleTitleTextComp, {
      title: props.page.title,
      description: props.description,
    }, 'Module title text should be correctly computed (localized title should be used and not page title)')
  })
})
