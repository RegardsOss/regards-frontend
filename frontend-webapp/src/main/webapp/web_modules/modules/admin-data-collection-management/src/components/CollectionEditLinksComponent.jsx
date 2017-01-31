/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import { FormattedMessage } from 'react-intl'
import Add from 'material-ui/svg-icons/content/add-circle-outline'
import Clear from 'material-ui/svg-icons/content/clear'
import { Collection } from '@regardsoss/model'
import Subheader from 'material-ui/Subheader'
import { CardActionsComponent } from '@regardsoss/components'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * React component to list collections.
 */
export class CollectionListComponent extends React.Component {

  static propTypes = {
    collectionList: React.PropTypes.objectOf(Collection),
    currentCollection: Collection,
    handleAdd: React.PropTypes.func.isRequired,
    handleDelete: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  render() {
    const { collectionList, currentCollection, handleAdd, handleDelete, createUrl, backUrl } = this.props
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="collection.form.links.title" />}
          subtitle={<FormattedMessage id="collection.form.links.subtitle" />}
        />
        <CardText>
          <div className="row">
            <div className="col-sm-50">
              <List>
                <Subheader><FormattedMessage id="collection.form.links.collection.subtitle" /></Subheader>
                <ListItem
                  primaryText="Sent mail" rightIconButton={
                    <IconButton onTouchTap={() => handleDelete()}>
                      <Clear />
                    </IconButton>
                } disabled
                />
                <ListItem
                  primaryText="Drafts" rightIconButton={
                    <IconButton onTouchTap={() => handleDelete()}>
                      <Clear />
                    </IconButton>
                } disabled
                />

              </List>
            </div>
            <div className="col-sm-50">
              <List>
                <Subheader><FormattedMessage id="collection.form.links.remainingcollection.subtitle" /></Subheader>
                <ListItem
                  primaryText="Sent mail" rightIconButton={
                    <IconButton onTouchTap={() => handleAdd()}>
                      <Add />
                    </IconButton>
                } disabled
                />
                <ListItem
                  primaryText="Drafts" rightIconButton={
                    <IconButton onTouchTap={() => handleAdd()}>
                      <Add />
                    </IconButton>
                } disabled
                />
              </List>
            </div>
          </div>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonUrl={createUrl}
            mainButtonLabel={
              <FormattedMessage
                id="collection.form.links.action.add"
              />
            }
            secondaryButtonLabel={<FormattedMessage id="collection.form.links.action.cancel" />}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default CollectionListComponent

