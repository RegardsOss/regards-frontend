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
import { ShowableAtRender } from '@regardsoss/components'
import { RenderTextField, Field, ValidationHelpers } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { pluginParameterComponentPropTypes, getFieldName } from './utils'
import moduleStyles from '../../../styles/styles'

const { required, string } = ValidationHelpers

/**
 * Renders plugin parameter which is
 * - static
 * - in edit/crete/copy mode
 * - of types
 * java.lang.String
 * java.lang.Character
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginParameterString extends React.Component {

  static propTypes = pluginParameterComponentPropTypes

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { pluginParameter, pluginParameterType, mode, pluginMetaData } = this.props
    const { muiTheme } = this.context
    const isView = mode === 'view'
    const validators = [string]
    const styles = moduleStyles(muiTheme)

    let label = pluginParameterType.name
    if (pluginParameterType && !pluginParameterType.optional) {
      validators.push(required)
      label += '*'
    }

    const value = pluginParameter ? pluginParameter.value : get(pluginParameterType, 'defaultValue')

    return (
      <div>
        <ShowableAtRender show={isView}>
          <div style={styles.pluginParameter.wrapper}>
            <Subheader style={styles.pluginParameter.label}>{label}</Subheader>
            {value}
          </div>
        </ShowableAtRender>
        <ShowableAtRender show={!isView}>
          <Field
            name={getFieldName(pluginParameterType.name, pluginMetaData, '.value')}
            fullWidth
            component={RenderTextField}
            type={'text'}
            label={label}
            validate={validators}
          />
        </ShowableAtRender>
      </div>
    )
  }
}

export default PluginParameterString
