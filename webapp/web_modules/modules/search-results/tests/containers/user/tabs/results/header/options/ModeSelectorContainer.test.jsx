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
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ModeSelectorComponent from '../../../../../../../src/components/user/tabs/results/header/options/ModeSelectorComponent'
import { ModeSelectorContainer } from '../../../../../../../src/containers/user/tabs/results/header/options/ModeSelectorContainer'
import styles from '../../../../../../../src/styles'
import { dataContext } from '../../../../../../dumps/data.context.dump'

const context = buildTestContext(styles)

/**
 * Test ModeSelectorContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ModeSelectorContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModeSelectorContainer)
  })
  it('should render correctly selected', () => {
    const props = {
      moduleId: 1,
      mode: UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      resultsContext: dataContext,
      updateResultsContext: () => {},
    }
    const enzymeWrapper = shallow(<ModeSelectorContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(ModeSelectorComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      mode: props.mode,
      selected: true, // initial dataset mode
      onModeSelected: enzymeWrapper.instance().onModeSelected,
    }, 'Component should define the expected properties')
  })
  it('should render correctly unselected', () => {
    const props = {
      moduleId: 1,
      mode: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
      tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
      resultsContext: dataContext,
      updateResultsContext: () => {},
    }
    const enzymeWrapper = shallow(<ModeSelectorContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(ModeSelectorComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      mode: props.mode,
      selected: false, // initial dataset mode
      onModeSelected: enzymeWrapper.instance().onModeSelected,
    }, 'Component should define the expected properties')
  })
})
