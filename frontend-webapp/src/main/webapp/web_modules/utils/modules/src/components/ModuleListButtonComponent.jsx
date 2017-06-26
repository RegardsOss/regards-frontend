/**
 * LICENSE_PLACEHOLDER
 **/
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FilterList from 'material-ui/svg-icons/action/list'
import { themeContextType } from '@regardsoss/theme'
import { AccessShapes } from '@regardsoss/shape'
import Styles from '../styles/styles'
import ModuleListComponent from './ModuleListComponent'

/**
 * Component to display all available modules for a given container
 * @author Sébastien Binda
 */
class ModuleListButtonComponent extends React.Component {

  static propTypes = {
    container: PropTypes.string,
    modules: AccessShapes.ModuleArray,
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  /**
   * Toggle the sidebar containing modules
   */
  handleToggle = () => this.setState({ open: !this.state.open })

  /**
   * Close the sidebar containing modules
   */
  handleClose = () => this.setState({ open: false })

  render() {
    const styles = Styles(this.context.muiTheme)
    return (
      <div
        style={styles.moduleListButtonsGroup}
      >
        <FloatingActionButton
          onTouchTap={this.handleToggle}
          secondary
        >
          <FilterList />
        </FloatingActionButton>
        <ModuleListComponent
          open={this.state.open}
          container={this.props.container}
          modules={this.props.modules}
          onCloseMenu={this.handleClose}
        />
      </div>
    )
  }

}

export default ModuleListButtonComponent
