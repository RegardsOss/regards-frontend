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
import reduce from 'lodash/reduce'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { AccessShapes, CommonShapes, UIShapes } from '@regardsoss/shape'
import { TableHeaderLine, TableHeaderOptionGroup, TableHeaderOptionsArea } from '@regardsoss/components'
import { BasicPageableActions } from '@regardsoss/store-utils'
import TypeTabContainer from '../../../../../containers/user/tabs/results/header/options/TypeTabContainer'
import ToggleFiltersContainer from '../../../../../containers/user/tabs/results/header/options/ToggleFiltersContainer'
import ModeSelectorContainer from '../../../../../containers/user/tabs/results/header/options/ModeSelectorContainer'
import SortingManagerContainer from '../../../../../containers/user/tabs/results/header/options/SortingManagerContainer'
import EditColumnsSettingsContainer from '../../../../../containers/user/tabs/results/header/options/EditColumnsSettingsContainer'
import SearchOptionContainer from '../../../../../containers/user/tabs/results/header/options/SearchOptionContainer'
import SelectionServiceComponent from './options/SelectionServiceComponent'
import AddSelectionToCartComponent from './options/AddSelectionToCartComponent'
import RefreshTableComponent from './options/RefreshTableComponent'

/**
 * Options header row: shows options available (filters, services...) and allows user browing between available view mode and types
 * @author Raphaël Mechali
 */
class OptionsHeaderRowComponent extends React.Component {
  static propTypes = {
    moduleId: PropTypes.number.isRequired,
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
    resultsContext: UIShapes.ResultsContext.isRequired,
    requestParameters: CommonShapes.RequestParameters.isRequired,
    searchActions: PropTypes.instanceOf(BasicPageableActions).isRequired,
    onAddSelectionToCart: PropTypes.func,
    selectionServices: AccessShapes.PluginServiceWithContentArray,
    onStartSelectionService: PropTypes.func,
  }

  /** Preferred display order for tab selectors */
  static TYPE_DISPLAY_ORDER = [
    DamDomain.ENTITY_TYPES_ENUM.DATASET,
    DamDomain.ENTITY_TYPES_ENUM.DATA,
  ]

  /** Preferred display order for mode selectors */
  static MODE_DISPLAY_ORDER = [
    UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
    UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
    UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK,
    UIDomain.RESULTS_VIEW_MODES_ENUM.MAP,
  ]

  /** Entities types for wich quicklook filter should be shown (as it may be currently applying) */
  static SHOW_QUICKLOOK_FILTER_TYPES = [
    DamDomain.ENTITY_TYPES_ENUM.DATASET,
    DamDomain.ENTITY_TYPES_ENUM.DATA,
  ]

  render() {
    const {
      moduleId, tabType, resultsContext,
      requestParameters, searchActions,
      onAddSelectionToCart,
      selectionServices, onStartSelectionService,
    } = this.props

    const {
      tab, selectedMode, selectedTypeState,
    } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)

    const showTypeTabs = reduce(tab.types, (count, typeState) => typeState.enabled ? count + 1 : count, 0) > 1
    const showSelectionServices = selectedTypeState.enableServices
      && !!onStartSelectionService
      && !!selectionServices
      && selectionServices.length > 0
    return (
      <TableHeaderLine key="table.options">
        {/* 1. Type selection tabs, on left, when many type can be selected, place holder otherwise */
          showTypeTabs ? (
            <TableHeaderOptionGroup show>
              {
                OptionsHeaderRowComponent.TYPE_DISPLAY_ORDER.map((type) => tab.types[type].enabled
                  ? <TypeTabContainer
                      key={`tab.selector.${type}`}
                      moduleId={moduleId}
                      type={type}
                      tabType={tabType}
                      resultsContext={resultsContext}
                  />
                  : null)
              }
            </TableHeaderOptionGroup>) : <div /> // placeholder
        }
        { /* 2. Mode selection and options, on right */}
        <TableHeaderOptionsArea reducible>
          {/* 2.A Selection related options (services and add to basket) */}
          <TableHeaderOptionGroup show={showSelectionServices || !!onAddSelectionToCart}>
            { /* 2.A.1 Services */
              showSelectionServices ? selectionServices.map((service) => (
                <SelectionServiceComponent
                  key={`${service.content.type}.service.${service.content.configId}`}
                  service={service}
                  onRunService={onStartSelectionService}
                />)) : null
            }
            { /** 2.A.2 - Add selection to cart */}
            <AddSelectionToCartComponent onAddSelectionToCart={onAddSelectionToCart} />
          </TableHeaderOptionGroup>
          {/* 2.B Extended options: Add refresh button */}
          <TableHeaderOptionGroup show={selectedTypeState.enableRefresh}>
            <RefreshTableComponent
              tabType={tabType}
              resultsContext={resultsContext}
              requestParameters={requestParameters}
              searchActions={searchActions}
            />
          </TableHeaderOptionGroup>
          {/* 2.C Extended options: Toggle filters */}
          <TableHeaderOptionGroup show={selectedTypeState.facetsAllowed}>
            <ToggleFiltersContainer
              moduleId={moduleId}
              tabType={tabType}
              resultsContext={resultsContext}
            />
          </TableHeaderOptionGroup>
          {/* 2.D - sort modal
           */}
          <TableHeaderOptionGroup show={
            selectedTypeState.enableSorting
          }
          >
            { // 2.C - sort on single attribute
              selectedTypeState.enableSorting
                ? (
                  <SortingManagerContainer
                    moduleId={moduleId}
                    tabType={tabType}
                    resultsContext={resultsContext}
                  />
                ) : null
            }
          </TableHeaderOptionGroup>
          {/* 2.E - Configure table columns (available only for table mode) */}
          <TableHeaderOptionGroup show={selectedMode === UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE}>
            <EditColumnsSettingsContainer
              moduleId={moduleId}
              tabType={tabType}
              resultsContext={resultsContext}
            />
          </TableHeaderOptionGroup>
          {/* 2.F - View mode selectors (list / table / quicklook / map), when more than 1 is available*/}
          <TableHeaderOptionGroup show={reduce(selectedTypeState.modes, (count, modeState) => modeState.enabled ? count + 1 : count, 0) > 1}>
            {
              OptionsHeaderRowComponent.MODE_DISPLAY_ORDER.map((aMode) => selectedTypeState.modes[aMode].enabled ? (
                <ModeSelectorContainer
                  key={`mode.selector.${aMode}`}
                  moduleId={moduleId}
                  tabType={tabType}
                  resultsContext={resultsContext}
                  mode={aMode}
                />) : null)
            }
          </TableHeaderOptionGroup>
          {/* 2.G - Search option, when it is available*/}
          <TableHeaderOptionGroup show={tab.search.enabled}>
            <SearchOptionContainer moduleId={moduleId} tabType={tabType} open={tab.search.open} />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </TableHeaderLine>
    )
  }
}
export default OptionsHeaderRowComponent
