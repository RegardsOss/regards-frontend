/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FilterList from 'material-ui/svg-icons/action/list'
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
          {map(this.props.modules, (module, idx) => {
            if (module.content.container === this.props.container) {
              return (
                <MenuItem
                  key={idx}
                  onTouchTap={() => this.onModuleSelection(module)}
                >
                  {module.content.description}
                </MenuItem>
              )
            }
            return null
          })}
        </Drawer>
      </div>
    )
  }

}

export default ModuleListComponent
