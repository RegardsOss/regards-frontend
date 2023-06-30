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
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import AddItemIcon from 'mdi-material-ui/PlaylistPlus'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { DropDownButton } from '@regardsoss/components'

/**
 * Option to add a level from available collection types list
 * @author Raphaël Mechali
 */
class AddLevelOption extends React.Component {
  static propTypes = {
    selectableLevels: PropTypes.arrayOf(DataManagementShapes.Model).isRequired,
    onAddLevel: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** @return {string} button label */
  getLabel = () => this.context.intl.formatMessage({ id: 'search.graph.add.level' })

  render() {
    const { selectableLevels, onAddLevel } = this.props
    const { intl: { formatMessage } } = this.context
    return (

      <DropDownButton
        ButtonConstructor={FlatButton}
        getLabel={this.getLabel}
        value={null}
        icon={<AddItemIcon />}
        onChange={onAddLevel}
        disabled={!selectableLevels.length}
      >
        {
          selectableLevels.map(({ content }) => (
            <MenuItem
              key={content.id}
              value={content.name}
              primaryText={formatMessage({ id: 'search.graph.collection.model.label' }, {
                name: content.name,
                description: content.description,
              })}
            />
          ))
        }
      </DropDownButton>

    )
  }
}

export default AddLevelOption
