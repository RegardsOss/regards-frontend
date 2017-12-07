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
import get from 'lodash/get'
import SearchIcon from 'material-ui/svg-icons/action/search'
import IconButton from 'material-ui/IconButton'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { Card, CardText } from 'material-ui/Card'
import { RenderTextField, RenderDoubleLabelToggle, Field, ValidationHelpers } from '@regardsoss/form-utils'
import { CommonShapes } from '@regardsoss/shape'
import RenderPluginParameterField from './RenderPluginParameterField'
import styles from '../styles'
import messages from '../i18n'

const { string, number, required } = ValidationHelpers
const requiredStringValidator = [string, required]
const requiredNumberValidator = [number, required]

/**
* Comment Here
* @author Sébastien Binda
*/
class RenderPluginConfField extends React.Component {
  static propTypes = {
    microserviceName: PropTypes.string.isRequired, // Name of the microservice of the plugin
    pluginMetaData: CommonShapes.PluginMetaDataContent.isRequired, // PluginMetadata used to configure new plugin configuration
    hideGlobalParameterConf: PropTypes.bool, // Use this parameter to hide the global configuration of plugins
    hideDynamicParameterConf: PropTypes.bool,
    disabled: PropTypes.bool,
    // From redux field
    input: PropTypes.shape({
      value: CommonShapes.PluginConfigurationContent,
      name: PropTypes.string,
    }),
  }

  static defaultProps = {
    disabled: false,
    hideGlobalParameterConf: false,
    hideDynamicParameterConf: false,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  getFormFieldName = fieldName => `${this.props.input.name}.${fieldName}`

  renderGlobalConf = () => {
    const { hideGlobalParameterConf, input: { value }, disabled } = this.props
    const pluginConfiguration = value
    const { moduleTheme, intl: { formatMessage } } = this.context

    if (hideGlobalParameterConf) {
      return null
    }

    return (
      <Card>
        <CardText>
          <div>
            {this.renderIcon()}
          </div>
          <Field
            disabled
            name={this.getFormFieldName('pluginClassName')}
            fullWidth
            component={RenderTextField}
            type="text"
            validate={requiredStringValidator}
            label={formatMessage({ id: 'plugin.configuration.form.pluginClassName' })}
          />
          <Field
            name={this.getFormFieldName('label')}
            fullWidth
            component={RenderTextField}
            type="text"
            disabled={disabled}
            validate={requiredStringValidator}
            label={formatMessage({ id: 'plugin.configuration.form.label' })}
          />
          <Field
            name={this.getFormFieldName('version')}
            fullWidth
            component={RenderTextField}
            type="text"
            disabled={disabled}
            validate={requiredStringValidator}
            label={formatMessage({ id: 'plugin.configuration.form.version' })}
          />
          <Field
            name={this.getFormFieldName('priorityOrder')}
            fullWidth
            component={RenderTextField}
            type="number"
            disabled={disabled}
            parse={parseFloat}
            validate={requiredNumberValidator}
            label={formatMessage({ id: 'plugin.configuration.form.priorityOrder' })}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <Field
              name={this.getFormFieldName('iconUrl')}
              component={RenderTextField}
              fullWidth
              type="text"
              disabled={disabled}
              label={formatMessage({ id: 'plugin.configuration.form.icon' })}
            />
            <IconButton
              tooltip="Display icon"
              onTouchTap={this.loadIcon}
            >
              <SearchIcon />
            </IconButton>
          </div>
          <Field
            name={this.getFormFieldName('active')}
            component={RenderDoubleLabelToggle}
            type="boolean"
            disabled={disabled}
            leftLabel={formatMessage({ id: 'plugin.configuration.form.inactive' })}
            rightLabel={formatMessage({ id: 'plugin.configuration.form.active' })}
            style={moduleTheme.pluginConfiguration.form.toggle}
            defaultToggled={pluginConfiguration ? pluginConfiguration.active : true}
          />
        </CardText>
      </Card >
    )
  }

  renderParameters = () => {
    const { pluginMetaData, hideDynamicParameterConf, disabled } = this.props
    const parameters = get(pluginMetaData, 'parameters', [])
    if (parameters.length === 0) {
      return null
    }
    return (
      <Card>
        <CardText>
          {parameters.map((pluginParameterType, index) => (
            <Field
              key={pluginParameterType.name}
              fullWidth
              component={RenderPluginParameterField}
              disabled={disabled}
              name={this.getFormFieldName(`parameters.${index}`)}
              microserviceName={this.props.microserviceName}
              pluginParameterType={pluginParameterType}
              hideDynamicParameterConf={hideDynamicParameterConf}
            />))}
        </CardText>
      </Card>
    )
  }

  /**
  * Render loaded icon see loadIcon method
  * @returns {*}
  */
  renderIcon = () => {
    const pluginConfiguration = this.props.input.value
    if (pluginConfiguration.iconUrl) {
      return <img src={pluginConfiguration.iconUrl} alt="" width="75" height="75" />
    }
    return null
  }

  render() {
    return (
      <div>
        {this.renderGlobalConf()}
        {this.renderParameters()}
      </div>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(RenderPluginConfField))
