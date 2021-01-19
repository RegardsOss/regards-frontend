/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Avatar from 'material-ui/Avatar'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DataProviderShapes } from '@regardsoss/shape'
import { Field } from 'redux-form'
import { ValidationHelpers } from '@regardsoss/form-utils'
import { RenderPluginField } from '@regardsoss/microservice-plugin-configurator'
import AcquisitionProcessingChainPluginTypes from './AcquisitionProcessingChainPluginTypes'

/**
* Component to configure plugins of a generation chain of DataProvider microservice
* @author Sébastien Binda
*/
class AcquisitionProcessingChainFormPluginsComponent extends React.Component {
  static propTypes = {
    chain: DataProviderShapes.AcquisitionProcessingChain,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static defaultProps = {}

  getPluginConfigurator = (index, title, selectLabel, pluginType, pluginConf, fieldNamePrefix, validate) => {
    const { moduleTheme: { pluginStyles, avatarStyles }, muiTheme: { palette } } = this.context
    const defaultPluginLabel = `${fieldNamePrefix}-${Date.now()}`
    return (
      <div key={pluginType} style={pluginStyles}>
        <Avatar
          size={30}
          style={avatarStyles}
          color={palette.textColor}
          backgroundColor={palette.primary1Color}
        >
          {index}
        </Avatar>
        <Field
          name={fieldNamePrefix}
          component={RenderPluginField}
          title={title}
          selectLabel={selectLabel}
          pluginType={pluginType}
          defaultPluginConfLabel={defaultPluginLabel}
          validate={validate}
          microserviceName={STATIC_CONF.MSERVICES.DATA_PROVIDER}
          hideDynamicParameterConf
          hideGlobalParameterConf
        />
      </div>
    )
  }

  render() {
    const { chain } = this.props
    const { intl: { formatMessage } } = this.context

    const validationPlugin = get(chain, 'validationPluginConf', null)
    const productPlugin = get(chain, 'productPluginConf', null)
    const genPlugin = get(chain, 'generateSipPluginConf', null)
    const postProcessPlugin = get(chain, 'postProcessSipPluginConf', null)

    const plugins = [
      this.getPluginConfigurator(
        1,
        formatMessage({ id: 'acquisition-chain.form.plugins.validation.label' }),
        formatMessage({ id: 'acquisition-chain.form.plugins.select.label' }),
        AcquisitionProcessingChainPluginTypes.VALIDATION,
        validationPlugin,
        'validationPluginConf',
        ValidationHelpers.required,
      ),
      this.getPluginConfigurator(
        2,
        formatMessage({ id: 'acquisition-chain.form.plugins.product.label' }),
        formatMessage({ id: 'acquisition-chain.form.plugins.select.label' }),
        AcquisitionProcessingChainPluginTypes.PRODUCT,
        productPlugin,
        'productPluginConf',
        ValidationHelpers.required,
      ),
      this.getPluginConfigurator(
        3,
        formatMessage({ id: 'acquisition-chain.form.plugins.gen-sip.label' }),
        formatMessage({ id: 'acquisition-chain.form.plugins.select.label' }),
        AcquisitionProcessingChainPluginTypes.GENERATE_SIP,
        genPlugin,
        'generateSipPluginConf',
        ValidationHelpers.required,
      ),
      this.getPluginConfigurator(
        4,
        formatMessage({ id: 'acquisition-chain.form.plugins.post-processing.label' }),
        formatMessage({ id: 'acquisition-chain.form.plugins.select.label' }),
        AcquisitionProcessingChainPluginTypes.POST_PROCESSING,
        postProcessPlugin,
        'postProcessSipPluginConf',
      ),
    ]
    return plugins
  }
}
export default AcquisitionProcessingChainFormPluginsComponent
