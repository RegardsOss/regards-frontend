/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import IconButton from 'material-ui/IconButton'
import DeleteOnAllIcon from 'material-ui/svg-icons/action/delete-forever'
import { StorageShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { requestDeleteActions } from '../../clients/RequestDeleteClient'

/** HATEOAS-able button, exported for tests */
export const ResourceIconAction = withResourceDisplayControl(IconButton)

/**
 * Table option to delete Request files on every local storage
 * @author Simon MILHAU
 */
class RequestDeleteOption extends React.Component {
  static propTypes = {
    // Entity. Note: when used in options column, this is provided by the table cell API
    // entity: StorageShapes.RequestEntity.isRequired,
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
    onDelete(entity)
  }

  render() {
    // const { intl: { formatMessage } } = this.context

    return (
      <IconButton onClick={this.onClick}><DeleteOnAllIcon /></IconButton>
      // <ResourceIconAction
      //   resourceDependencies={RequestDeleteOption.DELETE_DEPENDENCIES}
      //   onClick={this.onClick}
      //   title={formatMessage({ id: 'oais.aips.list.delete.files.on.all.storages.title' })}
      // >
      //   <DeleteOnAllIcon className="selenium-deleteButton" />
      // </ResourceIconAction>
    )
  }
}

export default RequestDeleteOption
