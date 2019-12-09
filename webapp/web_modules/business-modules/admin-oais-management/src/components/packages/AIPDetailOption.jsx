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
 **/
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import { StorageShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/arrow-drop-down'

/**
* Detail option cell for the infinite table used to display the contents of an aip
 * @author Simon MILHAU
*/
class AIPDetailOption extends React.Component {
  static propTypes = {
    entity: StorageShapes.AIPEntity,
    onViewDetail: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { onViewDetail, entity } = this.props
    const button = <IconButton><MoreVertIcon /></IconButton>
    return (
      <div>
        <IconMenu iconButtonElement={button}>
          <MenuItem
            primaryText={formatMessage({ id: 'oais.packages.list.filters.buttons.dropdown.aip' })}
            onClick={() => { onViewDetail(entity.content.aip) }}
          />
          <MenuItem
            primaryText={formatMessage({ id: 'oais.packages.list.filters.buttons.dropdown.sip' })}
            onClick={() => { onViewDetail(entity.content.sip) }}
          />
        </IconMenu>
      </div>
    )
  }
}
export default AIPDetailOption
