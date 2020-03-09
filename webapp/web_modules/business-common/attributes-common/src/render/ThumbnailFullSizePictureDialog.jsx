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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

/**
 * Shows full size picture dialog for thumbnail
 * @author Raphaël Mechali
 */
class ThumbnailFullSizePictureDialog extends React.Component {
  static propTypes = {
    // mandatory to be opened, but thumbnail does not always exists in entity (should not be opened in such case)
    thumbnailURI: PropTypes.string,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Min width for small pictures */
  static MIN_WIDTH = 100

  state = {
    contentStyle: null,
  }

  componentDidUpdate(prevProps, prevState) {
    const { thumbnailURI } = this.props
    const { contentStyle } = this.state
    if (!contentStyle) {
      // Load the picture to get its width
      const img = new Image()
      img.src = thumbnailURI
      img.onload = () => {
        this.setState({
          contentStyle: {
            maxWidth: Math.max(img.width, ThumbnailFullSizePictureDialog.MIN_WIDTH),
          },
        })
      }
    }
  }


  render() {
    const { open, onClose, thumbnailURI } = this.props
    const { contentStyle } = this.state
    const { intl: { formatMessage }, moduleTheme: { thumbnailDialog: { content } } } = this.context
    if (!open || !contentStyle) {
      // No render before image is
      return null
    }
    const actions = [
      <FlatButton
        key="cancel"
        label={formatMessage({ id: 'attribute.thumbnail.action.close' })}
        primary
        onClick={onClose}
      />,
    ]
    return (
      <Dialog
        modal={false}
        onRequestClose={onClose}
        autoScrollBodyContent
        contentStyle={contentStyle}
        bodyStyle={content}
        open
        actions={actions}
      >
        <img
          alt={formatMessage({ id: 'attribute.thumbnail.alt' })}
          src={thumbnailURI}
        />
      </Dialog>
    )
  }
}
export default ThumbnailFullSizePictureDialog
