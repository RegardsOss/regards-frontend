/**
 * LICENSE_PLACEHOLDER
 **/
import {map} from 'lodash'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import listIcon from 'material-ui/svg-icons/action/list'
import ContentAdd from 'material-ui/svg-icons/content/add'
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
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  onModuleSelection = (module) => {
    this.handleClose()
    this.props.onModuleSelection(module)
  }


  render() {
    return (
      <div style={{
        position: 'absolute',
        top: '50vh',
        right: 50
      }}>
        <FloatingActionButton
          onTouchTap={this.handleToggle}
          secondary={true}
        >
          <listIcon />
        </FloatingActionButton>
        <Drawer
          open={this.state.open}
          docked={false}
          width={200}
          openSecondary={true}
          onRequestChange={this.handleClose}
        >
          {map(this.props.modules, (module, idx) => {
            if (module.content.container === this.props.container)
              return (
                <MenuItem key={idx}
                          onTouchTap={() => this.onModuleSelection(module)}
                >
                  {module.content.description}
                </MenuItem>
              )
          })}
        </Drawer>
      </div>
    )
  }

}

export default ModuleListComponent
