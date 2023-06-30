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
import map from 'lodash/map'

import Chip from 'material-ui/Chip'
import { List, ListItem } from 'material-ui/List'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { AdminShapes } from '@regardsoss/shape'
import Dialog from 'material-ui/Dialog'
import RoleChipComponent from './RoleChipComponent'

/**
 * React container to show User and Role which has an access to the
 * current resource access
 */
class ResourceAccessModalOverviewComponent extends React.Component {
  static propTypes = {
    currentResource: AdminShapes.Resource.isRequired,
    roles: AdminShapes.RoleList.isRequired,
    onClose: PropTypes.func.isRequired,
    editRoleResources: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  handleEditRoleResources = (role) => {
    this.props.editRoleResources(role)
    this.props.onClose()
  }

  render() {
    const { currentResource, roles } = this.props
    const { moduleTheme, intl: { formatMessage } } = this.context
    const title = formatMessage({ id: 'role.modal.title' }, { name: currentResource.content.resource })

    return (
      <Dialog
        title={title}
        actions={<CardActionsComponent
          mainButtonLabel={formatMessage({ id: 'role.modal.action.back' })}
          mainButtonClick={this.props.onClose}
        />}
        autoScrollBodyContent
        modal={false}
        open
        onRequestClose={this.props.onClose}
      >
        <List>
          <ListItem
            disabled
            innerDivStyle={moduleTheme.listItem}
            primaryText={
              <div>
                {currentResource.content.description}
                <br />
                <br />
                {formatMessage({ id: 'role.form.autorizedBy' })}
                <div style={moduleTheme.wrapperChipList}>
                  {map(roles, (role) => (
                    <RoleChipComponent
                      role={role}
                      style={moduleTheme.chipItem}
                      onEditRoleResources={this.handleEditRoleResources}
                    />
                  ))}
                </div>
              </div>
            }
            leftAvatar={
              <Chip style={moduleTheme.chipByVerb[currentResource.content.verb]}>
                {currentResource.content.verb}
              </Chip>
            }
          />
        </List>
      </Dialog>
    )
  }
}

export default ResourceAccessModalOverviewComponent
