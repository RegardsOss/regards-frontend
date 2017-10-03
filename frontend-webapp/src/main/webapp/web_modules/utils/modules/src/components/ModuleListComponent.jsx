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
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import concat from 'lodash/concat'
import sortBy from 'lodash/sortBy'
import get from 'lodash/get'
import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'
import GoToIcon from 'material-ui/svg-icons/action/input'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import { browserHistory } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { AccessShapes } from '@regardsoss/shape'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import Styles from '../styles/styles'

const ListItemWithResourceDisplayControl = withResourceDisplayControl(ListItem)

/**
 * Component to display all available modules for a given container
 * @author Sébastien Binda
 */
class ModuleListComponent extends React.Component {

  static propTypes = {
    project: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    container: PropTypes.string,
    modules: AccessShapes.ModuleArray,
    onCloseMenu: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      sections: {},
      modulesElements: [],
    }
  }

  componentWillMount() {
    const sortedModules = sortBy(this.props.modules, module => module.type)
    forEach(sortedModules, (module, idx) => {
      if (module.content.container === this.props.container && module.content.active) {
        this.renderModule(module, idx)
      }
    })
  }

  /**
   * Callback when a module is selected
   * @param module
   */
  onModuleSelection = (module) => {
    this.props.onCloseMenu()
    browserHistory.push(`/user/${this.props.project}/modules/${module.content.id}`)
  }

  getSectionLabel = (section) => {
    const id = `section.${section}`
    const label = this.context.intl.formatMessage({ id })
    return (
      <div style={{ marginRight: 20 }}>{label !== id ? label : section}</div>
    )
  }

  renderModule = (module, key) => {
    require.ensure([], (require) => {
      try {
        // eslint-disable-next-line import/no-dynamic-require
        const loadedModule = require(`@regardsoss-modules/${module.content.type}/src/main.js`)
        const moduleDependencies = get(loadedModule, 'dependencies.user', [])

        const that = this
        if (loadedModule.moduleContainer) {
          const element = (
            <ListItemWithResourceDisplayControl
              key={key}
              resourceDependencies={moduleDependencies}
              leftIcon={<GoToIcon />}
              primaryText={
                <div style={{ marginRight: 20 }}>
                  {module.content.description}
                </div>
              }
              onTouchTap={() => that.onModuleSelection(module)}
            />
          )

          const sections = Object.assign({}, that.state.sections)
          if (sections[module.content.type]) {
            sections[module.content.type] = concat([], sections[module.content.type], [element])
          } else {
            sections[module.content.type] = [element]
          }

          that.setState({
            sections,
          })
        }
      } catch (e) {
        console.error('Module loading error', module, e, e.stack)
      }
    })
  }


  render() {
    const styles = Styles(this.context.muiTheme)
    return (
      <Drawer
        open={this.props.open}
        docked={false}
        width={300}
        onRequestChange={this.props.onCloseMenu}
      >
        <List>
          <Subheader style={styles.moduleListSection}>
            <FormattedMessage id="modules.list.menu.label" />
          </Subheader>
          <Divider />
          {map(this.state.sections, (modules, section) => {
            if (modules.length > 1) {
              return (
                <div key={section}>
                  <ListItem
                    primaryText={this.getSectionLabel(section)}
                    initiallyOpen={false}
                    primaryTogglesNestedList
                    nestedItems={modules}
                  />
                </div>
              )
            }
            return (
              <div key={section}>
                {modules}
              </div>
            )
          })}
        </List>
      </Drawer>
    )
  }

}

export default ModuleListComponent
