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
    const { pluginParameter: { name, value }, pluginParameterType, mode, pluginMetaData } = this.props
    const { muiTheme } = this.context
    const isView = mode === 'view'
    const validators = [string]
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
            name={getFieldName(name, pluginMetaData, '.value')}
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
