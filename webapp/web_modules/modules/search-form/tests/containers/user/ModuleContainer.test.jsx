/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { modulesHelper } from '@regardsoss/modules-api'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { UIDomain } from '@regardsoss/domain'
import { ModuleContainer } from '../../../src/containers/user/ModuleContainer'
import FormContainer from '../../../src/containers/user/FormContainer'
import styles from '../../../src/styles/styles'
import { conf1 } from '../../dump/configuration.dump'
import ResultsContainer from '../../../src/containers/user/ResultsContainer'

/**
 * Tests for ModuleContainer
 * @author Sébastien binda
 */
describe('[SEARCH FORM] Testing ModuleContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  const context = buildTestContext(styles)
  it('should exist', () => {
    assert.isDefined(ModuleContainer)
  })
  it('should display form and results', () => {
    let spiedStateDiff = null
    const props = {
      project: 'test',
      appName: 'test',
      type: 'any',
      description: 'Test',
      moduleConf: conf1,
      dispatchCollapseForm: () => { },
      dispatchExpandResults: () => { },
      dispatchInitializeWithOpenedResults: () => { },
      dispatchUpdateSearchContext: (stateDiff) => {
        spiedStateDiff = stateDiff
      },
    }
    const enzymeWrapper = shallow(<ModuleContainer {...props} />, { context })

    // Check form container is correctly rendered
    const formContainer = enzymeWrapper.find(FormContainer)
    assert.lengthOf(formContainer, 1, 'There should be the form container')
    testSuiteHelpers.assertWrapperProperties(formContainer, {
      onSearch: enzymeWrapper.instance().onSearch,
      // Other reported properties to instantiate a dynamic module pane
      ...modulesHelper.getReportedUserModuleProps(props),
    }, 'Form container properties should be correctly provided')

    // Check results constainer is correctly rendered
    const resultsContainer = enzymeWrapper.find(ResultsContainer)
    assert.lengthOf(resultsContainer, 1, 'There should be the results container')
    testSuiteHelpers.assertWrapperProperties(resultsContainer, {
      id: props.moduleConf.id,
      appName: props.appName,
      project: props.project,
      preview: props.moduleConf.preview,
      resultsModuleTitle: 'results.module.title',
      searchResultsConfiguration: props.moduleConf.searchResult,
    }, 'Results container properties should be correctly provided')

    // simulate a search call and check the controlled module criteria are updated
    enzymeWrapper.instance().onSearch({
      p1: {
        state: { something: true },
        requestParameters: {
          q: 'something1',
          sort: 'A',
        },
      },
      p2: {
        state: { somethingElse: 'abcde', more: 6 },
        requestParameters: {
          q: 'something2',
          sort: 'B',
          geometry: 'circle',
        },
      },
      p3: {
        state: { ok: true },
        requestParameters: {
          geometry: 'cube',
        },
      },
    })
    // check controlled module  context is updated
    enzymeWrapper.update(spiedStateDiff, {
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
          criteria: {
            otherFilters: [{ // p1 filter
              requestParameters: {
                q: 'something1',
                sort: 'A',
              },
            }, { // p2 filter
              requestParameters: {
                q: 'something2',
                sort: 'B',
                geometry: 'circle',
              },
            }, { // p3 filter
              requestParameters: {
                geometry: 'cube',
              },
            }],
          },
        },
      },
    })
  })
})
