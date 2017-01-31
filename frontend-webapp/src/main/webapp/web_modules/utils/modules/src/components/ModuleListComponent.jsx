/**
 * LICENSE_PLACEHOLDER
 **/
import { map, concat } from 'lodash'
import Drawer from 'material-ui/Drawer'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FilterList from 'material-ui/svg-icons/action/list'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { HateoasDisplayDecorator } from '@regardsoss/display-control'
import Styles from '../styles/styles'
import ModuleShape from '../model/ModuleShape'

/**
 * Component to display all available modules for a given container
 */
class ModuleListComponent extends React.Component {

  static propTypes = {
    container: React.PropTypes.string,
    modules: React.PropTypes.arrayOf(ModuleShape),
    onModuleSelection: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      modulesElements: [],
    }
  }

  componentWillMount() {
    map(this.props.modules, (module, idx) => {
      if (module.content.container === this.props.container && module.content.active) {
        const element = this.renderModule(module, idx)
      }
    })
  }

  /**
   * Callback when a module is selected
   * @param module
   */
  onModuleSelection = (module) => {
    this.handleClose()
    this.props.onModuleSelection(module)
  }

  /**
   * Toggle the sidebar containing modules
   */
  handleToggle = () => this.setState({ open: !this.state.open })

  /**
   * Close the sidebar containing modules
   */
  handleClose = () => this.setState({ open: false })

  renderModule = (module, key) => {
    require.ensure([], (require) => {
      try {
        const loadedModule = require(`@regardsoss/${module.content.name}/src/main.js`)
        const moduleDependencies = loadedModule.dependencies ? (loadedModule.dependencies.user ? loadedModule.dependencies.user : null) : []

        const that = this
        if (loadedModule.moduleContainer) {
          const element = (
            <HateoasDisplayDecorator
              key={key}
              requiredEndpoints={moduleDependencies}
            >
              <ListItem
                primaryText={module.content.description}
                onTouchTap={() => that.onModuleSelection(module)}
              />
            </HateoasDisplayDecorator>
          )
          that.setState({
            modulesElements: concat(that.state.modulesElements, element),
          })
        }
      } catch (e) {
        console.error('Module loading error', module, e, e.stack)
      }
    })
  }


  render() {
    return (
      <div
        style={Styles.moduleListButton}
      >
        <FloatingActionButton
          onTouchTap={this.handleToggle}
          secondary
        >
          <FilterList />
        </FloatingActionButton>
        <Drawer
          open={this.state.open}
          docked={false}
          width={200}
          openSecondary
          onRequestChange={this.handleClose}
        >
          <List>
            {this.state.modulesElements}
          </List>
        </Drawer>
      </div>
    )
  }

}

export default ModuleListComponent
