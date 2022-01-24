/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Clear from 'mdi-material-ui/Close'
import { DataManagementShapes } from '@regardsoss/shape'
import TextField from 'material-ui/TextField'
import Search from 'mdi-material-ui/Magnify'
import Subheader from 'material-ui/Subheader'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import Divider from 'material-ui/Divider'
import CollectionStepperComponent from './CollectionStepperComponent'

/**
 * React component to list collections that can be linked them to the current document.
 */
export class CollectionEditLinksComponent extends React.Component {
  static propTypes = {
    linkedCollections: DataManagementShapes.CollectionArray,
    remainingCollections: DataManagementShapes.CollectionArray,
    collectionStringTags: PropTypes.arrayOf(PropTypes.string),
    handleAdd: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    doneUrl: PropTypes.string.isRequired,
    projectName: PropTypes.string.isRequired,
    collectionId: PropTypes.string.isRequired,
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
    const { intl: { formatMessage } } = this.context

    const {
      linkedCollections, collectionStringTags, remainingCollections, handleAdd, handleDelete, handleSearch, doneUrl, backUrl, projectName, collectionId,
    } = this.props
    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'collection.form.links.title' })}
          subtitle={formatMessage({ id: 'collection.form.links.subtitle' })}
        />
        <CollectionStepperComponent
          stepIndex={2}
          isEditing
          projectName={projectName}
          currentCollectionId={collectionId}
        />
        <CardText>
          <div className="row">
            <div className="col-sm-48">
              <List>
                <Subheader>{formatMessage({ id: 'collection.form.links.remainingcollection.subtitle' })}</Subheader>
                <ListItem
                  primaryText={
                    <TextField
                      hintText={formatMessage({ id: 'collection.form.links.remainingcollection.search' })}
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
                    primaryText={collection.content.feature.label}
                    rightIconButton={
                      <IconButton onClick={() => handleAdd(collection.content.feature.id)}>
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
                <div>{formatMessage({ id: 'collection.form.links.collection.subtitle' })}</div>
                <br />
                <Divider />
                {map(linkedCollections, (collection, id) => (
                  <ListItem
                    key={id}
                    primaryText={collection.content.feature.label}
                    rightIconButton={
                      <IconButton onClick={() => handleDelete(collection.content.feature.id)}>
                        <Clear />
                      </IconButton>
                    }
                    disabled
                  />
                ))}
                <ShowableAtRender show={linkedCollections.length === 0}>
                  <ListItem
                    primaryText={formatMessage({ id: 'collection.form.links.collection.none' })}
                    disabled
                  />
                </ShowableAtRender>
                <div>{formatMessage({ id: 'collection.form.links.tag.subtitle' })}</div>
                <br />
                <Divider />
                <ListItem
                  primaryText={
                    <TextField
                      hintText={formatMessage({ id: 'collection.form.links.tag.add' })}
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
                        tooltip={formatMessage({ id: 'collection.form.links.tag.add.button' })}
                      >
                        <Add />
                      </IconButton>
                    </div>
                  }
                  disabled
                />
                {map(collectionStringTags, (tag, id) => (
                  <ListItem
                    key={`tag-${id}`}
                    primaryText={tag}
                    rightIconButton={
                      <IconButton
                        onClick={() => handleDelete(tag)}
                        tooltip={formatMessage({ id: 'collection.form.links.tag.remove.button' })}
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
              formatMessage({ id: 'collection.form.links.action.done' })
            }
            secondaryButtonLabel={formatMessage({ id: 'collection.form.links.action.cancel' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default CollectionEditLinksComponent
