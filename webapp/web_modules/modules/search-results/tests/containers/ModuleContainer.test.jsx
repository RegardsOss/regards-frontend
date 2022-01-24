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
import { modulesManager } from '@regardsoss/modules'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { AccessDomain } from '@regardsoss/domain'
import ModuleComponent from '../../src/components/user/ModuleComponent'
import ContextManager from '../../src/containers/user/context/ContextManager'
import { ModuleContainer } from '../../src/containers/ModuleContainer'
import styles from '../../src/styles'
import { attributes } from '../dumps/attributes.dump'
import { configuration as dataConfiguration } from '../dumps/data.configuration.dump'

const context = buildTestContext(styles)

/**
 * Test ModuleContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ModuleContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModuleContainer)
  })
  const testCases = [{
    label: 'while loading',
    moduleConf: dataConfiguration,
    attributeModels: {},
    fetchingAttributes: true,
  }, {
    label: 'with data configuration',
    moduleConf: dataConfiguration,
    attributeModels: attributes,
    fetchingAttributes: false,
  }]
  testCases.forEach(({
    label, moduleConf, attributeModels, fetchingAttributes,
  }) => it(`should render correctly ${label}`, () => {
    const props = {
      appName: 'app',
      project: 'projet',
      id: 1,
      type: modulesManager.VisibleModuleTypes.SEARCH_RESULTS,
      description: 'Any',
      active: true,
      container: 'any',
      page: {
        home: true,
        iconType: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
        customIconURL: null,
        title: {
          en: 'Results test',
          fr: 'Test des résultats',
        },
      },
      moduleConf,
      fetchingAttributes,
      attributeModels: attributes,
    }
    const enzymeWrapper = shallow(<ModuleContainer {...props} />, { context })
    if (fetchingAttributes) {
      // A - Check there is nothing displayed when fetching
      assert.lengthOf(enzymeWrapper.find(ContextManager), 0, 'There should not be the context manager')
      assert.lengthOf(enzymeWrapper.find(ModuleComponent), 0, 'There should not be the module component')
    } else {
      // B - Check both context manager and module component are rendered with the right properties
      const contextManager = enzymeWrapper.find(ContextManager)
      assert.lengthOf(contextManager, 1, 'There should be the context manager')
      testSuiteHelpers.assertWrapperProperties(contextManager, {
        moduleId: props.id,
        configuration: moduleConf,
        attributeModels,
      }, 'Context manager properties should be correctly set')
      // search for module component in context manager children (HOC)
      const moduleComponent = contextManager.find(ModuleComponent)
      assert.lengthOf(moduleComponent, 1, 'There shoud be the module component')
      testSuiteHelpers.assertWrapperProperties(moduleComponent, {
        id: props.id,
        appName: props.appName,
        project: props.project,
        type: props.type,
        moduleConf,
        description: props.description,
        active: props.active,
        container: props.container,
        page: props.page,
      }, 'Module component properties should be correctly set')
    }
  }))
})
