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
import DetailIcon from 'material-ui/svg-icons/action/info-outline'
import IconButton from 'material-ui/IconButton'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Info action for collections.
* @author Sébastien Binda
*/
class DatasetListInfoAction extends React.Component {
  static propTypes = {
    hoverColor: PropTypes.string,
    entity: DataManagementShapes.Collection,
    onClick: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  render() {
    const { intl: { formatMessage } } = this.context
    const {
      entity, entity: { content }, onClick, hoverColor,
    } = this.props

    return (
      <IconButton
        className={`selenium-edit-${content.id}`}
        title={formatMessage({ id: 'collection.list.tooltip.info.button' })}
        iconStyle={DatasetListInfoAction.iconStyle}
        style={DatasetListInfoAction.buttonStyle}
        onClick={() => onClick(entity)}
      >
        <DetailIcon hoverColor={hoverColor} />
      </IconButton>
    )
  }
}
export default DatasetListInfoAction
