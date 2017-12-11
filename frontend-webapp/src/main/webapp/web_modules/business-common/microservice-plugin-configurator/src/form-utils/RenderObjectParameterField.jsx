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
import map from 'lodash/map'
import { CommonShapes } from '@regardsoss/shape'
import { fieldInputPropTypes } from 'redux-form'
import { Field } from '@regardsoss/form-utils'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { RenderPluginParameterField } from './RenderPluginParameterField'
import styles from '../styles'
import messages from '../i18n'

/**
* Render a plugin parameter form for a OBJECT parameter.
* @author Sébastien Binda
*/
export class RenderObjectParameterField extends React.Component {
  static propTypes = {
    microserviceName: PropTypes.string.isRequired,
    pluginParameterType: CommonShapes.PluginParameterType.isRequired,
    fullWidth: PropTypes.bool,
    // From redux field
    name: PropTypes.string,
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
  }

  static defaultProps = {
    fullWidth: false,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      input, pluginParameterType, microserviceName, fullWidth, name,
    } = this.props

    const parameters = map(pluginParameterType.parameters, p => (<Field
      key={`${name || input.name}.${p.name}`}
      name={`${name || input.name}.${p.name}`}
      component={RenderPluginParameterField}
      microserviceName={microserviceName}
      pluginParameterType={p}
      hideDynamicParameterConf
      complexParameter={false}
    />))
    const style = fullWidth ? { width: '100%' } : {}
    return (<div style={style}>{parameters}</div>)
  }
}
export default withModuleStyle(styles)(withI18n(messages)(RenderObjectParameterField))
