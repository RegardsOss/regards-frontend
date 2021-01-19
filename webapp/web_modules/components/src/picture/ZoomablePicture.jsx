/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import compose from 'lodash/fp/compose'
import NoDataIcon from 'mdi-material-ui/Wallpaper'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { ZoomedPictureDialog } from './ZoomedPictureDialog'
import messages from './i18n'
import styles from './styles'

/**
 * Shows a picture that can be zoomed on click (using external dialog)
 *
 * @author Raphaël Mechali
 */
export class ZoomablePicture extends React.Component {
  static propTypes = {
    // overrides default styles when provided.
    style: PropTypes.shape({
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      // other properties
    }),
    // picture to show when embed in page
    normalPicURL: PropTypes.string,
    // picture to show when in full size (when not provided, normalPicURL will be used instead)
    largePicURL: PropTypes.string,
    // alternative text for picture
    alt: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Initial state */
  state = {
    showFullSizeDialog: false,
  }

  /**
   * Callback: user clicked on cell, requesting full size picture dialog
   */
  onShowFullSizeDialog = () => {
    const { normalPicURL, largePicURL } = this.props
    if (normalPicURL || largePicURL) {
      this.setState({ showFullSizeDialog: true })
    }
  }

  /**
   * Callback: user closed full size picture dialog
   */
  onCloseFullSizeDialog = () => {
    this.setState({ showFullSizeDialog: false })
  }

  render() {
    const {
      style, normalPicURL, largePicURL, alt,
    } = this.props
    const { showFullSizeDialog } = this.state
    const {
      intl: { formatMessage },
      moduleTheme: { clickablePicture: { root, normalPicture, noPicture } },
    } = this.context

    return (
      <div
        style={style || root}
        title={normalPicURL ? null : formatMessage({ id: 'no.picture.alt.message' })}
      >
        {
          normalPicURL ? (
            <img
              src={normalPicURL}
              style={normalPicture}
              onClick={this.onShowFullSizeDialog}
              alt={alt}
            />) : (
              <NoDataIcon
                style={noPicture}
              />)
        }
        <ZoomedPictureDialog
          picURL={largePicURL || normalPicURL || null}
          alt={alt}
          open={showFullSizeDialog}
          onClose={this.onCloseFullSizeDialog}
        />
      </div>
    )
  }
}
export default compose(withI18n(messages), withModuleStyle(styles))(ZoomablePicture)
