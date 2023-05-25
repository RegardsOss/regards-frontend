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
import ActionsGroupComponent from '../../../../../../src/components/user/tabs/results/header/ActionsGroupComponent'
import { ActionsGroupContainer } from '../../../../../../src/containers/user/tabs/results/header/ActionsGroupContainer'
import { dataContext } from '../../../../../dumps/data.context.dump'
import styles from '../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ActionsGroupContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ActionsGroupContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ActionsGroupContainer)
  })
  it('should render correctly (data)', () => {
    const props = {
      moduleId: 1,
      tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
      resultsContext: UIDomain.ResultsContextHelper.deepMerge(dataContext, {
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
            selectedType: DamDomain.ENTITY_TYPES_ENUM.DATA,
            types: {
              [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
                selectedMode: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
              },
            },
          },
        },
      }),
      selectedMode: UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
      updateResultsContext: () => { },
    }
    const enzymeWrapper = shallow(<ActionsGroupContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(ActionsGroupComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')

    const {
      selectedTypeState: {
        isInInitialSorting, initialSorting, criteria: { sorting: currentSorting },
      }, selectedModeState: { presentationModels },
    } = UIDomain.ResultsContextHelper.getViewData(props.resultsContext, props.tabType)
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      sortableAttributes: enzymeWrapper.state().sortableAttributes,
      isInInitialSorting,
      initialSorting,
      currentSorting,
      onApplySorting: enzymeWrapper.instance().onApplySorting,
      selectedMode: props.selectedMode,
      presentationModels,
      onApplyPresentationModels: enzymeWrapper.instance().onApplyPresentationModels,
      onResetPresentationModels: enzymeWrapper.instance().onResetPresentationModels,
    }, 'Component should define the expected properties')
  })
  it('should render correctly (dataset)', () => {
    const props = {
      moduleId: 1,
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      resultsContext: UIDomain.ResultsContextHelper.deepMerge(dataContext, {
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
            selectedType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
            types: {
              [DamDomain.ENTITY_TYPES_ENUM.DATASET]: {
                selectedMode: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
              },
            },
          },
        },
      }),
      selectedMode: UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
      updateResultsContext: () => { },
    }
    const enzymeWrapper = shallow(<ActionsGroupContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(ActionsGroupComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')

    const {
      selectedTypeState: {
        isInInitialSorting, initialSorting, criteria: { sorting: currentSorting },
      }, selectedModeState: { presentationModels },
    } = UIDomain.ResultsContextHelper.getViewData(props.resultsContext, props.tabType)
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      sortableAttributes: enzymeWrapper.state().sortableAttributes,
      isInInitialSorting,
      initialSorting,
      currentSorting,
      onApplySorting: enzymeWrapper.instance().onApplySorting,
      selectedMode: props.selectedMode,
      presentationModels,
      onApplyPresentationModels: enzymeWrapper.instance().onApplyPresentationModels,
      onResetPresentationModels: enzymeWrapper.instance().onResetPresentationModels,
    }, 'Component should define the expected properties')
  })
})
