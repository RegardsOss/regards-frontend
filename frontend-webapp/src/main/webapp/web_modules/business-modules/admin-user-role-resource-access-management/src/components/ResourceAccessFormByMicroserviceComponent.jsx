/* eslint no-script-url: 0 */
/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import find from 'lodash/find'
import forEach from 'lodash/forEach'
import Chip from 'material-ui/Chip'
import { List, ListItem } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { AdminShapes } from '@regardsoss/shape'
import Toggle from 'material-ui/Toggle'
import { LoadingComponent, HateoasToggle, HateoasIconAction, HateoasKeys } from '@regardsoss/display-control'
import moduleStyles from '../styles/styles'

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
    const { resourceList } = this.props
    const styles = moduleStyles(this.context.muiTheme)
    const resourceStyle = {
      display: 'flex',
      justifyContent: 'space-between',
    }
    return map(resourceList, (resource, id) => {
      const listStyles = id % 2 === 0 ? styles.listItemOdd : {}
      return (
        <ListItem
          style={listStyles}
          key={id}
          innerDivStyle={styles.listItem}
          onTouchTap={() => {
            this.handleShowDialog(resource)
          }}
          rightIconButton={
              this.getResourceToggle(resource)
          }
          secondaryText={
            <div
              style={resourceStyle}
            >
              <div style={styles.description.style} className={styles.description.class}>
                {resource.content.description}
              </div>
              <span>
                {this.context.intl.formatMessage({ id: 'role.form.moreinfo' })}
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
      )
    })
  }

  getResourceToggle = (resource) => {
    const roleResource = this.getResource(resource)
    const iconStyle = { marginRight: 10 }

    if (roleResource) {
      return (
        <HateoasIconAction
          disableInsteadOfHide
          style={iconStyle}
          onTouchTap={() => {
            this.props.handleToggleResourceAccess(resource, !!roleResource)
            return false
          }}
          entityLinks={roleResource.links}
          hateoasKey={HateoasKeys.DELETE}
        >
          <HateoasToggle
            entityLinks={roleResource.links}
            hateoasKey={HateoasKeys.DELETE}
            toggled
          />
        </HateoasIconAction>
      )
    }
    return (
      <IconButton
        style={iconStyle}
        onTouchTap={() => {
          this.props.handleToggleResourceAccess(resource, !!roleResource)
          return false
        }}
      >
        <Toggle
          toggled={false}
        />
      </IconButton>
    )
  }

  /**
   * Check if one of the roleResources match the given resource, return the roleResource or undefined
   * @param resource
   */
  getResource = resource =>
    find(this.props.roleResources, {
      content: {
        resource: resource.content.resource,
        microservice: resource.content.microservice,
        verb: resource.content.verb,
      },
    })

  handleToggleController = (controller) => {
    const { isControllerOpen } = this.state
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

  handleShowDialog = (resource) => {
    this.props.handleOpenResourceAccess(resource)
  }

  render() {
    const { controllerList, resourceListFetching } = this.props
    const { isControllerOpen } = this.state
    const items = resourceListFetching ? [<ListItem
      key={1}
    ><LoadingComponent /></ListItem>] : this.getResourceListItems()

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
              nestedItems={items}
            />
          )
        })}
      </List>
    )
  }
}

export default ResourceAccessFormByMicroserviceComponent

