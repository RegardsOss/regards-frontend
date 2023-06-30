/* eslint no-script-url: 0 */
/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import map from 'lodash/map'
import find from 'lodash/find'
import Chip from 'material-ui/Chip'
import RaisedButton from 'material-ui/RaisedButton'
import { List, ListItem } from 'material-ui/List'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { AdminShapes } from '@regardsoss/shape'
import { LoadingComponent } from '@regardsoss/display-control'
import ResourceToggleComponent from './ResourceToggleComponent'

/**
 * React container to edit resource access allowed for the
 * current role
 */
export class ResourceAccessFormByMicroserviceComponent extends React.Component {
  static propTypes = {
    roleResources: AdminShapes.ResourceArray,
    controllerList: PropTypes.arrayOf(PropTypes.string),
    resourceList: AdminShapes.ResourceArray.isRequired,
    resourceListFetching: PropTypes.bool,
    handleOpenController: PropTypes.func.isRequired,
    handleToggleResourceAccess: PropTypes.func.isRequired,
    handleOpenResourceAccess: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Placeholder for controller items at loading time */
  static LOADING_PLACEHOLDER_ITEMS = [
    <ListItem key={1}>
      <LoadingComponent />
    </ListItem>]

  /** Initial state: no opened controller */
  state = {
    controller: null,
  }

  /**
   * User callback: show controller as parameter
   * @param {string} controller controller identifier
   */
  onShowController = (controller) => {
    if (controller !== this.state.controller) {
      if (controller) {
        this.props.handleOpenController(controller)
      }
      this.setState({
        controller,
      })
    }
  }

  handleShowDialog = (resource) => {
    this.props.handleOpenResourceAccess(resource)
  }

  /**
   * Check if one of the roleResources match the given resource, return the roleResource or undefined
   * @param resource
   */
  getResource = (resource) => find(this.props.roleResources, {
    content: {
      resource: resource.content.resource,
      microservice: resource.content.microservice,
      verb: resource.content.verb,
    },
  })

  render() {
    const {
      controllerList, resourceListFetching, resourceList, handleToggleResourceAccess,
    } = this.props
    const { controller: openedController } = this.state
    const { moduleTheme } = this.context
    return (
      <List>
        {map(controllerList, (controller, id) => (
          <ListItem
            key={id}
            primaryText={controller}
            initiallyOpen={false}
            open={controller === openedController}
            primaryTogglesNestedList
            // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
            onNestedListToggle={() => this.onShowController(controller)} // eslint wont fix: due to MUI 0x API (sub classing ListItems breaks nested items system)
            nestedItems={resourceListFetching
              ? ResourceAccessFormByMicroserviceComponent.LOADING_PLACEHOLDER_ITEMS
              : map(resourceList, (resource, id2) => (
                <ListItem
                  style={id % 2 === 0 ? moduleTheme.listItemOdd : moduleTheme.listItemEven}
                  key={id2}
                  innerDivStyle={moduleTheme.listItem}
                  // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                  disabled
                  rightIconButton={<ResourceToggleComponent
                    resource={resource}
                    roleResource={this.getResource(resource)}
                    onToggleResourceAccess={handleToggleResourceAccess}
                  />}
                  secondaryText={
                    <div
                      style={moduleTheme.resourceSecondaryStyle}
                    >
                      <div style={moduleTheme.description.style} className={moduleTheme.description.class}>
                        {resource.content.description}
                      </div>
                      <RaisedButton
                        label={this.context.intl.formatMessage({ id: 'role.form.moreinfo' })}
                        onClick={() => this.handleShowDialog(resource)}
                        overlayStyle={{
                          marginTop: '-50px',
                        }}
                      />
                    </div>
                  }
                  leftAvatar={
                    <Chip style={moduleTheme.chipByVerb[resource.content.verb]} labelColor={moduleTheme.chipLabelByVerb[resource.content.verb]}>
                      {resource.content.verb}
                    </Chip>
                  }
                >
                  <div style={moduleTheme.resourceTitleStyle}>
                    {resource.content.resource}
                  </div>
                </ListItem>))}
          />
        ))}
      </List>
    )
  }
}

export default ResourceAccessFormByMicroserviceComponent
