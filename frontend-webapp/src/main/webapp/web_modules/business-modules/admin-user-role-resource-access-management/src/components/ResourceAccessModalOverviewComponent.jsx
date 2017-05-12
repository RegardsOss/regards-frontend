import map from 'lodash/map'
import { FormattedMessage } from 'react-intl'
import Chip from 'material-ui/Chip'
import { List, ListItem } from 'material-ui/List'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { Resource, Role } from '@regardsoss/model'
import Dialog from 'material-ui/Dialog'
import moduleStyles from '../styles/styles'

/**
 * React container to show User and Role which has an access to the
 * current resource access
 */
class ResourceAccessModalOverviewComponent extends React.Component {

  static propTypes = {
    currentResource: Resource.isRequired,
    roles: PropTypes.arrayOf(Role).isrequired,
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
          mainButtonTouchTap={this.props.onClose}
        />}
        autoScrollBodyContent
        modal={false}
        open
        onRequestClose={this.props.onClose}
      >
        <List>es
          <ListItem
            disabled
            innerDivStyle={styles.listItem}
            secondaryText={
              <div>
                {this.context.intl.formatMessage({ id: 'role.form.description' })}                : {currentResource.content.description}
              </div>
            }
            primaryText={
              <div>
                {this.context.intl.formatMessage({ id: 'role.form.autorizedBy' })}                :
                <div style={styles.wrapperChipList}>
                  {map(this.props.roles, role => (
                    <Chip
                      onTouchTap={() => this.handleEditRoleResources(role)}
                      key={role.content.id}
                    >{role.content.name}</Chip>
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

