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
import get from 'lodash/get'
import { StorageShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { RefreshIndicatorComponent } from '@regardsoss/components'

/**
 * Show Deletion Errors and a button to relauch
 * @author Sébastien Binda
 */
class StorageLocationActivityRender extends React.Component {
  static propTypes = {
    entity: StorageShapes.StorageLocation,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  render() {
    const { entity } = this.props
    const { intl: { formatMessage }, moduleTheme: { storageTable: { errorColumn: { container } } } } = this.context

    const storageRunning = get(entity, 'content.storageRunning', false)
    const deletionRunning = get(entity, 'content.deletionRunning', false)
    const copyRunning = get(entity, 'content.copyRunning', false)
    const noActivity = !copyRunning && !deletionRunning && !storageRunning

    const style = {
      refresh: {
        display: 'inline-block',
        position: 'relative',
      },
    }

    return (
      <div style={container}>
        {storageRunning
          ? <RefreshIndicatorComponent
              size={20}
              left={10}
              top={0}
              status="loading"
              title={formatMessage({ id: 'storage.location.list.activity.storing' })}
              style={style.refresh}
          />
          : null}
        {deletionRunning
          ? <RefreshIndicatorComponent
              size={20}
              left={10}
              top={0}
              status="loading"
              loadingColor="Red"
              title={formatMessage({ id: 'storage.location.list.activity.deleting' })}
              style={style.refresh}
          />
          : null}
        {copyRunning
          ? <RefreshIndicatorComponent
              size={20}
              left={10}
              top={0}
              loadingColor="#FF9800"
              status="loading"
              title={formatMessage({ id: 'storage.location.list.activity.copying' })}
              style={style.refresh}
          />
          : null}
        {noActivity ? formatMessage({ id: 'storage.location.list.activity.none' }) : null}
      </div>
    )
  }
}
export default StorageLocationActivityRender
