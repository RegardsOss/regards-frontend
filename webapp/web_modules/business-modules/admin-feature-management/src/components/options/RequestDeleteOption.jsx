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
 import IconButton from 'material-ui/IconButton'
 **/
import find from 'lodash/find'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import DeleteOnAllIcon from 'mdi-material-ui/DeleteForever'
import { FemShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { FemDomain } from '@regardsoss/domain'
import { ResourceIconAction } from '@regardsoss/components'
import { requestDeleteActions } from '../../clients/RequestDeleteClient'

/**
 * Table option to delete Request files on every local storage
 * @author Théo Lasserre
 */
class RequestDeleteOption extends React.Component {
  static propTypes = {
    entity: FemShapes.Request.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static DELETE_DEPENDENCIES = requestDeleteActions.getDependency(RequestVerbEnum.POST)

  /**
   * On button clicked callback
   */
  onClick = () => {
    const { entity, onDelete } = this.props
    onDelete([entity])
  }

  isDisabled = () => {
    const { entity } = this.props
    return (entity.content.state !== FemDomain.REQUEST_STATUS_ENUM.ERROR
      || entity.content.state !== FemDomain.REQUEST_STATUS_ENUM.DENIED)
      && !find(entity.links, (l) => l.rel === 'delete')
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { entity } = this.context
    return (
      <ResourceIconAction
        resourceDependencies={RequestDeleteOption.DELETE_DEPENDENCIES}
        onClick={this.onClick}
        title={formatMessage({ id: 'feature.requests.delete.title' })}
        disabled={this.isDisabled()}
      >
        <DeleteOnAllIcon className="selenium-deleteButton" />
      </ResourceIconAction>
    )
  }
}

export default RequestDeleteOption
