/* eslint no-script-url: 0 */
/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import {FormattedMessage} from 'react-intl'
import Chip from 'material-ui/Chip'
import {List, ListItem} from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import {themeContextType} from '@regardsoss/theme'
import {i18nContextType} from '@regardsoss/i18n'
import Toggle from 'material-ui/Toggle'
import {Resource} from '@regardsoss/model'
import {LinkComponent} from '@regardsoss/components'
import {LoadingComponent} from '@regardsoss/display-control'
import moduleStyles from '../styles/styles'

/**
 * React container to edit resource access allowed for the
 * current role
 */
export class ResourceAccessFormByMicroserviceComponent extends React.Component {

  static propTypes = {
    roleResources: PropTypes.arrayOf(Resource),
    controllerList: PropTypes.arrayOf(PropTypes.string),
    resourceList: PropTypes.arrayOf(Resource).isRequired,
    resourceListFetching: PropTypes.bool,
    handleOpenController: PropTypes.func.isRequired,
    handleToggleResourceAccess: PropTypes.func.isRequired,
    handleOpenResourceAccess: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    const isControllerOpen = {}
    forEach(props.controllerList, (controllerName) => {
      isControllerOpen[controllerName] = false
    })
    this.state = {
      isControllerOpen,
    }
  }

  getChipColor = (verb) => {
    const styles = moduleStyles(this.context.muiTheme)
    switch (verb) {
      case 'GET':
        return styles.getChip
      case 'POST':
        return styles.postChip
      case 'DELETE':
        return styles.deleteChip
      case 'PUT':
        return styles.putChip
      default:
        return {}
    }
  }

  getResourceListItems() {
    const {resourceList} = this.props
    const styles = moduleStyles(this.context.muiTheme)

    return map(resourceList, (resource, id) => (
      <ListItem
        style={id % 2 === 0 ? styles.listItemOdd : {}}
        key={id}
        innerDivStyle={styles.listItem}
        onTouchTap={() => {
          this.handleShowDialog(resource)
        }}
        rightIconButton={
          <IconButton
            style={{
            marginRight: 10
            }}
          >
            <Toggle
              toggled={this.isResourceAutorized(resource)}
              onToggle={() => {
                this.props.handleToggleResourceAccess(resource, this.isResourceAutorized(resource))
                return false
              }}
            />
          </IconButton>
        }
        secondaryText={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div style={styles.description.style} className={styles.description.class}>
              {this.context.intl.formatMessage({id: 'role.form.description'})} : {resource.content.description}
            </div>
            <span>
              <FormattedMessage id="role.form.moreinfo"/>
            </span>
          </div>
        }
        leftAvatar={
          <Chip style={this.getChipColor(resource.content.verb)}>
            {resource.content.verb}
          </Chip>
        }
      >
        {resource.content.resource}
      </ListItem>
    ))
  }

  handleToggleController = (controller) => {
    const {isControllerOpen} = this.state
    forEach(isControllerOpen, (isOpen, controllerName) => {
      if (controllerName === controller) {
        isControllerOpen[controllerName] = !isOpen
        if (isControllerOpen[controllerName]) {
          this.props.handleOpenController(controllerName)
        }
      } else {
        isControllerOpen[controllerName] = false
      }
    })
    this.setState({
      isControllerOpen,
    })
  }

  isResourceAutorized = (resource) => {
    let isAutorized = false
    forEach(this.props.roleResources, (permission) => {
      if (permission.content.resource === resource.content.resource &&
        permission.content.microservice === resource.content.microservice &&
        permission.content.verb === resource.content.verb) {
        isAutorized = true
      }
    })
    return isAutorized
  }

  handleShowDialog = (resource) => {
    this.props.handleOpenResourceAccess(resource)
  }

  render() {
    const {controllerList, resourceListFetching} = this.props
    const {isControllerOpen} = this.state
    return (
      <List>
        {map(controllerList, (controller, id) => {
          const hasChild = isControllerOpen[controller]
          return (
            <ListItem
              key={id}
              primaryText={controller}
              initiallyOpen={false}
              open={hasChild}
              primaryTogglesNestedList
              onNestedListToggle={() => this.handleToggleController(controller)}
              nestedItems={
                resourceListFetching ? [<ListItem key={1}><LoadingComponent /></ListItem>] : this.getResourceListItems()
              }
            />
          )
        })}
      </List>
    )
  }
}

export default ResourceAccessFormByMicroserviceComponent

