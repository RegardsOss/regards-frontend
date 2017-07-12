/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import { FormattedMessage } from 'react-intl'
import map from 'lodash/map'
import Add from 'material-ui/svg-icons/content/add-circle-outline'
import Clear from 'material-ui/svg-icons/content/clear'
import { DataManagementShapes } from '@regardsoss/shape'
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
    linkedCollections: DataManagementShapes.CollectionArray,
    remainingCollections: DataManagementShapes.CollectionArray,
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
          title={this.context.intl.formatMessage({ id: 'collection.form.links.title' })}
          subtitle={this.context.intl.formatMessage({ id: 'collection.form.links.subtitle' })}
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
                      hintText={this.context.intl.formatMessage({ id: 'collection.form.links.remainingcollection.search' })}
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
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'collection.form.links.action.cancel' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default CollectionEditLinksComponent

