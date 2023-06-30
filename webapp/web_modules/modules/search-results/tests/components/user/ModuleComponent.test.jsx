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
import { AccessDomain } from '@regardsoss/domain'
import { modulesManager } from '@regardsoss/modules'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DynamicModulePane } from '@regardsoss/components'
import ModuleComponent from '../../../src/components/user/ModuleComponent'
import FeedbackDisplayContainer from '../../../src/containers/user/feedback/FeedbackDisplayContainer'
import TabsContentContainer from '../../../src/containers/user/tabs/TabsContentContainer'
import { dependencies } from '../../../src/user-dependencies'
import styles from '../../../src/styles'
import { attributes } from '../../dumps/attributes.dump'
import { configuration as dataConfiguration } from '../../dumps/data.configuration.dump'

const context = buildTestContext(styles)

/**
 * Test ModuleComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ModuleComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModuleComponent)
  })

  it('should render correctly with data and dataset configuration', () => {
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
      moduleConf: dataConfiguration,
      attributeModels: attributes,
    }
    const enzymeWrapper = shallow(<ModuleComponent {...props} />, { context })
    // Note: We cannot test here title container (embedded in an HOC)
    const feedbackDisplayer = enzymeWrapper.find(FeedbackDisplayContainer)
    assert.lengthOf(feedbackDisplayer, 1, 'There should be the feedback displayer')
    // check module pane has the right properties
    const moduleDisplayer = enzymeWrapper.find(DynamicModulePane)
    assert.lengthOf(moduleDisplayer, 1, 'There should be the module displayer')
    testSuiteHelpers.assertWrapperProperties(moduleDisplayer, {
      appName: props.appName,
      project: props.project,
      id: props.id,
      requiredDependencies: dependencies,
      moduleConf: props.moduleConf,
    }, 'Module pane displayer properties should be correctly set')

    // Check results displayed in module displayer children
    const tabsDisplayer = moduleDisplayer.find(TabsContentContainer)
    assert.lengthOf(tabsDisplayer, 1, 'There should be the tabs content container')
    testSuiteHelpers.assertWrapperProperties(tabsDisplayer, {
      project: props.project,
      appName: props.appName,
      moduleId: props.id,
    }, 'Tabs displayer properties should be correctly reported')
  })
})
