/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import { FormattedMessage } from 'react-intl'
import map from 'lodash/map'
import Add from 'material-ui/svg-icons/content/add-circle-outline'
import Search from 'material-ui/svg-icons/action/search'
import Clear from 'material-ui/svg-icons/content/clear'
import { Collection } from '@regardsoss/model'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import DatasetStepperComponent from './DatasetStepperComponent'


/**
 * React component to list datasets.
 */
export class DatasetEditLinksComponent extends React.Component {

  static propTypes = {
    linkedCollections: PropTypes.arrayOf(Collection),
    remainingCollections: PropTypes.arrayOf(Collection),
    datasetStringTags: PropTypes.arrayOf(PropTypes.string),
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

  state = {
    tagField: '',
  }

  handleCreateTag = () => {
    this.setState({
      tagField: '',
    })
    this.props.handleAdd(this.state.tagField, true)
  }

  handleCreateTagChange = (event, tagField) => {
    this.setState({
      tagField,
    })
  }

  render() {
    const { linkedCollections, remainingCollections, handleAdd, handleDelete, doneUrl, backUrl, datasetStringTags, handleSearch } = this.props
    return (
      <Card>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'dataset.form.links.title' })}
          subtitle={this.context.intl.formatMessage({ id: 'dataset.form.links.subtitle' })}
        />
        <DatasetStepperComponent stepIndex={2} />
        <CardText>
          <div className="row">
            <div className="col-sm-48">
              <List>
                <div><FormattedMessage id="dataset.form.links.collection.title" /></div>
                <br />
                <Divider />
                {map(linkedCollections, (collection, id) => (
                  <ListItem
                    key={`collection-${id}`}
                    primaryText={collection.content.label}
                    rightIconButton={
                      <IconButton onTouchTap={() => handleDelete(collection.content.ipId, false)}>
                        <Clear />
                      </IconButton>
                    }
                    disabled
                  />
                ))}
                <ShowableAtRender show={linkedCollections.length === 0}>
                  <ListItem
                    primaryText={this.context.intl.formatMessage({ id: 'dataset.form.links.collection.none' })}
                    disabled
                  />
                </ShowableAtRender>
                <div><FormattedMessage id="dataset.form.links.tag.subtitle" /></div>
                <br />
                <Divider />
                <ListItem
                  primaryText={
                    <TextField
                      hintText={this.context.intl.formatMessage({ id: 'dataset.form.links.tag.add' })}
                      onChange={this.handleCreateTagChange}
                      value={this.state.tagField}
                      fullWidth
                    />
                  }
                  rightIconButton={
                    <div>
                      <br />
                      <IconButton onTouchTap={this.handleCreateTag}>
                        <Add />
                      </IconButton>
                    </div>
                  }
                  disabled
                />
                {map(datasetStringTags, (tag, id) => (
                  <ListItem
                    key={`tag-${id}`}
                    primaryText={tag}
                    rightIconButton={
                      <IconButton onTouchTap={() => handleDelete(tag, true)}>
                        <Clear />
                      </IconButton>
                    }
                    disabled
                  />
                ))}
              </List>
            </div>
            <div className="col-sm-48 col-sm-offset-4 ">
              <List>
                <div><FormattedMessage id="dataset.form.links.remainingcollection.subtitle" /></div>
                <br />
                <Divider />
                <ListItem
                  primaryText={
                    <TextField
                      hintText={this.context.intl.formatMessage({ id: 'dataset.form.links.remainingcollection.search' })}
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
                      <IconButton onTouchTap={() => handleAdd(collection.content.ipId, false)}>
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
                id="dataset.form.links.action.next"
              />
            }
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'dataset.form.links.action.cancel' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default DatasetEditLinksComponent

