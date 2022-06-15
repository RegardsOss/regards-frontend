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
import compose from 'lodash/fp/compose'
import { connect } from '@regardsoss/redux'
import { URLAuthInjector } from '@regardsoss/domain/common'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { ZoomablePicture } from '@regardsoss/components'
import { withAuthInfo } from '@regardsoss/authentication-utils'
import styles from '../styles'

/**
 * Component to render url image attribute
 *
 * @author Théo Lasserre
 */
export class URLImageAttributeRender extends React.Component {
  static propTypes = {
    value: PropTypes.string, // image uri
    projectName: PropTypes.string,
    accessToken: PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * @returns {*} file to use or null if none found
   */
  getPictureFile = () => {
    const {
      accessToken, projectName, value,
    } = this.props
    return {
      uri: URLAuthInjector(value, accessToken, projectName),
      reference: true,
    }
  }

  render() {
    const { moduleTheme: { defaultThumbnailStyle, urlImageRenderCellDiv } } = this.context

    const pictureURI = (this.getPictureFile() || {}).uri
    return <div style={urlImageRenderCellDiv}>
      <ZoomablePicture
        style={defaultThumbnailStyle}
        normalPicURL={pictureURI}
        alt=""
      />
    </div>
  }
}

export default compose(
  withAuthInfo,
  withModuleStyle(styles, true),
  connect())(URLImageAttributeRender)
