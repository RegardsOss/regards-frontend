/**
 * LICENSE_PLACEHOLDER
 **/
import { map, concat, sortBy } from 'lodash'
import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import { browserHistory } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { HateoasDisplayDecorator } from '@regardsoss/display-control'
import Styles from '../styles/styles'
import ModuleShape from '../model/ModuleShape'

/**
 * Component to display all available modules for a given container
 * @author Sébastien Binda
 */
class ModuleListComponent extends React.Component {

  static propTypes = {
    project: React.PropTypes.string.isRequired,
    open: React.PropTypes.bool.isRequired,
    container: React.PropTypes.string,
    modules: React.PropTypes.arrayOf(ModuleShape),
    onCloseMenu: React.PropTypes.func,
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
    const sortedModules = sortBy(this.props.modules, module => module.name)
    map(sortedModules, (module, idx) => {
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
    return label !== id ? label : section
  }

  renderModule = (module, key) => {
    require.ensure([], (require) => {
      try {
        // eslint-disable-next-line import/no-dynamic-require
        const loadedModule = require(`@regardsoss/${module.content.name}/src/main.js`)
        const moduleDependencies = (loadedModule && loadedModule.dependencies && loadedModule.dependencies.user) || []

        const that = this
        if (loadedModule.moduleContainer) {
          const element = (
            <HateoasDisplayDecorator
              key={key}
              requiredEndpoints={moduleDependencies}
            >
              <ListItem
                key={key}
                primaryText={module.content.description}
                onTouchTap={() => that.onModuleSelection(module)}
              />
            </HateoasDisplayDecorator>
          )

          const sections = Object.assign({}, that.state.sections)
          if (sections[module.content.name]) {
            sections[module.content.name] = concat([], sections[module.content.name], [element])
          } else {
            sections[module.content.name] = [element]
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
        width={200}
        openSecondary
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
