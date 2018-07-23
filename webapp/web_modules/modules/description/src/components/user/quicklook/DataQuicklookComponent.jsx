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
import has from 'lodash/has'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { CatalogShapes } from '@regardsoss/shape'
import { URLAuthInjector } from '@regardsoss/domain/common'

/**
 * Shows entity quicklook view.
 * @author Léo Mieulet
 */
class DataQuicklookComponent extends React.Component {
  static propTypes = {
    entity: CatalogShapes.Entity,
    accessToken: PropTypes.string,
    projectName: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }
  state = {
    isZoomed: false,
  }
  /**
   * On user click, toggle the zoom
   */
  toggleZoom = () => {
    const { isZoomed } = this.state
    this.setState({
      isZoomed: !isZoomed,
    })
  }

  render() {
    const {
      entity, accessToken, projectName,
    } = this.props
    const {
      isZoomed,
    } = this.state
    const {
      imageContainerZoomOut, imageContainerZoomIn, imageZoomOut, imageZoomIn,
    } = this.context.moduleTheme.descriptionDialog.card.media.tabs.tab.quicklook

    let imageSrc
    if (isZoomed && has(entity, 'content.files.QUICKLOOK_HD[0].uri')) {
      imageSrc = entity.content.files.QUICKLOOK_HD[0].uri
    } else if (has(entity, 'content.files.QUICKLOOK_MD[0].uri')) {
      imageSrc = entity.content.files.QUICKLOOK_MD[0].uri
    } else {
      imageSrc = entity.content.files.QUICKLOOK_SD[0].uri
    }
    const imageContainerStyle = isZoomed ? imageContainerZoomIn : imageContainerZoomOut
    const imageStyle = isZoomed ? imageZoomIn : imageZoomOut
    return (
      <div
        style={imageContainerStyle}
        onClick={this.toggleZoom}
      >
        <img
          src={URLAuthInjector(imageSrc, accessToken, projectName)}
          alt=""
          style={imageStyle}
        />
      </div>
    )
  }
}
export default DataQuicklookComponent
