/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import { FormattedMessage } from 'react-intl'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import ContentCopy from 'material-ui/svg-icons/content/content-copy'
import Delete from 'material-ui/svg-icons/action/delete'
import { Collection } from '@regardsoss/model'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * React component to list collections.
 */
export class CollectionListComponent extends React.Component {

  static propTypes = {
    collectionList: React.PropTypes.objectOf(Collection),
    handleDelete: React.PropTypes.func.isRequired,
    handleEdit: React.PropTypes.func.isRequired,
    handleDuplicate: React.PropTypes.func.isRequired,
    createUrl: React.PropTypes.string.isRequired,
    backUrl: React.PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  render() {
    const { collectionList, handleEdit, handleDelete, handleDuplicate, createUrl, backUrl } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonDuplicate: this.context.muiTheme.palette.primary3Color,
    }
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="collection.list.title" />}
          subtitle={<FormattedMessage id="collection.list.subtitle" />}
        />
        <CardText>
          <div className="row">
            <div className="col-sm-50">
              <List>
                <Subheader><FormattedMessage id="collection.form.links.component.subtitle" /></Subheader>
                <ListItem primaryText="Sent mail" />
                <ListItem primaryText="Drafts" />
              </List>
            </div>
            <div className="col-sm-50">
              <List>
                <Subheader><FormattedMessage id="collection.form.links.component.subtitle" /></Subheader>
                <ListItem primaryText="Sent mail" />
                <ListItem primaryText="Drafts" />
              </List>
            </div>
          </div>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonUrl={createUrl}
            mainButtonLabel={
              <FormattedMessage
                id="collection.list.action.add"
              />
            }
            secondaryButtonLabel={<FormattedMessage id="collection.list.action.cancel" />}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default CollectionListComponent

