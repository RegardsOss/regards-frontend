/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'

import map from 'lodash/map'
import Add from 'mdi-material-ui/PlusCircleOutline'
import Search from 'mdi-material-ui/Magnify'
import Clear from 'mdi-material-ui/Close'
import { DataManagementShapes } from '@regardsoss/shape'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import DatasetStepperContainer from '../containers/DatasetStepperContainer'

/**
 * React component to list datasets.
 */
export class DatasetEditLinksComponent extends React.Component {
  static propTypes = {
    currentDataset: DataManagementShapes.Dataset,
    linkedCollections: DataManagementShapes.CollectionArray,
    remainingCollections: DataManagementShapes.CollectionArray,
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
    this.props.handleAdd(this.state.tagField)
  }

  handleCreateTagChange = (event, tagField) => {
    this.setState({
      tagField,
    })
  }

  render() {
    const {
      currentDataset, linkedCollections, remainingCollections, handleAdd, handleDelete, doneUrl, backUrl, datasetStringTags, handleSearch,
    } = this.props
    const { intl: { formatMessage } } = this.context

    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'dataset.form.links.title' })}
          subtitle={formatMessage({ id: 'dataset.form.links.subtitle' })}
        />
        <DatasetStepperContainer
          stepIndex={3}
          currentDatasetIpId={currentDataset.content.ipId}
          currentDatasetId={currentDataset.content.id}
          isEditing
        />
        <CardText>
          <div className="row">
            <div className="col-sm-48">
              <List>
                <div>{formatMessage({ id: 'dataset.form.links.remainingcollection.subtitle' })}</div>
                <br />
                <Divider />
                <ListItem
                  primaryText={
                    <TextField
                      hintText={formatMessage({ id: 'dataset.form.links.remainingcollection.search' })}
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
                    key={collection.content.feature.id}
                    primaryText={collection.content.feature.label}
                    rightIconButton={
                      <IconButton
                        onClick={() => handleAdd(collection.content.feature.id)}
                        tooltip={formatMessage({ id: 'dataset.form.links.remainingcollection.add.button' })}
                      >
                        <Add />
                      </IconButton>
                    }
                    disabled
                  />
                ))}
              </List>
            </div>
            <div className="col-sm-48 col-sm-offset-4 ">

              <List>
                <div>{formatMessage({ id: 'dataset.form.links.collection.title' })}</div>
                <br />
                <Divider />
                {map(linkedCollections, (collection, id) => (
                  <ListItem
                    key={`collection-${id}`}
                    primaryText={collection.content.feature.label}
                    rightIconButton={
                      <IconButton
                        onClick={() => handleDelete(collection.content.feature.id)}
                        tooltip={formatMessage({ id: 'dataset.form.links.collection.remove.button' })}
                      >
                        <Clear />
                      </IconButton>
                    }
                    disabled
                  />
                ))}
                <ShowableAtRender show={linkedCollections.length === 0}>
                  <ListItem
                    primaryText={formatMessage({ id: 'dataset.form.links.collection.none' })}
                    disabled
                  />
                </ShowableAtRender>
                <div>{formatMessage({ id: 'dataset.form.links.tag.subtitle' })}</div>
                <br />
                <Divider />
                <ListItem
                  primaryText={
                    <TextField
                      hintText={formatMessage({ id: 'dataset.form.links.tag.add' })}
                      onChange={this.handleCreateTagChange}
                      value={this.state.tagField}
                      fullWidth
                    />
                  }
                  rightIconButton={
                    <div>
                      <br />
                      <IconButton
                        onClick={this.handleCreateTag}
                        tooltip={formatMessage({ id: 'dataset.form.links.tag.add.button' })}
                      >
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
                      <IconButton
                        onClick={() => handleDelete(tag)}
                        tooltip={formatMessage({ id: 'dataset.form.links.tag.remove.button' })}
                      >
                        <Clear />
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
              formatMessage({ id: 'dataset.form.links.action.next' })
            }
            secondaryButtonLabel={formatMessage({ id: 'dataset.form.links.action.cancel' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default DatasetEditLinksComponent
