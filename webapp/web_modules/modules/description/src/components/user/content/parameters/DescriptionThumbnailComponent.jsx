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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ZoomablePicture } from '@regardsoss/components'
import { FileData } from '../../../../shapes/DescriptionState'

/**
 * Shows thumbnail in parameters section
 * @author Raphaël Mechali
 */
class ThumbnailComponent extends React.Component {
  static propTypes = {
    thumbnail: FileData.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { thumbnail: { uri, label } } = this.props
    const { intl: { formatMessage }, moduleTheme: { user: { main: { content: { parameters } } } } } = this.context
    return (
      <ZoomablePicture
        style={parameters.thumbnail}
        normalPicURL={uri}
        alt={formatMessage({ id: 'module.description.content.parameters.thumbnail.alt.text' }, { label })}
      />)
  }
}
export default ThumbnailComponent
