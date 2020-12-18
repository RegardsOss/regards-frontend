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
 import IconButton from 'material-ui/IconButton'
 **/
import AvReplay from 'mdi-material-ui/Replay'
import { IngestShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { ResourceIconAction, TableSelectionModes } from '@regardsoss/components'
import dependencies from '../../dependencies'

/**
 * Table option to delete Request files on every local storage
 * @author Simon MILHAU
 */
class RequestRetryOption extends React.Component {
  static propTypes = {
    entity: IngestShapes.RequestEntity.isRequired,
    onRetry: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * On button clicked callback
   */
  onClick = () => {
    const { entity, onRetry } = this.props
    onRetry(TableSelectionModes.includeSelected, [entity])
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <ResourceIconAction
        resourceDependencies={dependencies.retryRequestDependency}
        onClick={this.onClick}
        title={formatMessage({ id: 'oais.requests.retry.title' })}
      >
        <AvReplay />
      </ResourceIconAction>
    )
  }
}

export default RequestRetryOption
