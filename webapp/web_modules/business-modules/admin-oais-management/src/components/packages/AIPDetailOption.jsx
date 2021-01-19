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
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import { IngestShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'mdi-material-ui/MenuDown'

/**
* Detail option cell for the infinite table used to display the contents of an aip
 * @author Simon MILHAU
*/
class AIPDetailOption extends React.Component {
  static propTypes = {
    entity: IngestShapes.AIPEntity,
    onViewAIPDetail: PropTypes.func.isRequired,
    onViewSIPDetail: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  onViewAIPDetail = () => {
    const { entity, onViewAIPDetail } = this.props
    onViewAIPDetail(entity)
  }

  onViewSIPDetail = () => {
    const { entity, onViewSIPDetail } = this.props
    onViewSIPDetail(entity)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <div>
        <IconMenu
          iconButtonElement={<IconButton title={formatMessage({ id: 'oais.packages.tooltip.details' })}><MoreVertIcon /></IconButton>}
        >
          <MenuItem
            title={formatMessage({ id: 'oais.packages.tooltip.details.aip' })}
            primaryText={formatMessage({ id: 'oais.packages.list.filters.buttons.dropdown.aip' })}
            onClick={this.onViewAIPDetail}
          />
          <MenuItem
            title={formatMessage({ id: 'oais.packages.tooltip.details.sip' })}
            primaryText={formatMessage({ id: 'oais.packages.list.filters.buttons.dropdown.sip' })}
            onClick={this.onViewSIPDetail}
          />
        </IconMenu>
      </div>
    )
  }
}

export default AIPDetailOption
