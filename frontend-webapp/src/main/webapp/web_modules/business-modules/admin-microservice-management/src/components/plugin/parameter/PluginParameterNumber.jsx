/**
 * LICENSE_PLACEHOLDER
 **/
import Subheader from 'material-ui/Subheader'
import { ShowableAtRender } from '@regardsoss/components'
import { RenderTextField, Field, ValidationHelpers } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { pluginParameterComponentPropTypes, getFieldName } from './utils'
import moduleStyles from '../../../styles/styles'

const { required, string } = ValidationHelpers

/**
 * Renders a plugin parameter which is
 * - static
 * - in edit/create/copy mode
 * - of types
 * 'java.lang.Byte'
 * 'java.lang.Integer'
 * 'java.lang.Long'
 * 'java.lang.Float'
 * 'java.lang.Double'
 * 'java.lang.Short'
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginParameterNumber extends React.Component {

  static propTypes = pluginParameterComponentPropTypes

  static contextTypes = {
    ...themeContextType,
  }

  format = val => parseFloat(val)

  render() {
    const { pluginParameter: { name, value }, pluginParameterType, mode, pluginConfiguration } = this.props
    const { muiTheme } = this.context
    const isView = mode === 'view'
    const validators = [string] // Yes a String, because we store the number in string in the model.
    const styles = moduleStyles(muiTheme)

    let label = name
    if (pluginParameterType && !pluginParameterType.optional) {
      validators.push(required)
      label += '*'
    }

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
            name={getFieldName(name, pluginConfiguration, '.value')}
            format={this.format}
            fullWidth
            component={RenderTextField}
            type={'number'}
            label={label}
            validate={validators}
          />
        </ShowableAtRender>
      </div>
    )
  }
}

export default PluginParameterNumber
