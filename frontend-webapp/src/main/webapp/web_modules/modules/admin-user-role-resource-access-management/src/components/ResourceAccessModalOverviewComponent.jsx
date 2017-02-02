import { FormattedMessage } from 'react-intl'
import Chip from 'material-ui/Chip'
import { List, ListItem } from 'material-ui/List'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { Resource } from '@regardsoss/model'
import Dialog from 'material-ui/Dialog'

/**
 * React container to show User and Role which has an access to the
 * current resource access
 */
class ResourceAccessModalOverviewComponent extends React.Component {

  static propTypes = {
    currentResource: Resource.isRequired,
    onClose: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  getChipColor = (verb) => {
    switch (verb) {
      case 'GET':
        return this.context.muiTheme.adminApp.roleResourceAccessOverview.getChip
      case 'POST':
        return this.context.muiTheme.adminApp.roleResourceAccessOverview.postChip
      case 'DELETE':
        return this.context.muiTheme.adminApp.roleResourceAccessOverview.deleteChip
      case 'PUT':
        return this.context.muiTheme.adminApp.roleResourceAccessOverview.putChip
      default:
        return {}
    }
  }
  render() {
    const { currentResource } = this.props
    const styles = {
      listItem: this.context.muiTheme.adminApp.roleResourceAccessOverview.listItem,
      chip: this.context.muiTheme.adminApp.roleResourceAccessOverview.chipListItem,
      wrapperChipList: this.context.muiTheme.adminApp.roleResourceAccessOverview.wrapperChipList,
    }
    const title = this.context.intl.formatMessage({ id: 'role.modal.title' })
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
        <List>
          <ListItem
            disabled
            innerDivStyle={styles.listItem}
            secondaryText={
              <div>
                {this.context.intl.formatMessage({ id: 'role.form.description' })} : {currentResource.content.description}
              </div>
            }
            primaryText={
              <div>
                {this.context.intl.formatMessage({ id: 'role.form.autorizedBy' })} :
                <div style={styles.wrapperChipList}>
                  <Chip>Role #1</Chip>
                  <Chip>Role #2</Chip>
                  <Chip>Role #3</Chip>
                  <Chip>Role #4</Chip>
                  <Chip>Role #5</Chip>
                  <Chip>Role #6</Chip>
                  <Chip>Role #7</Chip>
                  <Chip>Role #8</Chip>
                  <Chip>Role #9</Chip>
                  <Chip>Role #10</Chip>
                  <Chip>Role #11</Chip>
                  <Chip>Role #12</Chip>
                  <Chip>Role #13</Chip>
                  <Chip>Role #14</Chip>
                  <Chip>Role #15</Chip>
                  <Chip>Role #16</Chip>
                </div>
              </div>
            }
            leftAvatar={
              <Chip style={this.getChipColor(currentResource.content.verb)}>
                {currentResource.content.verb}
              </Chip>
            }
          >
            <span>{this.context.intl.formatMessage({ id: 'role.form.resource' })}  :</span>
            <span>{currentResource.content.resource}</span>
          </ListItem>
        </List>
      </Dialog>
    )
  }
}

export default ResourceAccessModalOverviewComponent

