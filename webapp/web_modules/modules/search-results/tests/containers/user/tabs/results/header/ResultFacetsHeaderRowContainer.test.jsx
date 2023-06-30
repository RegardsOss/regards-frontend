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
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ResultFacetsHeaderRowComponent from '../../../../../../src/components/user/tabs/results/header/ResultFacetsHeaderRowComponent'
import { ResultFacetsHeaderRowContainer } from '../../../../../../src/containers/user/tabs/results/header/ResultFacetsHeaderRowContainer'
import styles from '../../../../../../src/styles'
import { dataContext } from '../../../../../dumps/data.context.dump'
import resultsDump from '../../../../../dumps/results.dump'

const context = buildTestContext(styles)

/**
 * Test ResultFacetsHeaderRowContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ResultFacetsHeaderRowContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ResultFacetsHeaderRowContainer)
  })
  it('should render correctly fetching', () => {
    const props = {
      moduleId: 1,
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      resultsContext: dataContext,
      isFetching: true,
      loadedResultsCount: 0,
      resultsCount: 0,
      facets: null,
      updateResultsContext: () => { },
    }
    const enzymeWrapper = shallow(<ResultFacetsHeaderRowContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(ResultFacetsHeaderRowComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      isFetching: props.isFetching,
      loadedResultsCount: props.loadedResultsCount,
      resultsCount: props.resultsCount,
      facetsEnabled: false,
      facets: [],
      onSelectFacetValue: enzymeWrapper.instance().onSelectFacetValue,
      selectionEnabled: false,
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
    }, 'Component should define the expected properties')
  })
  it('should render correctly with facets', () => {
    const props = {
      moduleId: 1,
      tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
      resultsContext: UIDomain.ResultsContextHelper.deepMerge(dataContext, {
        type: DamDomain.ENTITY_TYPES_ENUM.DATA,
      }),
      isFetching: false,
      loadedResultsCount: 20,
      resultsCount: 555,
      facets: resultsDump.facets,
      updateResultsContext: () => { },
    }
    const enzymeWrapper = shallow(<ResultFacetsHeaderRowContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(ResultFacetsHeaderRowComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      isFetching: props.isFetching,
      loadedResultsCount: props.loadedResultsCount,
      resultsCount: props.resultsCount,
      facetsEnabled: true,
      facets: enzymeWrapper.state().facets,
      onSelectFacetValue: enzymeWrapper.instance().onSelectFacetValue,
      selectionEnabled: true,
      tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
    }, 'Component should define the expected properties')
    assert.lengthOf(enzymeWrapper.state().facets, 1, 'One facet should have been converted from results (other attributes do not exist in configuration)')
  })
})
