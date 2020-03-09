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
import forEach from 'lodash/forEach'
import reduce from 'lodash/reduce'
import { DamDomain, AccessDomain, UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import OptionsHeaderRowComponent from '../../../../../../src/components/user/tabs/results/header/OptionsHeaderRowComponent'
import TypeTabContainer from '../../../../../../src/containers/user/tabs/results/header/options/TypeTabContainer'
import ToggleFiltersContainer from '../../../../../../src/containers/user/tabs/results/header/options/ToggleFiltersContainer'
import ModeSelectorContainer from '../../../../../../src/containers/user/tabs/results/header/options/ModeSelectorContainer'
import SelectAllContainer from '../../../../../../src/containers/user/tabs/results/header/options/SelectAllContainer'
import SingleSortingContainer from '../../../../../../src/containers/user/tabs/results/header/options/SingleSortingContainer'
import ToggleOnlyQuicklookContainer from '../../../../../../src/containers/user/tabs/results/header/options/ToggleOnlyQuicklookContainer'
import EditColumnsSettingsContainer from '../../../../../../src/containers/user/tabs/results/header/options/EditColumnsSettingsContainer'
import SelectionServiceComponent from '../../../../../../src/components/user/tabs/results/header/options/SelectionServiceComponent'
import AddSelectionToCartComponent from '../../../../../../src/components/user/tabs/results/header/options/AddSelectionToCartComponent'
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
    context: dataContext,
    services: [{
      content: {
        configId: 1,
        label: 'service1',
        icon: 'any.png',
        applicationModes: [AccessDomain.applicationModes.ONE, AccessDomain.applicationModes.MANY],
        entityTypes: [DamDomain.ENTITY_TYPES_ENUM.DATA],
        type: AccessDomain.pluginTypes.UI,
      },
    }, {
      content: {
        configId: 2,
        label: 'service2',
        icon: 'any2.png',
        applicationModes: [AccessDomain.applicationModes.MANY],
        entityTypes: [DamDomain.ENTITY_TYPES_ENUM.DATA],
        type: AccessDomain.pluginTypes.CATALOG,
      },
    }],
    hasMultipleTypes: true,
  }, {
    context: dataContext,
    services: [],
    hasMultipleTypes: true,
  },
  ]

  testCases.forEach(({ context, services, hasMultipleTypes }) => {
    // render once for each available view and mode in context (allows testing all views of DATA, DATASET)
    forEach(context.typeState, (groupState, groupType) => {
      if (groupState.enabled) {
        forEach(groupState.modeState, (modeState, modeType) => {
          if (modeState.enabled) {
            // test case is here!
            it(`Should render correctly for type "${groupType}" in mode "${modeType}"`, () => {
              const props = {
                moduleId: 1,
                resultsContext: {
                  ...context,
                  type: groupType,
                  typeState: {
                    ...context.typeState,
                    [groupType]: {
                      ...context.typeState[groupType],
                      mode: modeType,
                    },
                  },
                },
                onAddSelectionToCart: () => {},
                selectionServices: services,
                onStartSelectionService: () => {},
              }
              const enzymeWrapper = shallow(<OptionsHeaderRowComponent {...props} />, { context: renderContext })
              // 1 - check tabs are shown / hidden
              if (hasMultipleTypes) {
                assert.isTrue(enzymeWrapper.find(TypeTabContainer).length > 1, 'There should be type tabs')
              } else {
                assert.lengthOf(enzymeWrapper.find(TypeTabContainer), 0, 'Type tabs should be hidden should be hidden')
              }
              // 2 - Check all services are displayed
              const servicesComponents = enzymeWrapper.find(SelectionServiceComponent)
              assert.lengthOf(servicesComponents, services.length, 'All found services should be displayed')
              services.forEach((service) => {
                const serviceComponent = servicesComponents.findWhere(serviceComp => serviceComp.props().service === service)
                assert.lengthOf(serviceComponent, 1, `There should be displayer for service ${service.content.label}`)
                assert.equal(serviceComponent.props().onRunService, props.onStartSelectionService,
                  `Start service callback should be correctly reported for service ${service.content.label}`)
              })
              // 3 - Add selection to cart
              const addToCartContainer = enzymeWrapper.find(AddSelectionToCartComponent)
              assert.lengthOf(addToCartContainer, 1, 'There should be add to cart container')
              assert.equal(addToCartContainer.props().onAddSelectionToCart, props.onAddSelectionToCart,
                'Add to cart container callback should be correctly set')
              // 4 - Data and dataset only: quiclooks filter
              const quicklookFilterContainer = enzymeWrapper.find(ToggleOnlyQuicklookContainer)
              if (groupType === DamDomain.ENTITY_TYPES_ENUM.DATA || groupType === DamDomain.ENTITY_TYPES_ENUM.DATASET) {
                assert.lengthOf(quicklookFilterContainer, 1, 'There should be quicklook filter container')
                testSuiteHelpers.assertWrapperProperties(quicklookFilterContainer, {
                  moduleId: props.moduleId,
                  resultsContext: props.resultsContext,
                }, 'Quicklooks filter container properties should be correctly provided')
              } else {
                assert.lengthOf(quicklookFilterContainer, 0, 'Quicklook filter container should be hidden')
              }
              // 5 - Toggle filters (currently in all views and modes, due to configuration)
              const toggleFiltersContainer = enzymeWrapper.find(ToggleFiltersContainer)
              assert.lengthOf(toggleFiltersContainer, 1, 'Toggle filters container should be shown')
              testSuiteHelpers.assertWrapperProperties(toggleFiltersContainer, {
                moduleId: props.moduleId,
                resultsContext: props.resultsContext,
              }, 'Toggle filters container properties should be correctly set')
              // 6 - Select all for view modes with selection (but not table)
              const selectAllContainer = enzymeWrapper.find(SelectAllContainer)
              if (modeState.enableSelection && modeType !== UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE) {
                assert.lengthOf(selectAllContainer, 1, 'There should be select all container')
              } else {
                assert.lengthOf(selectAllContainer, 0, 'Select all container should be hidden')
              }
              // 7 - Sort on single attributes for view types allowing sorting (but not in table mode)
              const sortContainer = enzymeWrapper.find(SingleSortingContainer)
              if (groupState.enableSorting && modeType !== UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE) {
                assert.lengthOf(sortContainer, 1, 'There should be sort container')
                testSuiteHelpers.assertWrapperProperties(sortContainer, {
                  moduleId: props.moduleId,
                  resultsContext: props.resultsContext,
                }, 'Sort container properties should be correctly set')
              } else {
                assert.lengthOf(sortContainer, 0, 'Sort container should be hidden')
              }
              // 8 - Columns settings (container is auto hiding when in table mode, not to be tested here)
              const columnsSettingsContainer = enzymeWrapper.find(EditColumnsSettingsContainer)
              assert.lengthOf(columnsSettingsContainer, 1, 'There should be columns settings container')
              testSuiteHelpers.assertWrapperProperties(columnsSettingsContainer, {
                moduleId: props.moduleId,
                resultsContext: props.resultsContext,
              }, 'Columns settings container properties should be correctly set')
              // 9 - Check one mode selector is provided by enabled mode in group
              const enabledModes = reduce(groupState.modeState,
                (acc, modeState2, modeType2) => modeState2.enabled ? [...acc, modeType2] : acc, [])
              const modeSelectors = enzymeWrapper.find(ModeSelectorContainer)
              assert.lengthOf(modeSelectors, enabledModes.length, 'There should be a selector by enabled view mode in group')
              enabledModes.forEach((enabledModeType) => {
                const modeSelector = modeSelectors.findWhere(n => n.props().mode === enabledModeType)
                assert.lengthOf(modeSelector, 1, `There should be ${enabledModeType} mode selector`)
                testSuiteHelpers.assertWrapperProperties(modeSelector, {
                  moduleId: props.moduleId,
                  resultsContext: props.resultsContext,
                }, `Mode ${enabledModeType} selector properties should be correctly set`)
              })
            })
          }
        })
      }
    })
  })
})
