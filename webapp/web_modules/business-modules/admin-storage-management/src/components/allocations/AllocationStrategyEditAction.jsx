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
import find from 'lodash/find'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import IconButton from 'material-ui/IconButton'
import { CommonShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Edit table action for allocation strategy plugins
* @author Sébastien Binda
*/
class AllocationStrategyEditAction extends React.Component {
  static propTypes = {
    entity: CommonShapes.PluginConfiguration,
    onEdit: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  isEditable = () => {
    const { links } = this.props.entity
    return !!find(links, l => l.rel === 'update')
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { entity: { content }, onEdit } = this.props
    return (
      <IconButton
        className={`selenium-edit-${content.id}`}
        title={formatMessage({ id: 'storage.allocation-strategy.plugins.list.edit.button' })}
        iconStyle={AllocationStrategyEditAction.iconStyle}
        style={AllocationStrategyEditAction.buttonStyle}
        onClick={() => onEdit(content)}
        disabled={!this.isEditable()}
      >
        <Edit />
      </IconButton>
    )
  }
}
export default AllocationStrategyEditAction
