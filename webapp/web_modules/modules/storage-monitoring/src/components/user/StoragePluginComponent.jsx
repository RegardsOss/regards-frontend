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
 */
import { Card, CardTitle, CardMedia } from 'material-ui/Card'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ParsedStoragePluginShape } from '../../model/ParsedStoragePluginShape'
import StoragePluginChartComponent from './StoragePluginChartComponent'
import StoragePluginLegendComponent from './StoragePluginLegendComponent'

/**
 * Displays storage plugin capacity information
 */
class StoragePluginComponent extends React.Component {
  static propTypes = {
    // storage info, as reshaped by parent container and expected by sub components
    storagePlugin: ParsedStoragePluginShape.isRequired,
  }

  /** I18N injection & themes */
  static contextTypes = {
    ...themeContextType, ...i18nContextType,
  }

  render() {
    const { storagePlugin } = this.props
    const { label, description } = storagePlugin
    const { moduleTheme: { user: { pluginCard } } } = this.context

    return (
      <Card className={pluginCard.classes} style={pluginCard.root} containerStyle={pluginCard.contentStyle}>
        <CardTitle
          title={label}
          subtitle={description}
        />
        <CardMedia style={pluginCard.media.rootStyle} mediaStyle={pluginCard.media.contentStyle} >
          <StoragePluginChartComponent storagePlugin={storagePlugin} />
          <StoragePluginLegendComponent storagePlugin={storagePlugin} />
        </CardMedia>
      </Card>
    )
  }
}

export default StoragePluginComponent
