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

import { withHateoasDisplayControl, HateoasKeys } from '@regardsoss/display-control'
import IconButton from 'material-ui/IconButton/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import { i18nContextType } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'

const HateoasIconAction = withHateoasDisplayControl(IconButton)

/**
 * DatasetList edit action
 * @author Maxime Bouveron
 */
class DatasetListDeleteAction extends React.Component {
  static propTypes = {
    openDeleteDialog: PropTypes.func,
    hoverColor: PropTypes.string,
    entity: DataManagementShapes.Dataset,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { openDeleteDialog, hoverColor } = this.props
    const dataset = this.props.entity
    return (
      <HateoasIconAction
        entityLinks={dataset.links}
        hateoasKey={HateoasKeys.DELETE}
        onClick={() => openDeleteDialog(dataset)}
        title={this.context.intl.formatMessage({ id: 'dataset.list.tooltip.delete' })}
      >
        <Delete hoverColor={hoverColor} />
      </HateoasIconAction>
    )
  }
}
export default DatasetListDeleteAction
