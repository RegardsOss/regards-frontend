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
import Subheader from 'material-ui/Subheader'
import Checkbox from 'material-ui/Checkbox'
import { ShowableAtRender } from '@regardsoss/components'
import { Field, RenderCheckbox } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { pluginParameterComponentPropTypes, getFieldName } from './utils'
import moduleStyles from '../../../styles/styles'

/**
 * Renders a form field in view or edit mode for a plugin parameter of types
 * java.lang.Boolean
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginParameterBoolean extends React.Component {

  static propTypes = pluginParameterComponentPropTypes

  static contextTypes = {
    ...themeContextType,
  }

  static defaultProps = {
    mode: 'view',
  }

  format = val => val === 'true'

  parse = val => val.toString()

  render() {
    const { pluginParameter, pluginParameterType, pluginMetaData, mode } = this.props
    const isView = mode === 'view'
    const styles = moduleStyles(this.context.muiTheme)
    let label = pluginParameterType.name
    if (pluginParameterType && !pluginParameterType.optional) {
      label += '*'
    }

    const value = pluginParameter ? pluginParameter.value : get(pluginParameterType, 'defaultValue')

    return (
      <div style={styles.pluginParameter.wrapper}>
        <Subheader style={styles.pluginParameter.label}>{label}</Subheader>
        <ShowableAtRender show={isView} >
          <Checkbox
            checked={this.format(value)}
            disabled
          />
        </ShowableAtRender>
        <ShowableAtRender show={!isView} >
          <Field
            name={getFieldName(pluginParameterType.name, pluginMetaData, '.value')}
            format={this.format}
            parse={this.parse}
            component={RenderCheckbox}
            type={'boolean'}
            style={styles.pluginConfiguration.form.toggle}
            defaultChecked={this.format(value)}
          />
        </ShowableAtRender>

      </div>
    )
  }
}


export default PluginParameterBoolean
