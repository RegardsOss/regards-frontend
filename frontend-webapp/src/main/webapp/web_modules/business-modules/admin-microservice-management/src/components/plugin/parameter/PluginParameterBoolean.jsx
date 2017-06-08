/**
 * LICENSE_PLACEHOLDER
 **/
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
    const { pluginParameter: { name, value }, pluginParameterType, pluginMetaData, mode } = this.props
    const isView = mode === 'view'
    const styles = moduleStyles(this.context.muiTheme)
    let label = name
    if (pluginParameterType && !pluginParameterType.optional) {
      label += '*'
    }

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
            name={getFieldName(name, pluginMetaData, '.value')}
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
