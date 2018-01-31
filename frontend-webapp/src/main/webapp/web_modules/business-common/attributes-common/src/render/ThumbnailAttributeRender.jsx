/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import FlatButton from 'material-ui/FlatButton'
import NoDataIcon from 'material-ui/svg-icons/device/wallpaper'
import { CommonDomain } from '@regardsoss/domain'
import { CatalogShapes } from '@regardsoss/shape'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { FitContentDialog } from '@regardsoss/components'
import messages from '../i18n'
import styles from '../styles'

/**
 * Component to render thumbnail attributes group
 * Note: unlike other render, this one is rendering only the first provided value
 *
 * @author Sébastien Binda
 */
export class ThumbnailAttributeRender extends React.Component {
  static propTypes = {
    value: CatalogShapes.entityFiles,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    displayFullSize: false,
  }

  displayFullSize = (uri) => {
    if (this.state.displayFullSize) {
      const { intl: { formatMessage } } = this.context
      const actions = [
        <FlatButton
          key="cancel"
          label={formatMessage({ id: 'attribute.thumbnail.action.close' })}
          primary
          onClick={this.handleToggleDialog}
        />,
      ]
      return (
        <FitContentDialog
          modal={false}
          onRequestClose={this.handleToggleDialog}
          open
          actions={actions}
        >
          <div>
            <img
              src={uri}
              alt={formatMessage({ id: 'attribute.thumbnail.alt' })}
            />
          </div>
        </FitContentDialog>
      )
    }
    return null
  }

  handleToggleDialog = () => {
    this.setState({ displayFullSize: !this.state.displayFullSize })
  }

  render() {
    // in resolved attributes, get the first data, if any
    const { intl: { formatMessage }, moduleTheme: { thumbnailRoot, thumbnailCell, noThumbnailIcon } } = this.context
    const thumbnailURI = get(this.props.value, `${CommonDomain.DataTypesEnum.THUMBNAIL}[0].uri`, null)
    return (
      <div
        style={thumbnailRoot}
        title={thumbnailURI ? null : formatMessage({ id: 'attribute.thumbnail.alt' })}
      >
        {
          thumbnailURI ? (
            <img
              src={thumbnailURI}
              style={thumbnailCell}
              alt={formatMessage({ id: 'attribute.thumbnail.alt' })}
              onClick={this.handleToggleDialog}
            />) : (
              <NoDataIcon
                style={noThumbnailIcon}

              />)
        }
        {this.displayFullSize(thumbnailURI)}
      </div>
    )
  }
}

export default compose(withModuleStyle(styles, true), withI18n(messages, true))(ThumbnailAttributeRender)
