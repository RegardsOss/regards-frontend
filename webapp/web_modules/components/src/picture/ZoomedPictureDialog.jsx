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
import root from 'window-or-global'
import compose from 'lodash/fp/compose'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import messages from './i18n'
import styles from './styles'

/**
 * Dialog showing full size picture.
 * @author Raphaël Mechali
 */
export class ZoomedPictureDialog extends React.Component {
  static propTypes = {
    picURL: PropTypes.string,
    alt: PropTypes.string.isRequired,
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
   * Dialog content loaded. Apply workaround to force dialog repositioning as its child content has changed:
   * https://github.com/mui-org/material-ui/issues/1676 (resolved in v1x, not in v0x...)
   */
  onDialogContentLoaded = (evt) => {
    root.window.dispatchEvent(new Event('resize')) // Workaround (see comment above)
  }

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    if (oldProps.picURL !== newProps.picURL) {
      // load picture to ensure dialog best max width
      const img = new root.Image()
      img.src = newProps.picURL
      img.onload = () => this.setState({
        contentStyle: {
          maxWidth: Math.max(img.width, ZoomedPictureDialog.MIN_WIDTH),
        },
      })
    }
  }

  render() {
    const {
      picURL, alt, open, onClose,
    } = this.props
    const { contentStyle } = this.state
    const {
      intl: { formatMessage },
      moduleTheme: { clickablePicture: { dialog: { content } } },
    } = this.context
    if (!open) {
      return null
    }
    return (
      // 1. Overlay
      <Dialog
        modal={false}
        onRequestClose={onClose}
        autoScrollBodyContent
        contentStyle={contentStyle}
        bodyStyle={content}
        open
        actions={<>
          <FlatButton
            key="cancel"
            label={formatMessage({ id: 'zoom.picture.close.label' })}
            primary
            onClick={onClose}
          />
        </>}
      >
        <img
          alt={alt}
          src={picURL}
          onLoad={this.onDialogContentLoaded}
        />
      </Dialog>)
  }
}

export default compose(withI18n(messages), withModuleStyle(styles))(ZoomedPictureDialog)
