/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AccessShapes, CommonShapes, UIShapes } from '@regardsoss/shape'
import { UIDomain } from '@regardsoss/domain'
import { BasicPageableActions } from '@regardsoss/store-utils'
import { LazyModuleComponent } from '@regardsoss/modules'
import { TableLayout } from '@regardsoss/components'
import OptionsHeaderRowComponent from './header/OptionsHeaderRowComponent'
import ResultFacetsHeaderRowContainer from '../../../containers/user/results/header/ResultFacetsHeaderRowContainer'
import ApplyingCriteriaHeaderRowContainer from '../../../containers/user/results/header/ApplyingCriteriaHeaderRowContainer'
import TableViewContainer from '../../../containers/user/results/table/TableViewContainer'
import ListViewContainer from '../../../containers/user/results/list/ListViewContainer'
import QuicklooksViewContainer from '../../../containers/user/results/quickooks/QuicklooksViewContainer'
import MapViewContainer from '../../../containers/user/results/map/MapViewContainer'

/**
 * Search results root component: it shows either:
 * - Description module when it it shows table layout with headers and render an inner container according with current
 * view type and mode
 * @author Raphaël Mechali
 */
class SearchResultsComponent extends React.Component {
  static propTypes = {
    moduleId: PropTypes.number.isRequired,
    resultsContext: UIShapes.ResultsContext.isRequired,
    requestParameters: CommonShapes.RequestParameters.isRequired,
    searchActions: PropTypes.instanceOf(BasicPageableActions).isRequired,
    // Description management (optional elements due to HOC system, always provided)
    showDescription: PropTypes.bool,
    descriptionModuleProps: PropTypes.shape({
      appName: PropTypes.string.isRequired,
      project: PropTypes.string.isRequired,
      module: PropTypes.object.isRequired,
    }),
    onShowDescription: PropTypes.func,
    isDescAvailableFor: PropTypes.func,
    // Basket management callbacks (when callback is not provided, functionnality is not available)
    onAddElementToCart: PropTypes.func,
    onAddSelectionToCart: PropTypes.func,
    // Services management (when callback or list are not provided, or empty for the list, functionnality is not availableà
    selectionServices: AccessShapes.PluginServiceWithContentArray,
    onStartSelectionService: PropTypes.func,
    // Download management
    accessToken: PropTypes.string,
    projectName: PropTypes.string.isRequired,
    // Search management
    onSearchEntity: PropTypes.func.isRequired,
  }

  render() {
    const {
      moduleId, resultsContext, requestParameters, searchActions,
      showDescription, descriptionModuleProps, onShowDescription, isDescAvailableFor,
      onSearchEntity, onAddElementToCart, onAddSelectionToCart,
      selectionServices, onStartSelectionService,
      accessToken, projectName,
    } = this.props
    return (
      <TableLayout>
        {/* First header row : switch view type and mode, other view options */}
        <OptionsHeaderRowComponent
          moduleId={moduleId}
          resultsContext={resultsContext}
          selectionServices={selectionServices}
          onStartSelectionService={onStartSelectionService}
          onAddSelectionToCart={onAddSelectionToCart}
        />
        {/* Second header row: results, loading, and optionally facets */}
        <ResultFacetsHeaderRowContainer
          moduleId={moduleId}
          resultsContext={resultsContext}
        />
        {/* Third header row (only with facets enabled):  */}
        <ApplyingCriteriaHeaderRowContainer
          moduleId={moduleId}
          resultsContext={resultsContext}
        />
        {/* Render the view according with current view mode (or description if opened) */
          (() => {
            if (showDescription) {
              // Replace current results by the description view
              return <LazyModuleComponent {...descriptionModuleProps} />
            }
            // render regular results in the right mode
            const { mode } = UIDomain.ResultsContextConstants.getViewData(resultsContext)
            switch (mode) {
              case UIDomain.RESULTS_VIEW_MODES_ENUM.LIST:
                return (
                  <ListViewContainer
                    resultsContext={resultsContext}
                    requestParameters={requestParameters}
                    searchActions={searchActions}
                    descriptionAvailable={!!onShowDescription && isDescAvailableFor(resultsContext.type)}
                    onShowDescription={onShowDescription}
                    accessToken={accessToken}
                    projectName={projectName}
                    onAddElementToCart={onAddElementToCart}
                    onSearchEntity={onSearchEntity}
                  />
                )
              case UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE:
                return (
                  <TableViewContainer
                    moduleId={moduleId}
                    resultsContext={resultsContext}
                    requestParameters={requestParameters}
                    searchActions={searchActions}
                    descriptionAvailable={!!onShowDescription && isDescAvailableFor(resultsContext.type)}
                    onShowDescription={onShowDescription}
                    accessToken={accessToken}
                    projectName={projectName}
                    onAddElementToCart={onAddElementToCart}
                    onSearchEntity={onSearchEntity}
                  />
                )
              case UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK:
                return (
                  <QuicklooksViewContainer
                    resultsContext={resultsContext}
                    requestParameters={requestParameters}
                    searchActions={searchActions}
                    descriptionAvailable={!!onShowDescription && isDescAvailableFor(resultsContext.type)}
                    onShowDescription={onShowDescription}
                    accessToken={accessToken}
                    projectName={projectName}
                    onAddElementToCart={onAddElementToCart}
                  />)
              case UIDomain.RESULTS_VIEW_MODES_ENUM.MAP:
                return (
                  <MapViewContainer
                    moduleId={moduleId}
                    resultsContext={resultsContext}
                    requestParameters={requestParameters}
                    searchActions={searchActions}
                    descriptionAvailable={!!onShowDescription && isDescAvailableFor(resultsContext.type)}
                    onShowDescription={onShowDescription}
                    accessToken={accessToken}
                    projectName={projectName}
                    onAddElementToCart={onAddElementToCart}
                  />)
              default:
                throw new Error(`Unknown view mode: ${mode}`)
            }
          })()
        }
      </TableLayout>
    )
  }
}
export default SearchResultsComponent
