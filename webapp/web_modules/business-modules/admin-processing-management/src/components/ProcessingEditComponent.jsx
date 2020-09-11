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
 **/

import IconButton from 'material-ui/IconButton'
import EditIcon from 'mdi-material-ui/Pencil'
import { ProcessingShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Edit Processing component option
 * @author Théo Lasserre
 */
class ProcessingEditComponent extends React.Component {
    static propTypes = {
      entity: ProcessingShapes.Processing.isRequired,
      handleEdit: PropTypes.func.isRequired,
    }

    static contextTypes = {
      ...i18nContextType,
    }

    /**
     * User callback: on edit project user, locally wrapped
     */
    onEdit = () => {
      const { entity, handleEdit } = this.props
      console.error(entity)
      handleEdit(entity.content.pluginConfiguration.businessId)
    }

    render() {
      const { intl: { formatMessage } } = this.context

      return (
        <IconButton
          title={formatMessage({ id: 'processing.management.list.edit.button' })}
          onClick={this.onEdit}
        >
          <EditIcon />
        </IconButton>
      )
    }
}

export default ProcessingEditComponent
