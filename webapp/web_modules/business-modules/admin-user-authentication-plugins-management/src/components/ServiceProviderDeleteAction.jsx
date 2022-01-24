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
 import IconButton from 'material-ui/IconButton'
 **/
import DeleteOnAllIcon from 'mdi-material-ui/DeleteForever'
import { CommonShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { AuthenticationDomain } from '@regardsoss/domain'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { ResourceIconAction } from '@regardsoss/components'
import { serviceProviderActions } from '../clients/ServiceProviderClient'

/**
 * Table option to delete service provider
 * @author Théo Lasserre
 */
class ServiceProviderDeleteAction extends React.Component {
  static propTypes = {
    entity: CommonShapes.ServiceProvider.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static DELETE_DEPENDENCIES = serviceProviderActions.getDependency(RequestVerbEnum.POST)

  /**
   * On button clicked callback
   */
  onClick = () => {
    const { entity, onDelete } = this.props
    onDelete(entity, AuthenticationDomain.PluginTypeEnum.SERVICE_PROVIDER)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <ResourceIconAction
        title={formatMessage({ id: 'user.authentication.plugins.list.header.action.delete' })}
        resourceDependencies={ServiceProviderDeleteAction.DELETE_DEPENDENCIES}
        onClick={this.onClick}
      >
        <DeleteOnAllIcon className="selenium-deleteButton" />
      </ResourceIconAction>
    )
  }
}

export default ServiceProviderDeleteAction
