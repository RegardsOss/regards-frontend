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
import isString from 'lodash/isString'
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form'
import { Field, RenderHelper } from '@regardsoss/form-utils'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import PluginListContainer from '../containers/PluginListContainer'
import { RenderPluginConfField } from './RenderPluginConfField'
import styles from '../styles'
import messages from '../i18n'

/**
* Redux-form compatible field component to display a Plugin selector asscioated to a Plugin configurator form.
* @author Sébastien Binda
*/
class RenderPluginField extends React.Component {
  static propTypes = {
    title: PropTypes.string, // Title of display in top of the form
    selectLabel: PropTypes.string, // Label displayed in the selectable list of plugins
    pluginType: PropTypes.string.isRequired, // Type of plugin to configure
    microserviceName: PropTypes.string.isRequired, // Name of the microservice associated to the plugin type
    defaultPluginConfLabel: PropTypes.string, // If set, the label of a new plugin configuration is initialized with
    hideGlobalParameterConf: PropTypes.bool, // Hide the global parameters configuration
    hideDynamicParameterConf: PropTypes.bool, // Hide the dynmaic configuration of parameters
    fullWidth: PropTypes.bool, // Display the form with full width
    // From redux field
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
    meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  }

  static defaultProps = {
    fullWidth: false,
    hideGlobalParameterConf: false,
    hideDynamicParameterConf: false,
  }

  static listLabelStyle = { minWidth: '220px' }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedPluginMetaData: null,
    }
  }

  getPluginSelector = () => {
    const {
      pluginType, input: { value }, selectLabel, title, meta: { error }, microserviceName,
    } = this.props
    const { intl } = this.context
    const errorMessage = error && isString(error) ? RenderHelper.getErrorMessage(true, error, intl) : undefined
    return (
      <PluginListContainer
        title={title}
        selectLabel={selectLabel}
        microserviceName={microserviceName}
        pluginType={pluginType}
        selectedPluginId={value ? value.pluginId : null}
        handleSelect={this.handleSelectPluginMetaData}
        displayTitle={false}
        errorText={errorMessage}
      />
    )
  }

  getPluginConfigurator = () => {
    const {
      input, microserviceName, defaultPluginConfLabel, hideGlobalParameterConf, hideDynamicParameterConf,
    } = this.props

    if (this.state.selectedPluginMetaData) {
      return (
        <Field
          name={input.name}
          component={RenderPluginConfField}
          microserviceName={microserviceName}
          pluginMetaData={this.state.selectedPluginMetaData}
          newPluginConfLabel={defaultPluginConfLabel}
          hideGlobalParameterConf={hideGlobalParameterConf}
          hideDynamicParameterConf={hideDynamicParameterConf}
        />
      )
    }
    return null
  }

  getPluginDefaultConf = pluginMetaData => ({
    id: null,
    pluginId: pluginMetaData.pluginId,
    label: this.props.defaultPluginConfLabel,
    version: pluginMetaData.version,
    priorityOrder: 0,
    active: true,
    pluginClassName: pluginMetaData.pluginClassName,
    parameters: [],
    iconUrl: null,
  })

  /**
   * Callback when a plugin metadata is selected.
   * @param {*} selectedPluginMetaData : selected pluginMetaData
   */
  handleSelectPluginMetaData = (selectedPluginMetaData, isInitialization) => {
    const { input } = this.props
    this.setState({ selectedPluginMetaData })
    if (!isInitialization) {
      if (selectedPluginMetaData) {
        input.onChange(this.getPluginDefaultConf(selectedPluginMetaData))
      } else {
        input.onChange(null)
      }
    }
  }

  render() {
    const divStyle = this.props.fullWidth ? { width: '100%' } : {}

    return (
      <div style={divStyle}>
        {this.getPluginSelector()}
        {this.getPluginConfigurator()}
      </div>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(RenderPluginField))
