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
import forEach from 'lodash/forEach'
import { DamDomain, AccessDomain, UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ResultsContextConstants } from '@regardsoss/domain/ui'
import OptionsHeaderRowComponent from '../../../../../../src/components/user/tabs/results/header/OptionsHeaderRowComponent'
import TypeTabContainer from '../../../../../../src/containers/user/tabs/results/header/options/TypeTabContainer'
import ToggleFiltersContainer from '../../../../../../src/containers/user/tabs/results/header/options/ToggleFiltersContainer'
import ModeSelectorContainer from '../../../../../../src/containers/user/tabs/results/header/options/ModeSelectorContainer'
import SortingManagerContainer from '../../../../../../src/containers/user/tabs/results/header/options/SortingManagerContainer'
import EditColumnsSettingsContainer from '../../../../../../src/containers/user/tabs/results/header/options/EditColumnsSettingsContainer'
import SearchOptionContainer from '../../../../../../src/containers/user/tabs/results/header/options/SearchOptionContainer'
import SelectionServiceComponent from '../../../../../../src/components/user/tabs/results/header/options/SelectionServiceComponent'
import AddSelectionToCartComponent from '../../../../../../src/components/user/tabs/results/header/options/AddSelectionToCartComponent'
import { getSearchCatalogClient } from '../../../../../../src/clients/SearchEntitiesClient'
import RefreshTableComponent from '../../../../../../src/components/user/tabs/results/header/options/RefreshTableComponent'
import styles from '../../../../../../src/styles'
import { dataContext } from '../../../../../dumps/data.context.dump'

const renderContext = buildTestContext(styles)

