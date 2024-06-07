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
import find from 'lodash/find'
import Abort from 'mdi-material-ui/Cancel'
import { FemShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { ResourceIconAction } from '@regardsoss/components'

/**
 * Table option to force a request in error
 * @author Théo Lasserre
 */
class RequestForceErrorOption extends React.Component {
  static propTypes = {
    entity: FemShapes.Request.isRequired,
    onForceError: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * On button clicked callback
   */
  onClick = () => {
    const { entity, onForceError } = this.props
    onForceError(entity)
  }

  isDisabled = () => {
    const { entity } = this.props
    return !find(entity.links, (l) => l.rel === 'abort')
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <ResourceIconAction
        onClick={this.onClick}
        title={formatMessage({ id: 'feature.requests.force.error.title' })}
        disabled={this.isDisabled()}
      >
        <Abort />
      </ResourceIconAction>
    )
  }
}

export default RequestForceErrorOption
