/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import find from 'lodash/find'
import AvReplay from 'mdi-material-ui/Replay'
import { FemShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { FemDomain } from '@regardsoss/domain'
import { ResourceIconAction } from '@regardsoss/components'

/**
 * Table option to delete request
 * @author Théo Lasserre
 */
class RequestRetryOption extends React.Component {
  static propTypes = {
    entity: FemShapes.Request.isRequired,
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
    onRetry([entity])
  }

  isDisabled = () => {
    const { entity } = this.props
    return entity.content.state !== FemDomain.REQUEST_STATUS_ENUM.ERROR && !find(entity.links, (l) => l.rel === 'retry')
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <ResourceIconAction
        resourceDependencies={RequestRetryOption.RETRY_DEPENDENCIES}
        onClick={this.onClick}
        title={formatMessage({ id: 'feature.requests.retry.title' })}
        disabled={this.isDisabled()}
      >
        <AvReplay />
      </ResourceIconAction>
    )
  }
}

export default RequestRetryOption
