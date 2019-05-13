/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIClient } from '@regardsoss/client'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ToggleOnlyQuicklookComponent from '../../../../../../src/components/user/results/header/options/ToggleOnlyQuicklookComponent'
import { ToggleOnlyQuicklookContainer } from '../../../../../../src/containers/user/results/header/options/ToggleOnlyQuicklookContainer'
import styles from '../../../../../../src/styles'
import { dataContext } from '../../../../../dumps/data.context.dump'

const context = buildTestContext(styles)

/**
 * Test ToggleOnlyQuicklookContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ToggleOnlyQuicklookContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ToggleOnlyQuicklookContainer)
  })
  it('should render correctly', () => {
    const spiedUpdateData = {
      moduleId: null,
      stateDiff: null,
    }
    const props = {
      moduleId: 1,
      resultsContext: dataContext,
      updateResultsContext: (moduleId, stateDiff) => {
        spiedUpdateData.moduleId = moduleId
        spiedUpdateData.stateDiff = stateDiff
      },
    }
    const enzymeWrapper = shallow(<ToggleOnlyQuicklookContainer {...props} />, { context })
    let componentWrapper = enzymeWrapper.find(ToggleOnlyQuicklookComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      selected: false,
      onToggled: enzymeWrapper.instance().onQuicklookOnlyToggled,
    }, 'Component should define the expected properties')

    assert.isNull(spiedUpdateData.moduleId, 'Update should not have been called yet')
    enzymeWrapper.instance().onQuicklookOnlyToggled()
    assert.equal(spiedUpdateData.moduleId, props.moduleId, 'Update results context should have been called with the right module id')
    assert.isNotNull(spiedUpdateData.stateDiff, 'Update results context should have been called with state diff')
    assert.include(spiedUpdateData.stateDiff.criteria.quicklookFiltering, ToggleOnlyQuicklookContainer.ONLY_QUICKLOOK_CRITERION, 'Only quicklooks criterion should now be part of the request')
    // Update to test toggle off
    enzymeWrapper.setProps({
      ...props,
      resultsContext: UIClient.ResultsContextHelper.mergeDeep(dataContext, spiedUpdateData.stateDiff),
    })
    componentWrapper = enzymeWrapper.find(ToggleOnlyQuicklookComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      selected: true,
      onToggled: enzymeWrapper.instance().onQuicklookOnlyToggled,
    }, 'Component properties should be correctly updated')
    enzymeWrapper.instance().onQuicklookOnlyToggled()
    assert.equal(spiedUpdateData.moduleId, props.moduleId, '(2) Update results context should have been called with the right module id')
    assert.isNotNull(spiedUpdateData.stateDiff, '(2) Update results context should have been called with state diff')
    assert.isEmpty(spiedUpdateData.stateDiff.criteria.quicklookFiltering, '(2) Only quicklooks criterion should have been removed from request')
  })
})
