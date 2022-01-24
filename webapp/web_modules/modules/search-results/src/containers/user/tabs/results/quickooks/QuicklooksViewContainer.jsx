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
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { UIDomain } from '@regardsoss/domain'
import { AccessProjectClient } from '@regardsoss/client'
import {
  AccessShapes, CommonShapes, UIShapes, CatalogShapes,
} from '@regardsoss/shape'
import { BasicPageableActions } from '@regardsoss/store-utils'
import QuicklooksViewComponent from '../../../../../components/user/tabs/results/quickooks/QuicklooksViewComponent'
import { withSelectionContainer } from '../common/withSelectionContainer'

/** Default UI settings selectors instance, retrieving common user app settings data */
const uiSettingsSelectors = AccessProjectClient.getUISettingsSelectors()

/**
 * Container for quicklooks view component. It adapts current results context and properties to bundle cell
 * properties object outside render time. It also binds locale and theme to make sure cells will re-render, as
 * they are PureComponent (not listening to context)
 * @author Raphaël Mechali
 */
export class QuicklooksViewContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      settings: uiSettingsSelectors.getSettings(state),
    }
  }

  static propTypes = {
    // Entities cached
    loadedEntities: PropTypes.arrayOf(CatalogShapes.Entity).isRequired,
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    resultsContext: UIShapes.ResultsContext.isRequired, // used in onPropertiesUpdated
    requestParameters: CommonShapes.RequestParameters.isRequired,
    searchActions: PropTypes.instanceOf(BasicPageableActions).isRequired,
    // Description management
    // eslint-disable-next-line react/no-unused-prop-types
    descriptionAvailable: PropTypes.bool.isRequired, // used in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    onShowDescription: PropTypes.func, // used in onPropertiesUpdated
    // Download management
    // eslint-disable-next-line react/no-unused-prop-types
    accessToken: PropTypes.string, // used in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    projectName: PropTypes.string.isRequired, // used in onPropertiesUpdated
    // Basket management
    // eslint-disable-next-line react/no-unused-prop-types
    onAddElementToCart: PropTypes.func, // used in onPropertiesUpdated
    // Used to embed quicklooks as map side view
    embedInMap: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    mapThumbnailHeight: PropTypes.number, // used in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    settings: UIShapes.UISettings.isRequired, // used in onPropertiesUpdated
    // Manage selected product in quicklooks
    itemOfInterestPicked: PropTypes.number,
    isItemOfInterest: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    onZoomToFeature: PropTypes.func, // Handler when zoom to button is fired

    // eslint-disable-next-line react/no-unused-prop-types
    onProductSelected: PropTypes.func, // used in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    selectedProducts: PropTypes.objectOf(CatalogShapes.Entity).isRequired,

    // From map state to props
    // eslint-disable-next-line react/no-unused-prop-types
    theme: AccessShapes.Theme.isRequired, // used in onPropertiesUpdated, automatically add by REGARDS connect method
    // eslint-disable-next-line react/no-unused-prop-types
    i18n: PropTypes.string.isRequired, // used in onPropertiesUpdated, automatically add by REGARDS connect method
  }

  static defaultProps = {
    embedInMap: false,
    mapThumbnailHeight: null,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
    * Properties change detected: update local state
    * @param oldProps previous component properties
    * @param newProps next component properties
    */
  onPropertiesUpdated = (oldProps, newProps) => {
    // bundle item properties together, so that object is not built at render time
    const {
      tabType, resultsContext, descriptionAvailable, onShowDescription,
      accessToken, projectName, onAddElementToCart,
      embedInMap, mapThumbnailHeight, settings, onProductSelected,
      theme, i18n, selectedProducts, toggledElements, selectionMode, onZoomToFeature,
    } = newProps
    const {
      selectedTypeState: { enableDownload, enableServices },
      selectedModeState: { presentationModels },
    } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)

    const { resultsContext: oldContext, tabType: oldTabType } = oldProps
    const {
      selectedTypeState: { enableDownload: oldEnableDownload, enableServices: oldEnableServices },
      selectedModeState: { presentationModels: oldPresentationModels },
    } = oldContext && oldTabType ? UIDomain.ResultsContextHelper.getViewData(oldProps.resultsContext, oldTabType) : {
      selectedTypeState: {},
      selectedModeState: {},
    }

    if (!isEqual(tabType, oldTabType)
      || !isEqual(oldPresentationModels, presentationModels)
      || !isEqual(oldProps.descriptionAvailable, descriptionAvailable)
      || !isEqual(oldProps.onAddElementToCart, onAddElementToCart)
      || !isEqual(oldProps.onShowDescription, onShowDescription)
      || !isEqual(oldEnableDownload, enableDownload)
      || !isEqual(oldEnableServices, enableServices)
      || !isEqual(oldProps.accessToken, accessToken)
      || !isEqual(oldProps.projectName, projectName)
      || !isEqual(oldProps.embedInMap, embedInMap)
      || !isEqual(oldProps.mapThumbnailHeight, mapThumbnailHeight)
      || !isEqual(oldProps.settings, settings)
      || !isEqual(oldProps.selectedProducts, selectedProducts)
      || !isEqual(oldProps.toggledElements, toggledElements)
      || !isEqual(oldProps.selectionMode, selectionMode)
      || !isEqual(oldProps.onZoomToFeature, onZoomToFeature)
      || !isEqual(oldProps.theme, theme)
      || !isEqual(oldProps.i18n, i18n)
    ) {
      this.setState({
        cellProperties: {
          tabType,
          presentationModels,
          enableServices,
          descriptionAvailable,
          onAddElementToCart,
          onShowDescription,
          enableDownload,
          accessToken,
          projectName,
          embedInMap,
          mapThumbnailHeight,
          primaryQuicklookGroup: settings.primaryQuicklookGroup,
          selectedProducts,
          onProductSelected,
          onZoomToFeature,
          // Quicklooks cells are pure components so they require the theme and locale to redraw
          currentTheme: theme,
          locale: i18n,
        },
      })
    }
  }

  render() {
    const {
      tabType, requestParameters, searchActions, embedInMap, itemOfInterestPicked, isItemOfInterest, loadedEntities,
    } = this.props
    const { cellProperties } = this.state

    return (
      <QuicklooksViewComponent
        tabType={tabType}
        requestParameters={requestParameters}
        searchActions={searchActions}
        cellProperties={cellProperties}
        embedInMap={embedInMap}
        itemOfInterestPicked={itemOfInterestPicked}
        isItemOfInterest={isItemOfInterest}
        loadedEntities={loadedEntities}
      />
    )
  }
}

export default withSelectionContainer(connect(QuicklooksViewContainer.mapStateToProps)(QuicklooksViewContainer))
