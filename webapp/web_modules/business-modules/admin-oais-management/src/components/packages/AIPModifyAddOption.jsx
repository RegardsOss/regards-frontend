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
 import IconButton from 'material-ui/IconButton'
 **/
import IconButton from 'material-ui/IconButton'
import ContentUndo from 'mdi-material-ui/Undo'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Table option to delete AIP files on every local storage
 * @author Simon MILHAU
 */
class AIPModifyAddOption extends React.Component {
  static propTypes = {
    // Entity. Note: when used in options column, this is provided by the table cell API
    entity: PropTypes.string.isRequired,
    onUndo: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * On button clicked callback
   */
  onClick = () => {
    const { entity, onUndo } = this.props
    onUndo(entity)
  }

  render() {
    return (
      <IconButton onClick={this.onClick}>
        <ContentUndo />
      </IconButton>
    )
  }
}

export default AIPModifyAddOption
