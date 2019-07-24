/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import SearchResultsContainer from '../../../src/containers/user/results/SearchResultsContainer'
import { dependencies } from '../../../src/user-dependencies'
import styles from '../../../src/styles'
import { attributes } from '../../dumps/attributes.dump'
import { configuration as dataConfiguration } from '../../dumps/data.configuration.dump'
import { configuration as documentConfiguration } from '../../dumps/documents.configuration.dump'


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
  const testCases = [{
    label: 'with data configuration',
    moduleConf: dataConfiguration,
  }, {
    label: 'with documents configuration',
    moduleConf: documentConfiguration,
  }]
  testCases.forEach(({ label, moduleConf }) => it(`should render correctly ${label}`, () => {
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
      attributeModels: attributes,
    }
    const enzymeWrapper = shallow(<ModuleComponent {...props} />, { context })
    // Note: We cannot test here navigation container (embedded in an HOC)
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
    const resultsDisplayer = moduleDisplayer.find(SearchResultsContainer)
    assert.lengthOf(resultsDisplayer, 1, 'There should be')
    assert.equal(resultsDisplayer.props().moduleId, props.id, 'Module id should be correctly reported to results displayer')
  }))
})
