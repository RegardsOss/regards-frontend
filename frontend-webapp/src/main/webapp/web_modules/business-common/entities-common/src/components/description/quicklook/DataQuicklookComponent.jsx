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
import has from 'lodash/has'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { CatalogShapes } from '@regardsoss/shape'

/**
 * Shows entity description view.
 * Note: you can add here properties that should be sent to inner dialog.
 */
class DataQuicklookComponent extends React.Component {
  static propTypes = {
    entity: CatalogShapes.Entity,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      entity,
    } = this.props
    let imageSrc
    if (has(entity, 'content.files.QUICKLOOK_MD[0].uri')) {
      imageSrc = entity.content.files.QUICKLOOK_MD[0].uri
    } else {
      imageSrc = entity.content.files.QUICKLOOK_SD[0].uri
    }

    return (
      <img
        src={imageSrc}
        alt=""
      />
    )
  }
}
export default DataQuicklookComponent
