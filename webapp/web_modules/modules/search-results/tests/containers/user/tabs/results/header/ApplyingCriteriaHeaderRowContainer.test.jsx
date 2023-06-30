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
import ApplyingCriteriaHeaderRowComponent from '../../../../../../src/components/user/tabs/results/header/ApplyingCriteriaHeaderRowComponent'
import { ApplyingCriteriaHeaderRowContainer } from '../../../../../../src/containers/user/tabs/results/header/ApplyingCriteriaHeaderRowContainer'
import styles from '../../../../../../src/styles'
import { dataContext } from '../../../../../dumps/data.context.dump'

const context = buildTestContext(styles)

/**
 * Test ApplyingCriteriaHeaderRowContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ApplyingCriteriaHeaderRowContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ApplyingCriteriaHeaderRowContainer)
  })
  it('should render correctly with data context', () => {
    const props = {
      moduleId: 1,
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      resultsContext: dataContext,
      updateResultsContext: () => {},
    }
    const enzymeWrapper = shallow(<ApplyingCriteriaHeaderRowContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(ApplyingCriteriaHeaderRowComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      tagsFiltering: [],
      facetValues: [],
      geometries: [],
      entitiesSelections: [],
      toponymCriteria: [],
      onUnselectTagFilter: enzymeWrapper.instance().onUnselectTagFilter,
      onUnselectFacetValue: enzymeWrapper.instance().onUnselectFacetValue,
      onUnselectGeometry: enzymeWrapper.instance().onUnselectGeometry,
      onUnselectEntitiesSelection: enzymeWrapper.instance().onUnselectEntitiesSelection,
      onUnselectToponymCriteria: enzymeWrapper.instance().onUnselectToponymCriteria,
    }, 'Component should define the expected properties')
  })
})
