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
import Edit from 'mdi-material-ui/Pencil'
import IconButton from 'material-ui/IconButton'
import { AuthenticationDomain } from '@regardsoss/domain'
import { CommonShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Edit table action for service provider
* @author Théo Lasserre
*/
class ServiceProviderEditAction extends React.Component {
  static propTypes = {
    entity: CommonShapes.ServiceProvider,
    onEdit: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  /**
   * User callback: edit plugin
   */
  onEdit = () => {
    const { entity: { content }, onEdit } = this.props
    onEdit(content, AuthenticationDomain.PluginTypeEnum.SERVICE_PROVIDER)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { entity: { content } } = this.props
    return (
      <IconButton
        className={`selenium-edit-${content.id}`}
        title={formatMessage({ id: 'user.authentication.plugins.list.edit.button' })}
        iconStyle={ServiceProviderEditAction.iconStyle}
        style={ServiceProviderEditAction.buttonStyle}
        onClick={this.onEdit}
      >
        <Edit />
      </IconButton>
    )
  }
}
export default ServiceProviderEditAction
