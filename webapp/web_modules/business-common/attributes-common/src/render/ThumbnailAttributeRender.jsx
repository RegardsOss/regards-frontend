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
import get from 'lodash/get'
import compose from 'lodash/fp/compose'
import { CommonDomain, UIDomain } from '@regardsoss/domain'
import { CatalogShapes, UIShapes } from '@regardsoss/shape'
import { AccessProjectClient } from '@regardsoss/client'
import { connect } from '@regardsoss/redux'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { ZoomablePicture } from '@regardsoss/components'
import { withAuthInfo } from '@regardsoss/authentication-utils'
import { ThumbnailHelper } from '@regardsoss/domain/ui'
import messages from '../i18n'
import styles from '../styles'

/** Default UI settings selectors instance, retrieving common user app settings data */
const uiSettingsSelectors = AccessProjectClient.getUISettingsSelectors()

/**
 * Component to render thumbnail attributes group
 * Note: That component can only be used in user interface as it requires settings reducer to work (since
 * it uses the primary quicklook group settings)
 *
 * @author Sébastien Binda
 */
export class ThumbnailAttributeRender extends React.Component {
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
    value: CatalogShapes.entityFiles,
    // thumbnail dimansions (defaults to table one when not provided)
    dimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }),
    projectName: PropTypes.string,
    accessToken: PropTypes.string,
    // From mapStateToProps
    settings: UIShapes.UISettings.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * @returns {*} file to use, matching DataManagementShapes.DataFile, or null if none found
   */
  getPictureFile = () => {
    const {
      value: entityFiles, accessToken, projectName, settings: { primaryQuicklookGroup },
    } = this.props
    const thumbnailFile = UIDomain.ThumbnailHelper.getThumbnail(
      get(entityFiles, CommonDomain.DATA_TYPES_ENUM.THUMBNAIL), accessToken, projectName)
    if (thumbnailFile) {
      // case A: thumbnail available
      return thumbnailFile
    }
    // case B: search for the best fallback in quicklooks
    return ThumbnailHelper.getQuicklookFallback(
      UIDomain.QuicklookHelper.getQuicklooks(entityFiles, primaryQuicklookGroup, accessToken, projectName))
  }

  render() {
    const { dimensions } = this.props
    const { intl: { formatMessage }, moduleTheme: { defaultThumbnailStyle } } = this.context

    const pictureURI = (this.getPictureFile() || {}).uri
    return <ZoomablePicture
      style={dimensions || defaultThumbnailStyle}
      normalPicURL={pictureURI}
      alt={formatMessage({ id: 'attribute.thumbnail.alt' })}
    />
  }
}

export default compose(
  withAuthInfo,
  withModuleStyle(styles, true),
  withI18n(messages, true),
  connect(ThumbnailAttributeRender.mapStateToProps))(ThumbnailAttributeRender)
