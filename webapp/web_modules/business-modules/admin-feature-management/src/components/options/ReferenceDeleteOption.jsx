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
import DeleteOnAllIcon from 'mdi-material-ui/DeleteForever'
import { FemShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { ResourceIconAction } from '@regardsoss/components'
import { referenceDeleteActions } from '../../clients/ReferencesDeleteClient'

/**
 * Table option to delete AIP files on every local storage
 * @author Théo Lasserre
 */
class ReferenceDeleteOption extends React.Component {
  static propTypes = {
    entity: FemShapes.Reference.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static DELETE_DEPENDENCIES = referenceDeleteActions.getDependency(RequestVerbEnum.POST)

  /**
   * On button clicked callback
   */
  onClick = () => {
    const { entity, onDelete } = this.props
    onDelete(entity)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <ResourceIconAction
        title={formatMessage({ id: 'feature.references.tooltip.delete' })}
        resourceDependencies={ReferenceDeleteOption.DELETE_DEPENDENCIES}
        onClick={this.onClick}
      >
        <DeleteOnAllIcon className="selenium-deleteButton" />
      </ResourceIconAction>
    )
  }
}

export default ReferenceDeleteOption
