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
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ResultsContainer } from '../../../src/containers/user/ResultsContainer'
import styles from '../../../src/styles'
import { conf1 } from '../../dump/configuration.dump'

const context = buildTestContext(styles)

/**
 * Test ResultsContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH FORM] Testing ResultsContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ResultsContainer)
  })
  it('should render correctly', () => {
    const props = {
      id: 1,
      appName: 'anyApp',
      project: 'anyProject',
      resultsModuleTitle: 'anyTitle',
      searchResultsConfiguration: conf1.searchResult,
      restrictedDatasetsIds: conf1.datasets.selectedDatasets,
      locale: 'en',
      preview: false,
    }
    const enzymeWrapper = shallow(<ResultsContainer {...props} />, { context })

    // A - Check that module  conf, in state, matches props
    assert.deepEqual(enzymeWrapper.state(), {
      module: {
        id: props.id,
        type: modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS,
        active: true,
        applicationId: props.appName,
        description: 'anyTitle',
        conf: props.searchResultsConfiguration,
      },
    }, 'Module conf be correctly computed in state from component properties')

    // B - Check that module is rendered with conf from state
    const resultsModule = enzymeWrapper.find(LazyModuleComponent)
    assert.lengthOf(resultsModule, 1, 'There should be the results module')
    testSuiteHelpers.assertWrapperProperties(resultsModule, {
      project: props.project,
      appName: props.appName,
      module: enzymeWrapper.state().module,
    })
    assert.equal(resultsModule.props().module.type, modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS, 'Its type should be correctly set up')
  })
  it('should prevent rendering results in preview', () => {
    const props = {
      id: 1,
      appName: 'anyApp',
      project: 'anyProject',
      resultsModuleTitle: 'anyTitle',
      searchResultsConfiguration: conf1.searchResult,
      searchParameters: {
        q: 'anyQuery',
        sort: 'anySort',
      },
      restrictedDatasetsIds: conf1.datasets.selectedDatasets,
      locale: 'en',
      preview: true,
    }
    const enzymeWrapper = shallow(<ResultsContainer {...props} />, { context })
    const resultsModule = enzymeWrapper.find(LazyModuleComponent)
    assert.lengthOf(resultsModule, 0, 'Results module should not be rendered in preview')
  })
})
