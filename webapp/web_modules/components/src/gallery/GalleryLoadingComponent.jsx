/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import CircularProgress from 'material-ui/CircularProgress'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
* Gallery loading component, shown in footer
*/
class GalleryLoadingComponent extends React.Component {
  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static styleLoadingGallery = {
    height: '45vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }

  render() {
    const { moduleTheme: { header }, intl: { formatMessage } } = this.context

    return (
      <div style={GalleryLoadingComponent.styleLoadingGallery}>
        <CircularProgress
          size={header.loading.size}
          thickness={header.loading.thickness}
          color={header.loading.color}
        />
        {formatMessage({ id: 'table.loading.message' })}
      </div>
    )
  }
}
export default GalleryLoadingComponent
