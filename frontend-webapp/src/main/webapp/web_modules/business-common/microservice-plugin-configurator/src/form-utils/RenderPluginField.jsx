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
import { CommonShapes } from '@regardsoss/shape'
import { RenderHelper } from '@regardsoss/form-utils'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import PluginListContainer from '../containers/PluginListContainer'
import RenderPluginConfField from './RenderPluginConfField'
import styles from '../styles'
import messages from '../i18n'

/**
* Comment Here
* @author Sébastien Binda
*/
class RenderPluginField extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    selectLabel: PropTypes.string,
    ingestPluginType: PropTypes.string.isRequired,
    defaultPluginConfLabel: PropTypes.string.isRequired,
    storePath: PropTypes.arrayOf(PropTypes.string).isRequired,
    microserviceName: PropTypes.string.isRequired,
    hideGlobalParameterConf: PropTypes.bool,
    hideDynamicParameterConf: PropTypes.bool,
    // From redux field
    input: PropTypes.shape({
      value: CommonShapes.PluginConfigurationContent,
      name: PropTypes.string,
    }),
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
    }),
  }

  static defaultProps = {
    hideGlobalParameterConf: false,
    hideDynamicParameterConf: false,
  }

  static listLabelStyle = { minWidth: '220px' }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    selectedPluginMetaData: null,
  }

  getPluginSelector = () => {
    const {
      ingestPluginType, input: { value }, selectLabel, title, storePath, meta: { error }, microserviceName,
    } = this.props
    const { intl } = this.context
    const errorMessage = error && isString(error) ? RenderHelper.getErrorMessage(true, error, intl) : undefined
    return (
      <PluginListContainer
        title={title}
        selectLabel={selectLabel}
        microserviceName={microserviceName}
        pluginType={ingestPluginType}
        storePath={storePath}
        selectedPluginId={value ? value.pluginId : null}
        handleSelect={this.handleSelectPluginMetaData}
        displayTitle={false}
        errorText={errorMessage}
      />
    )
  }

  getPluginConfigurator = () => {
    const {
      input, input: { value }, microserviceName, defaultPluginConfLabel, hideGlobalParameterConf, hideDynamicParameterConf,
    } = this.props

    if (this.state.selectedPluginMetaData) {
      return (
        <RenderPluginConfField
          input={input}
          microserviceName={microserviceName}
          pluginMetaData={this.state.selectedPluginMetaData}
          formMode={value && value.pluginId === this.state.selectedPluginMetaData.pluginId ? 'edit' : 'create'}
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
  handleSelectPluginMetaData = (selectedPluginMetaData) => {
    const { input } = this.props
    input.onChange(this.getPluginDefaultConf(selectedPluginMetaData))
    this.setState({ selectedPluginMetaData })
  }

  render() {
    return (
      <div>
        {this.getPluginSelector()}
        {this.getPluginConfigurator()}
      </div>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(RenderPluginField))
