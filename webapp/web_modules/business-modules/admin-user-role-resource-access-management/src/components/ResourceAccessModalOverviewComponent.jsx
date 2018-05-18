/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { FormattedMessage } from 'react-intl'
import Chip from 'material-ui/Chip'
import { List, ListItem } from 'material-ui/List'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { AdminShapes } from '@regardsoss/shape'
import Dialog from 'material-ui/Dialog'
import moduleStyles from '../styles/styles'

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

  getChipColor = (verb) => {
    const styles = moduleStyles(this.context.muiTheme)
    switch (verb) {
      case 'GET':
        return styles.getChip
      case 'POST':
        return styles.postChip
      case 'DELETE':
        return styles.deleteChip
      case 'PUT':
        return styles.putChip
      default:
        return {}
    }
  }

  handleEditRoleResources = (role) => {
    this.props.editRoleResources(role)
    this.props.onClose()
  }
  render() {
    const { currentResource } = this.props
    const styles = moduleStyles(this.context.muiTheme)
    const title = this.context.intl.formatMessage({ id: 'role.modal.title' }, { name: currentResource.content.resource })

    return (
      <Dialog
        title={title}
        actions={<CardActionsComponent
          mainButtonLabel={
            <FormattedMessage
              id="role.modal.action.back"
            />
          }
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
            innerDivStyle={styles.listItem}
            primaryText={
              <div>
                {currentResource.content.description}
                <br />
                <br />
                {this.context.intl.formatMessage({ id: 'role.form.autorizedBy' })}
                <div style={styles.wrapperChipList}>
                  {map(this.props.roles, role => (
                    <Chip
                      style={styles.chipItem}
                      onClick={() => this.handleEditRoleResources(role)}
                      key={role.content.id}
                    >{role.content.name}
                    </Chip>
                    ))
                  }
                </div>
              </div>
            }
            leftAvatar={
              <Chip style={this.getChipColor(currentResource.content.verb)}>
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

