/* eslint no-script-url: 0 */
/**
 * LICENSE_PLACEHOLDER
 **/
import { map, forEach } from 'lodash'
import { FormattedMessage } from 'react-intl'
import Chip from 'material-ui/Chip'
import { List, ListItem } from 'material-ui/List'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import Toggle from 'material-ui/Toggle'
import { Role, Resource } from '@regardsoss/model'
import moduleStyles from '../styles/styles'

/**
 * React container to edit resource access allowed for the
 * current role
 */
export class ResourceAccessFormByMicroserviceComponent extends React.Component {

  static propTypes = {
    currentRole: Role,
    controllerList: React.PropTypes.arrayOf(React.PropTypes.string),
    // TODO use or delete
    // microserviceName: React.PropTypes.string.isRequired,
    resourceList: React.PropTypes.objectOf(Resource).isRequired,
    handleOpenController: React.PropTypes.func.isRequired,
    handleToggleResourceAccess: React.PropTypes.func.isRequired,
    handleOpenResourceAccess: React.PropTypes.func.isRequired,
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
      showAllInfoFor: undefined,
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

  isResourceAutorized = (resource) => {
    let isAutorized = false
    forEach(this.props.currentRole.content.permissions, (permission) => {
      if (permission.resource === resource.content.resource && permission.microservice === resource.content.microservice && permission.verb === resource.content.verb) {
        isAutorized = true
      }
    })
    return isAutorized
  }

  handleShowDialog = (event, resource) => {
    event.preventDefault()
    event.stopImmediatePropagation()
    event.stopPropagation()
    this.props.handleOpenResourceAccess(resource)
  }

  renderResource() {
    const { resourceList } = this.props
    const styles = moduleStyles(this.context.muiTheme)

    return map(resourceList, (resource, id) => (
      <ListItem
        style={id % 2 === 0 ? styles.listItemOdd : {}}
        key={id}
        innerDivStyle={styles.listItem}
        rightToggle={<Toggle
          toggled={this.isResourceAutorized(resource)}
          onToggle={() => {
            this.props.handleToggleResourceAccess(resource, this.isResourceAutorized(resource))
            return false
          }}
        />}
        secondaryText={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div style={styles.description.style} className={styles.description.class}>
              {this.context.intl.formatMessage({ id: 'role.form.description' })} : {resource.content.description}
            </div>
            <span>
              <a
                href="javascript:void(0)"
                onClick={(proxy, event) => {
                  this.handleShowDialog(event, resource)
                }}
              >
                <FormattedMessage id="role.form.moreinfo" />
              </a>
            </span>
          </div>
        }
        leftAvatar={
          <Chip style={this.getChipColor(resource.content.verb)}>
            {resource.content.verb}
          </Chip>
        }
      >
        {this.context.intl.formatMessage({ id: 'role.form.resource' })}  :
        {resource.content.resource}
      </ListItem>
    ))
  }

  render() {
    const { controllerList } = this.props
    const { isControllerOpen } = this.state
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
                hasChild ? this.renderResource(controller) : [<ListItem key={1} primaryText="Waiting..." />]
              }
            />
          )
        })}
      </List>
    )
  }
}

export default ResourceAccessFormByMicroserviceComponent