/**
 * Test ApplyingCriteriaHeaderRowComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing OptionsHeaderRowComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OptionsHeaderRowComponent)
  })
  const testCases = [{
    label: 'with all options',
    context: UIDomain.ResultsContextHelper.deepMerge(dataContext, {
      tabs: {
        // close main tab search pane
        [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
          search: {
            open: false,
          },
        },
        // open tag tab search pane
        [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
          search: {
            open: true,
          },
        },
      },
    }),
    services: [{
      content: {
        configId: '1',
        label: 'service1',
        icon: 'any.png',
        applicationModes: [AccessDomain.applicationModes.ONE, AccessDomain.applicationModes.MANY],
        entityTypes: [DamDomain.ENTITY_TYPES_ENUM.DATA],
        type: AccessDomain.pluginTypes.UI,
      },
    }, {
      content: {
        configId: '2',
        label: 'service2',
        icon: 'any2.png',
        applicationModes: [AccessDomain.applicationModes.MANY],
        entityTypes: [DamDomain.ENTITY_TYPES_ENUM.DATA],
        type: AccessDomain.pluginTypes.CATALOG,
      },
    }],
    hasMultipleTypes: true,
  }, {
    label: 'without option and DATASET view',
    context: UIDomain.ResultsContextHelper.deepMerge(dataContext, {
      tabs: {
        // close main tab search pane
        [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
          search: {
            enabled: false,
          },
          types: {
            [DamDomain.ENTITY_TYPES_ENUM.DATASET]: UIDomain.ResultsContextConstants.DISABLED_TYPE_STATE,
          },
        },
        // open tag tab search pane
        [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
          search: {
            enabled: false,
          },
        },
      },
    }),
    services: [],
    hasMultipleTypes: false,
  }]

  testCases.forEach(({
    label, context, services, hasMultipleTypes,
  }) => {
    // render once for each available tab, view and mode in context (allows testing all views of DATA, DATASET)
    forEach(context.tabs, (tab, tabKey) => {
      forEach(tab.types, (tabType, typeKey) => {
        forEach(tabType.modes, (typeMode, modeKey) => {
          if (typeMode.enabled) {
            // test case is here!
            it(`Should render correctly ${label}: ${tabKey} / ${typeKey} / ${modeKey}`, () => {
              const props = {
                moduleId: 1,
                tabType: tabKey,
                resultsContext: UIDomain.ResultsContextHelper.deepMerge(context, {
                  selectedTab: tabKey,
                  tabs: {
                    [tabKey]: {
                      selectedType: typeKey,
                      types: {
                        [typeKey]: {
                          selectedMode: modeKey,
                        },
                      },
                    },
                  },
                }),
                requestParameters: {},
                searchActions: getSearchCatalogClient(UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS).searchDataobjectsActions,
                onAddSelectionToCart: () => { },
                selectionServices: services,
                onStartSelectionService: () => { },
              }
              const enzymeWrapper = shallow(<OptionsHeaderRowComponent {...props} />, { context: renderContext })
              // 1 - check tabs are shown / hidden
              if (hasMultipleTypes && tabKey === UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS) { // Only main results currently enables multiple types tab view
                assert.isTrue(enzymeWrapper.find(TypeTabContainer).length > 1, 'There should be type tabs')
              } else {
                assert.lengthOf(enzymeWrapper.find(TypeTabContainer), 0, 'Type tabs should be hidden should be hidden')
              }
              // 2 - Check all services are displayed (when allowed for type)
              if (ResultsContextConstants.allowServices(typeKey)) {
                const servicesComponents = enzymeWrapper.find(SelectionServiceComponent)
                assert.lengthOf(servicesComponents, services.length, 'All found services should be displayed')
                services.forEach((service) => {
                  const serviceComponent = servicesComponents.findWhere((serviceComp) => serviceComp.props().service === service)
                  assert.lengthOf(serviceComponent, 1, `There should be displayer for service ${service.content.label}`)
                  assert.equal(serviceComponent.props().onRunService, props.onStartSelectionService,
                    `Start service callback should be correctly reported for service ${service.content.label}`)
                })
              } else {
                assert.lengthOf(enzymeWrapper.find(SelectionServiceComponent), 0, 'No service should be displayed when forbidden by type')
              }
              // 3 - Add selection to cart
              const addToCartContainer = enzymeWrapper.find(AddSelectionToCartComponent)
              assert.lengthOf(addToCartContainer, 1, 'There should be add to cart container')
              assert.equal(addToCartContainer.props().onAddSelectionToCart, props.onAddSelectionToCart,
                'Add to cart container callback should be correctly set')
              // 4 - Toggle filters (currently in all views and modes, due to configuration)
              const toggleFiltersContainer = enzymeWrapper.find(ToggleFiltersContainer)
              assert.lengthOf(toggleFiltersContainer, 1, 'Toggle filters container should be shown')
              testSuiteHelpers.assertWrapperProperties(toggleFiltersContainer, {
                moduleId: props.moduleId,
                resultsContext: props.resultsContext,
              }, 'Toggle filters container properties should be correctly set')
              // 5 - Sort on single attributes for view types allowing sorting (but not in table mode)
              const sortManagerContainer = enzymeWrapper.find(SortingManagerContainer)
              if (tabType.enableSorting) {
                assert.lengthOf(sortManagerContainer, 1, 'There should be sort container')
                testSuiteHelpers.assertWrapperProperties(sortManagerContainer, {
                  moduleId: props.moduleId,
                  tabType: props.tabType,
                  resultsContext: props.resultsContext,
                }, 'Sort container properties should be correctly set')
              } else {
                assert.lengthOf(sortManagerContainer, 0, 'Sort container should be hidden')
              }
              // 6 - Columns settings (container is auto hiding when in table mode, not to be tested here)
              const columnsSettingsContainer = enzymeWrapper.find(EditColumnsSettingsContainer)
              assert.lengthOf(columnsSettingsContainer, 1, 'There should be columns settings container')
              testSuiteHelpers.assertWrapperProperties(columnsSettingsContainer, {
                moduleId: props.moduleId,
                resultsContext: props.resultsContext,
              }, 'Columns settings container properties should be correctly set')
              // 7 - Check mode selectors (they must be disabled when mode is)
              const enabledModes = OptionsHeaderRowComponent.MODE_DISPLAY_ORDER.reduce(
                (acc, mode) => tabType.modes[mode] && tabType.modes[mode].enabled ? [...acc, mode] : acc, [])
              const modeSelectors = enzymeWrapper.find(ModeSelectorContainer)
              assert.lengthOf(enabledModes, modeSelectors.length, 'There should be a mode selector for each enabled mode')
              // Check each enabled mode is present, in right order
              enabledModes.forEach((mode, index) => {
                const currentModeSelector = modeSelectors.at(index)
                testSuiteHelpers.assertWrapperProperties(currentModeSelector, {
                  moduleId: props.moduleId,
                  tabType: props.tabType,
                  resultsContext: props.resultsContext,
                  mode,
                }, `Mode ${mode} properties should be correctly computed (and modes should be created in right order)`)
              })
              // 7.B: check parent is shown when at least one mode selector is
              if (modeSelectors.length) {
                assert.isTrue(modeSelectors.at(0).parent().props().show, 'Mode selectors node should be displayed only when there are children')
              }
              // 8 - Search mode
              const searchOptionWrapper = enzymeWrapper.find(SearchOptionContainer)
              assert.lengthOf(searchOptionWrapper, 1, 'There should be search option')
              testSuiteHelpers.assertWrapperProperties(searchOptionWrapper, {
                moduleId: props.moduleId,
                tabType: props.tabType,
                open: props.resultsContext.tabs[props.tabType].search.open,
              }, 'Search option wrapper should been displayed')
              if (tab.search && tab.search.enabled) {
                assert.isTrue(searchOptionWrapper.parent().props().show, 'Search option')
              } else {
                assert.isFalse(searchOptionWrapper.parent().props().show, 'Search option')
              }
              // 9 - Refresh table
              const refreshTableComponent = enzymeWrapper.find(RefreshTableComponent)
              assert.lengthOf(refreshTableComponent, 1, 'There should be refresh table container')
              testSuiteHelpers.assertWrapperProperties(refreshTableComponent, {
                tabType: props.tabType,
                resultsContext: props.resultsContext,
                requestParameters: props.requestParameters,
                searchActions: props.searchActions,
              }, 'Refresh table properties should be correctly set')
            })
          }
        })
      })
    })
  })
})
