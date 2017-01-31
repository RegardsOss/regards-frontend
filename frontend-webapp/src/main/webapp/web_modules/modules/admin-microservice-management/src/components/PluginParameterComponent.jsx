/**
 * LICENSE_PLACEHOLDER
 **/
import { chain } from 'lodash'
import { ListItem } from 'material-ui/List'
import MenuItem from 'material-ui/MenuItem'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import { Toggle, SelectField } from 'redux-form-material-ui'
import { PluginParameter, PluginParameterType } from '@regardsoss/model'
import { RenderTextField, Field } from '@regardsoss/form-utils'
import moduleStyles from '../styles/styles'

// validation functions
const required = value => value == null ? 'Required' : undefined

/**
 * Renders a field in view or edit mode based on a pluginParameter and it's type.
 * For example, a parameter of type java.lang.String will be rendered as a {@link TextField},
 * and a paramater of type java.lang.Boolean will be rendered as a {@link Toggle}.
 *
 * @author Xavier-Alexandre Brochard
 */
class PluginParameterComponent extends React.Component {

  static propTypes = {
    pluginParameter: PluginParameter,
    pluginParameterType: PluginParameterType,
    mode: React.PropTypes.oneOf(['view', 'edit']),
  }

  static defaultProps = {
    mode: 'view',
  }

  constructor(props) {
    super(props)
    this.state = {
      mode: 'view',
    }
  }

  render() {
    const styles = moduleStyles(this.context.muiTheme)
    const { pluginParameter, pluginParameterType, mode } = this.props
    const { name, value } = pluginParameter
    const pluginConfigurationList = []

    switch (mode) {
      case 'view':
        return <ListItem>{name}: {value.toString()}</ListItem>
      case 'edit':
        switch (pluginParameterType.paramType) {
          case 'PRIMITIVE':
            switch (pluginParameterType.type) {
              case 'java.lang.String':
              case 'java.lang.Character':
                return (
                  <Field
                    name={name}
                    fullWidth
                    component={RenderTextField}
                    type={'text'}
                    label={name}
                  />
                )
              case 'java.lang.Byte':
              case 'java.lang.Integer':
              case 'java.lang.Long':
              case 'java.lang.Float':
              case 'java.lang.Double':
              case 'java.lang.Short':
                return (
                  <Field
                    name={name}
                    fullWidth
                    component={RenderTextField}
                    type={'number'}
                    label={name}
                  />
                )
              case 'java.lang.Boolean':
                return (
                  <Field
                    name={name}
                    component={Toggle}
                    type={'boolean'}
                    style={styles.pluginConfiguration.form.toggle}
                    label={name}
                  />
                )
              default:
                return (
                  <Field
                    name={name}
                    fullWidth
                    component={RenderTextField}
                    type={'text'}
                    label={name}
                  />
                )
            }
          case 'PLUGIN':
          default:
            return (
              <Field
                name={name}
                component={SelectField}
                hintText={`${name} - ${pluginParameterType.type}`}
                floatingLabelText={`${name} - ${pluginParameterType.type}`}
                validate={required}
                fullWidth
                autoWidth
              >
                <Subheader>Active</Subheader>
                {chain(pluginConfigurationList)
                  .filter(pluginConfiguration => pluginConfiguration.active)
                  .sort(pluginConfiguration => pluginConfiguration.priorityOrder)
                  .map(pluginConfiguration => (
                    <MenuItem value={pluginConfiguration.id} primaryText={pluginConfiguration.label}/>
                  ))
                  .value()}
                <Divider />
                <Subheader>Inaactive</Subheader>
                {chain(pluginConfigurationList)
                  .filter(pluginConfiguration => !pluginConfiguration.active)
                  .sort(pluginConfiguration => pluginConfiguration.priorityOrder)
                  .map(pluginConfiguration => (
                    <MenuItem value={pluginConfiguration.id} primaryText={pluginConfiguration.label}/>
                  ))
                  .value()}
              </Field>
            )
        }
      default:
        return <ListItem>{name}: {value.toString()}</ListItem>
    }
  }
}

export default PluginParameterComponent
