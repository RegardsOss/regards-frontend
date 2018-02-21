/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import { i18nContextType } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'

const HateoasIconAction = withHateoasDisplayControl(IconButton)

/**
 * DatasetList edit action
 * @author Maxime Bouveron
 */
class DatasetListEditAction extends React.Component {
  static propTypes = {
    handleEdit: PropTypes.func,
    hoverColor: PropTypes.string,
    entity: DataManagementShapes.Dataset,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { handleEdit, hoverColor } = this.props
    const dataset = this.props.entity
    return (
      <HateoasIconAction
        entityLinks={dataset.links}
        hateoasKey={HateoasKeys.UPDATE}
        onClick={() => handleEdit(dataset.content.id)}
        title={this.context.intl.formatMessage({ id: 'dataset.list.tooltip.edit' })}
      >
        <Edit hoverColor={hoverColor} />
      </HateoasIconAction>
    )
  }
}
export default DatasetListEditAction