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
import isEqual from 'lodash/isEqual'
import { UIDomain } from '@regardsoss/domain'
import { CommonShapes, UIShapes } from '@regardsoss/shape'
import { BasicPageableActions } from '@regardsoss/store-utils'
import QuicklooksViewComponent from '../../../../components/user/results/quickooks/QuicklooksViewComponent'

/**
 * Container for quicklooks view component. It adapts current results context and properties to bundle cell
 * properties object outside render time
 * @author Raphaël Mechali
 */
export class QuicklooksViewContainer extends React.Component {
  static propTypes = {
    resultsContext: UIShapes.ResultsContext.isRequired,
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
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
    * Properties change detected: update local state
    * @param oldProps previous component properties
    * @param newProps next component properties
    */
  onPropertiesUpdated = (oldProps, newProps) => {
    // bundle item properties together, so that object is not built at render time
    const {
      resultsContext, descriptionAvailable, onShowDescription,
      accessToken, projectName, onAddElementToCart,
    } = newProps
    const {
      currentTypeState: { enableDownload, enableServices },
      currentModeState: { presentationModels },
    } = UIDomain.ResultsContextConstants.getViewData(resultsContext)

    const {
      currentTypeState: { enableDownload: oldEnableDownload, enableServices: oldEnableServices },
      currentModeState: { presentationModels: oldPresentationModels },
    } = UIDomain.ResultsContextConstants.getViewData(oldProps.resultsContext)

    if (!isEqual(oldPresentationModels, presentationModels)
      || !isEqual(oldProps.descriptionAvailable, descriptionAvailable)
      || !isEqual(oldProps.onAddElementToCart, onAddElementToCart)
      || !isEqual(oldProps.onShowDescription, onShowDescription)
      || !isEqual(oldEnableDownload, enableDownload)
      || !isEqual(oldEnableServices, enableServices)
      || !isEqual(oldProps.accessToken, accessToken)
      || !isEqual(oldProps.projectName, projectName)
    ) {
      this.setState({
        cellProperties: {
          presentationModels,
          enableServices,
          descriptionAvailable,
          onAddElementToCart,
          onShowDescription,
          enableDownload,
          accessToken,
          projectName,
        },
      })
    }
  }

  render() {
    const { resultsContext, requestParameters, searchActions } = this.props
    const { cellProperties } = this.state
    // recover the configuration (necessarily available in current mode, which must respect QuicklookViewModeState shape)
    const { currentModeState: { graphicsConfiguration } } = UIDomain.ResultsContextConstants.getViewData(resultsContext)

    return (
      <QuicklooksViewComponent
        requestParameters={requestParameters}
        searchActions={searchActions}
        columnWidth={graphicsConfiguration.quicklookColumnWidth}
        columnGutter={graphicsConfiguration.quicklookColumnGutter}
        cellProperties={cellProperties}
      />
    )
  }
}
export default QuicklooksViewContainer
