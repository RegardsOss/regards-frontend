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
