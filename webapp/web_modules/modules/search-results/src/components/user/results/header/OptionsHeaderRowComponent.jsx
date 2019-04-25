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
import reduce from 'lodash/reduce'
import { AccessShapes, UIShapes } from '@regardsoss/shape'
import { TableHeaderLine, TableHeaderOptionGroup, TableHeaderOptionsArea } from '@regardsoss/components'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import TypeTabContainer from '../../../../containers/user/results/header/options/TypeTabContainer'
import ToggleFiltersContainer from '../../../../containers/user/results/header/options/ToggleFiltersContainer'
import ModeSelectorContainer from '../../../../containers/user/results/header/options/ModeSelectorContainer'
import SelectAllContainer from '../../../../containers/user/results/header/options/SelectAllContainer'
import SingleSortingContainer from '../../../../containers/user/results/header/options/SingleSortingContainer'
import ToggleOnlyQuicklookContainer from '../../../../containers/user/results/header/options/ToggleOnlyQuicklookContainer'
import EditColumnsSettingsContainer from '../../../../containers/user/results/header/options/EditColumnsSettingsContainer'
import SelectionServiceComponent from './options/SelectionServiceComponent'
import AddSelectionToCartComponent from './options/AddSelectionToCartComponent'


/**
 * Options header row: shows options available (filters, services...) and allows user browing between available view mode and types
 * @author Raphaël Mechali
 */
class OptionsHeaderRowComponent extends React.Component {
  static propTypes = {
    moduleId: PropTypes.number.isRequired,
    resultsContext: UIShapes.ResultsContext.isRequired,
    onAddSelectionToCart: PropTypes.func,
    selectionServices: AccessShapes.PluginServiceWithContentArray,
    onStartSelectionService: PropTypes.func,
  }

  /** Preferred display order for tab selectors */
  static TYPE_DISPLAY_ORDER = [
    DamDomain.ENTITY_TYPES_ENUM.COLLECTION,
    DamDomain.ENTITY_TYPES_ENUM.DATASET,
    DamDomain.ENTITY_TYPES_ENUM.DATA,
    DamDomain.ENTITY_TYPES_ENUM.DOCUMENT,
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

  /**
   * @param {*} resultsContext results context (UIShapes.ResultsContext)
   * @return {boolean} returns true when quicklooks filter should be shown, ie. view is currently
   * showing DATA or DATASET and quicklook or map view enabled for DATA (it marks the use of quicklook views
   * and therefore the filter interest)
   */
  static shouldShowQuicklooksFilter(resultsContext) {
    const dataViewsGroupState = resultsContext.typeState[DamDomain.ENTITY_TYPES_ENUM.DATA].modeState
    // Nota: map and quicklooks cannot be enabled for datasets, only for data
    return OptionsHeaderRowComponent.SHOW_QUICKLOOK_FILTER_TYPES.includes(resultsContext.type)
      && (dataViewsGroupState[UIDomain.RESULTS_VIEW_MODES_ENUM.MAP].enabled
        || dataViewsGroupState[UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK].enabled)
  }

  render() {
    const {
      moduleId, resultsContext,
      onAddSelectionToCart,
      selectionServices, onStartSelectionService,
    } = this.props

    const {
      mode, currentTypeState, currentModeState,
    } = UIDomain.ResultsContextConstants.getViewData(resultsContext)


    const showTabs = reduce(resultsContext.typeState, (count, state) => state.enabled ? count + 1 : count, 0) > 1
    return (
      <TableHeaderLine key="table.options">
        {/* 1. Type selection tabs, on left, when many type can be selected, place holder otherwise */
        showTabs ? (
          <TableHeaderOptionGroup show>
            {
              OptionsHeaderRowComponent.TYPE_DISPLAY_ORDER.map(currentType => resultsContext.typeState[currentType].enabled
                ? <TypeTabContainer
                  key={`tab.selector.${currentType}`}
                  moduleId={moduleId}
                  resultsContext={resultsContext}
                  type={currentType}
                />
                : null)
            }
          </TableHeaderOptionGroup>) : <div /> // placeholder
        }
        { /* 2. Mode selection and options, on right */}
        <TableHeaderOptionsArea reducible>
          {/* 2.A Selection related options (services and add to basket) */}
          <TableHeaderOptionGroup show={
            (!!onStartSelectionService && !!selectionServices && selectionServices.length > 0)
            || !!onAddSelectionToCart
          }
          >
            { /* 2.A.1 Services */
              selectionServices.map(service => (
                <SelectionServiceComponent
                  key={`${service.content.type}.service.${service.content.configId}`}
                  service={service}
                  onRunService={onStartSelectionService}
                />))
            }
            { /** 2.B.1 - Add selection to cart */ }
            <AddSelectionToCartComponent onAddSelectionToCart={onAddSelectionToCart} />
          </TableHeaderOptionGroup>
          {/* 2.B Extended options: filter quicklook only (when it can be applied) and toggle filters */}
          <TableHeaderOptionGroup show={
            OptionsHeaderRowComponent.shouldShowQuicklooksFilter(resultsContext)
            || currentTypeState.facets.allowed
          }
          >
            { /** 2.B.1 - Filter entities with quicklook only (only when project configured quicklooks / map views and for DATA/DATASET types) */
              OptionsHeaderRowComponent.shouldShowQuicklooksFilter(resultsContext)
                ? <ToggleOnlyQuicklookContainer moduleId={moduleId} resultsContext={resultsContext} />
                : null
            }
            { /** 2.B.2 - Toggle filters selection bar */ }
            <ToggleFiltersContainer moduleId={moduleId} resultsContext={resultsContext} />
          </TableHeaderOptionGroup>
          {/* 2.C Results options:
            1- select all / none (when mode allows selection but not in table mode as that option is provided through column headers)
            2- sort on single attribute (when type allows sorting but not in table mode as that option is provided through column headers)
          */}
          <TableHeaderOptionGroup show={
              (mode !== UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE && currentModeState.enableSelection)
              || (mode !== UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE && currentTypeState.enableSorting)
            }
          >
            { // 2.C.1 - select all / none
              mode !== UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE && currentModeState.enableSelection
                ? <SelectAllContainer />
                : null
            }
            { // 2.C.2 - sort on single attribute
              mode !== UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE && currentTypeState.enableSorting
                ? <SingleSortingContainer moduleId={moduleId} resultsContext={resultsContext} />
                : null
            }
          </TableHeaderOptionGroup>
          {/* 2.4 - Configure table columns (available only for table mode) */}
          <TableHeaderOptionGroup show={mode === UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE}>
            {
              <EditColumnsSettingsContainer moduleId={moduleId} resultsContext={resultsContext} />
            }
          </TableHeaderOptionGroup>
          {/* 2.6 - View mode selectors (list / table / quicklook / map), when more than 1 is available*/}
          <TableHeaderOptionGroup show={reduce(currentTypeState.modeState, (count, state) => state.enabled ? count + 1 : count, 0) > 1}>
            {
              OptionsHeaderRowComponent.MODE_DISPLAY_ORDER.map(currentMode => currentTypeState.modeState[currentMode].enabled
                ? <ModeSelectorContainer
                  key={`mode.selector.${currentMode}`}
                  moduleId={moduleId}
                  resultsContext={resultsContext}
                  mode={currentMode}
                />
                : null)
          }
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </TableHeaderLine>
    )
  }
}
export default OptionsHeaderRowComponent
