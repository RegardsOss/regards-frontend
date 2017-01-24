/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import Drawer from 'material-ui/Drawer'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FilterList from 'material-ui/svg-icons/action/list'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
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
    this.state = { open: false }
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
  handleToggle = () => this.setState({ open: !this.state.open });

  /**
   * Close the sidebar containing modules
   */
  handleClose = () => this.setState({ open: false });


  render() {
    return (
      <div
        style={{
          position: 'absolute',
          top: '50vh',
          right: 50,
          zIndex: 7000
        }}
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
            {map(this.props.modules, (module, idx) => {
              if (module.content.container === this.props.container && module.content.active) {
                return (
                  <ListItem
                    key={idx}
                    primaryText={module.content.description}
                    onTouchTap={() => this.onModuleSelection(module)}
                  />
                )
              }
              return null
            })}
            <Divider />
          </List>
        </Drawer>
      </div>
    )
  }

}

export default ModuleListComponent
