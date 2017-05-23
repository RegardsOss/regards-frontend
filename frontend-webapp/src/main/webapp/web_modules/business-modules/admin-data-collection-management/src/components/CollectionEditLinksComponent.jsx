/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import { FormattedMessage } from 'react-intl'
import map from 'lodash/map'
import Add from 'material-ui/svg-icons/content/add-circle-outline'
import Clear from 'material-ui/svg-icons/content/clear'
import { Collection } from '@regardsoss/model'
import TextField from 'material-ui/TextField'
import Search from 'material-ui/svg-icons/action/search'
import Subheader from 'material-ui/Subheader'
import { CardActionsComponent } from '@regardsoss/components'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import CollectionStepperComponent from './CollectionStepperComponent'

/**
 * React component to list collections.
 */
export class CollectionEditLinksComponent extends React.Component {

  static propTypes = {
    linkedCollections: PropTypes.arrayOf(Collection),
    remainingCollections: PropTypes.arrayOf(Collection),
    handleAdd: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    doneUrl: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  render() {
    const { linkedCollections, remainingCollections, handleAdd, handleDelete, handleSearch, doneUrl, backUrl } = this.props
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="collection.form.links.title" />}
          subtitle={<FormattedMessage id="collection.form.links.subtitle" />}
        />
        <CollectionStepperComponent stepIndex={1} />
        <CardText>
          <div className="row">
            <div className="col-sm-50">
              <List>
                <Subheader><FormattedMessage id="collection.form.links.collection.subtitle" /></Subheader>
                {map(linkedCollections, (collection, id) => (
                  <ListItem
                    key={id}
                    primaryText={collection.content.label}
                    rightIconButton={
                      <IconButton onTouchTap={() => handleDelete(collection.content.ipId)}>
                        <Clear />
                      </IconButton>
                    }
                    disabled
                  />
                ))}
              </List>
            </div>
            <div className="col-sm-50">
              <List>
                <Subheader><FormattedMessage id="collection.form.links.remainingcollection.subtitle" /></Subheader>
                <ListItem
                  primaryText={
                    <TextField
                      hintText={<FormattedMessage id="collection.form.links.remainingcollection.search" />}
                      onChange={handleSearch}
                      fullWidth
                    />
                  }
                  rightIconButton={
                    <div>
                      <br />
                      <IconButton>
                        <Search />
                      </IconButton>
                    </div>
                  }
                  disabled
                />
                {map(remainingCollections, (collection, id) => (
                  <ListItem
                    key={id}
                    primaryText={collection.content.label}
                    rightIconButton={
                      <IconButton onTouchTap={() => handleAdd(collection.content.ipId)}>
                        <Add />
                      </IconButton>
                    }
                    disabled
                  />
                ))}
              </List>
            </div>
          </div>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonUrl={doneUrl}
            mainButtonLabel={
              <FormattedMessage
                id="collection.form.links.action.done"
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

export default CollectionEditLinksComponent

