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
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ToggleFiltersComponent from '../../../../../../../src/components/user/tabs/results/header/options/ToggleFiltersComponent'
import { ToggleFiltersContainer } from '../../../../../../../src/containers/user/tabs/results/header/options/ToggleFiltersContainer'
import styles from '../../../../../../../src/styles'
import { dataContext } from '../../../../../../dumps/data.context.dump'

const context = buildTestContext(styles)

/**
 * Test ToggleFiltersContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ToggleFiltersContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ToggleFiltersContainer)
  })

  const testCases = [{
    tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
    type: DamDomain.ENTITY_TYPES_ENUM.DATA,
    mode: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
    resultsContext: dataContext,
  }, {
    tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
    type: DamDomain.ENTITY_TYPES_ENUM.DATA,
    mode: UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
    resultsContext: dataContext,
  }, {
    tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
    type: DamDomain.ENTITY_TYPES_ENUM.DATA,
    mode: UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK,
    resultsContext: dataContext,
  }, {
    tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
    type: DamDomain.ENTITY_TYPES_ENUM.DATA,
    mode: UIDomain.RESULTS_VIEW_MODES_ENUM.MAP,
    resultsContext: dataContext,
  }]

  testCases.forEach(({
    tabType, type, mode, resultsContext,
  }) => it(`should render correctly for ${type} (${mode})`, () => {
    const spiedUpdateData = {
      moduleId: null,
      stateDiff: null,
    }
    const props = {
      moduleId: 1,
      tabType,
      resultsContext: UIDomain.ResultsContextHelper.deepMerge(resultsContext, {
        tabs: {
          [tabType]: {
            selectedType: type,
            types: {
              [type]: {
                selectedMode: mode,
              },
            },
          },
        },
      }),
      updateResultsContext: (moduleId, stateDiff) => {
        spiedUpdateData.moduleId = moduleId
        spiedUpdateData.stateDiff = stateDiff
      },
    }
    const enzymeWrapper = shallow(<ToggleFiltersContainer {...props} />, { context })
    let componentWrapper = enzymeWrapper.find(ToggleFiltersComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      filtersEnabled: true, // initially enabled in all configurations
      onFiltersToggled: enzymeWrapper.instance().onFiltersToggled,
    }, 'Component should define the expected properties')

    // 1 - Test callback initially (toggle off)
    assert.isNull(spiedUpdateData.moduleId, 'Update should not have been called yet')
    enzymeWrapper.instance().onFiltersToggled()
    assert.equal(spiedUpdateData.moduleId, props.moduleId, 'Spied data should have been called (module id)')
    assert.isNotNull(spiedUpdateData.stateDiff, 'Spied data should have been called (state diff)')
    // check criterion has been removed
    assert.isEmpty(spiedUpdateData.stateDiff.tabs[tabType].criteria.requestFacets, 'Facets should not longer be requested')
    assert.isFalse(spiedUpdateData.stateDiff.tabs[tabType].facets.enabled, 'Facets should no longer be enabled')

    // 2 - Re-render with new context, check component properties and callback when toggling on
    enzymeWrapper.setProps({
      ...props,
      resultsContext: UIDomain.ResultsContextHelper.deepMerge(props.resultsContext, spiedUpdateData.stateDiff),
    })
    componentWrapper = enzymeWrapper.find(ToggleFiltersComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      filtersEnabled: false, // initially enabled in all configurations
      onFiltersToggled: enzymeWrapper.instance().onFiltersToggled,
    }, 'Component should filters should be correctly updated')
    enzymeWrapper.instance().onFiltersToggled()
    assert.equal(spiedUpdateData.moduleId, props.moduleId, 'Spied data should have been called (module id)')
    assert.isNotEmpty(spiedUpdateData.stateDiff.tabs[tabType].criteria.requestFacets, 'Facets should be requested again')
    assert.isTrue(spiedUpdateData.stateDiff.tabs[tabType].facets.enabled, 'Facets should be enabled again')
  }))
  it('should hide component when facets are forbidden', () => {
    const props = {
      moduleId: 1,
      // initially in DATASET type, which forbids facets,
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      resultsContext: {
        ...dataContext,
        tabs: {
          ...dataContext.tabs,
          [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
            ...dataContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS],
            types: {
              [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
                ...dataContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].types[DamDomain.ENTITY_TYPES_ENUM.DATA],
                facetsAllowed: false,
              },
              [DamDomain.ENTITY_TYPES_ENUM.DATASET]: {
                ...dataContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].types[DamDomain.ENTITY_TYPES_ENUM.DATASET],
                facetsAllowed: false,
              },
            },
          },
        },
      },
      updateResultsContext: () => {},
    }
    const enzymeWrapper = shallow(<ToggleFiltersContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(ToggleFiltersComponent)
    assert.lengthOf(componentWrapper, 0, 'Component should not be shown when facets are forbidden')
  })
})
