/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import { FormattedMessage } from 'react-intl'
import { map } from 'lodash'
import Add from 'material-ui/svg-icons/content/add-circle-outline'
import Clear from 'material-ui/svg-icons/content/clear'
import { Collection } from '@regardsoss/model'
import Subheader from 'material-ui/Subheader'
import { CardActionsComponent } from '@regardsoss/components'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import DatasetStepperComponent from './DatasetStepperComponent'

/**
 * React component to list datasets.
 */
export class DatasetEditLinksComponent extends React.Component {

  static propTypes = {
    linkedCollections: React.PropTypes.arrayOf(Collection),
    remainingCollections: React.PropTypes.arrayOf(Collection),
    handleAdd: React.PropTypes.func.isRequired,
    handleDelete: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    doneUrl: React.PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  render() {
    const { linkedCollections, remainingCollections, handleAdd, handleDelete, doneUrl, backUrl } = this.props
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="dataset.form.links.title" />}
          subtitle={<FormattedMessage id="dataset.form.links.subtitle" />}
        />
        <DatasetStepperComponent stepIndex={1} />
        <CardText>
          <div className="row">
            <div className="col-sm-50">
              <List>
                <Subheader><FormattedMessage id="dataset.form.links.collection.subtitle" /></Subheader>
                {map(linkedCollections, (collection, id) => (
                  <ListItem
                    key={id}
                    primaryText={collection.content.label} rightIconButton={
                      <IconButton onTouchTap={() => handleDelete(collection.content.ipId)}>
                        <Clear />
                      </IconButton>
                  } disabled
                  />
                ))}
              </List>
            </div>
            <div className="col-sm-50">
              <List>
                <Subheader><FormattedMessage id="dataset.form.links.remainingcollection.subtitle" /></Subheader>
                {map(remainingCollections, (collection, id) => (
                  <ListItem
                    key={id}
                    primaryText={collection.content.label} rightIconButton={
                      <IconButton onTouchTap={() => handleAdd(collection.content.ipId)}>
                        <Add />
                      </IconButton>
                  } disabled
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
                id="dataset.form.links.action.done"
              />
            }
            secondaryButtonLabel={<FormattedMessage id="dataset.form.links.action.cancel" />}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default DatasetEditLinksComponent

