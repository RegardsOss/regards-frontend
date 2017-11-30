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
import RaisedButton from 'material-ui/RaisedButton'
import SearchIcon from 'material-ui/svg-icons/action/search'
import { i18nContextType } from '@regardsoss/i18n'
import { AccessShapes } from '@regardsoss/shape'
import { Container } from '@regardsoss/layout'
import { themeContextType } from '@regardsoss/theme'
import { DynamicModule, ModuleTitle } from '@regardsoss/components'
import { dependencies } from '../../user-dependencies'

/**
 * Component to display a configured Search form module
 * @author Sébastien binda
 */
class FormComponent extends React.Component {
  static propTypes = {
    expanded: PropTypes.bool,
    description: PropTypes.string.isRequired,
    layout: AccessShapes.ContainerContent.isRequired,
    plugins: AccessShapes.UIPluginConfArray,
    pluginsProps: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
    }),
    handleSearch: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      expanded: props.expanded,
    }
    this.pluginStates = {}
  }

  onHandleSearch = () => {
    this.props.handleSearch()
    this.setState({
      expanded: false,
    })
  }

  onKeyPress = (e) => {
    if (e.charCode === 13) {
      this.onHandleSearch()
    }
  }

  /**
   * Function passed to plugins to give them back theire previous state in order to initialize them
   * with their previous values.
   *
   * @param pluginId
   * @returns {{}}
   */
  getPluginDefaultState = pluginId => this.pluginStates[pluginId] ? this.pluginStates[pluginId] : {}

  handleExpand = () => {
    this.setState({
      expanded: !this.state.expanded,
    })
  }

  /**
   * Function passed to plugins to save their state. So they can retrieve it later
   * @param pluginId
   * @param state
   */
  savePluginState = (pluginId, state) => {
    this.pluginStates[pluginId] = state
  }

  render() {
    const pluginsProps = {
      ...this.props.pluginsProps,
      getDefaultState: this.getPluginDefaultState,
      savePluginState: this.savePluginState,
    }

    // Workround - Container type changed between version 1 and version 1.1. So, to avoid changing every configuration saved, we force container type with the new value.
    const retroCompatibleLayout = {
      ...this.props.layout,
      type: 'FormMainContainer',
    }
    this.props.layout.type = 'FormMainContainer'

    return (
      <DynamicModule
        title={<ModuleTitle IconConstructor={SearchIcon} text={this.props.description} />}
        onExpandChange={this.handleExpand}
        expanded={this.state.expanded}
        onKeyPress={this.onKeyPress}
        requiredDependencies={dependencies}
      >
        <Container
          appName="user"
          container={retroCompatibleLayout}
          plugins={this.props.plugins}
          pluginProps={pluginsProps}
          formHeader
        />
        <div
          style={this.context.moduleTheme.user.searchButtonContainer}
        >
          <RaisedButton
            label={this.context.intl.formatMessage({ id: 'form.search.button.label' })}
            labelPosition="before"
            primary
            icon={<SearchIcon />}
            style={this.context.moduleTheme.user.searchButton}
            onTouchTap={this.onHandleSearch}
          />
        </div>
      </DynamicModule>)
  }
}

export default FormComponent
