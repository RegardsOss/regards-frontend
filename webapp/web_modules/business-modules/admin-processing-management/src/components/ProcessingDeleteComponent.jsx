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

import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'mdi-material-ui/Delete'
import { themeContextType } from '@regardsoss/theme'
import { ProcessingShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Delete Processing component option
 * @author Théo Lasserre
 */
class ProcessingDeleteComponent extends React.Component {
  static propTypes = {
    entity: ProcessingShapes.Processing.isRequired,
    handleDelete: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * User callback: on delete project user, locally wrapped
   */
  onDelete = () => {
    const { entity, handleDelete } = this.props
    handleDelete(entity)
  }

  render() {
    const { intl: { formatMessage }, moduleTheme } = this.context

    return (
      <IconButton
        title={formatMessage({ id: 'processing.management.list.delete.button' })}
        onClick={this.onDelete}
      >
        <DeleteIcon hoverColor={moduleTheme.hoverButtonDelete} />
      </IconButton>
    )
  }
}

export default ProcessingDeleteComponent
