/**
 * LICENSE_PLACEHOLDER
 **/
import fpUniqueId from 'lodash/fp/uniqueId'
import Chip from 'material-ui/Chip'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import { ValidationHelpers } from '@regardsoss/form-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import DynamicValueCreateComponent from './DynamicValueCreateComponent'
import { pluginParameterComponentPropTypes } from './utils'
import moduleStyles from '../../../styles/styles'

const { required, string } = ValidationHelpers

/**
 * Renders a plugin parameter which is
 * - dynamic
 * - in display mode (not editable)
 * - of types
 * java.lang.String
 * java.lang.Character
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginParameterDynamicField extends React.Component {

  static propTypes = pluginParameterComponentPropTypes

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      selectedValue: props.pluginParameter.value,
      dynamicsValues: props.pluginParameter.dynamicsValues,
    }
  }

  onRequestDelete = (dynamicvalueIndex) => {
    const { change, fieldKey } = this.props
    const { selectedValue, dynamicsValues } = this.state
    const removedValue = dynamicsValues.splice(dynamicvalueIndex, 1)[0]
    this.setState({
      dynamicsValues,
    })
    change(`${fieldKey}.dynamicsValues`, dynamicsValues)
    if (removedValue.value === selectedValue) {
      change(`${fieldKey}.value`, '')
    }
  }

  onTouchTap = (dynamicvalueIndex) => {
    const { change, fieldKey } = this.props
    const { dynamicsValues } = this.state
    const newValue = dynamicsValues[dynamicvalueIndex].value
    this.setState({
      selectedValue: newValue,
    })
    change(`${fieldKey}.value`, newValue)
  }

  onOpen = () => this.setState({ open: true })

  onClose = () => this.setState({ open: false })

  onCreate = (value) => {
    const { change, fieldKey } = this.props
    const { dynamicsValues } = this.state
    const newDynamicValues = dynamicsValues.concat([value]) // concat returns the result array
    this.setState({
      dynamicsValues: newDynamicValues,
    })
    change(`${fieldKey}.dynamicsValues`, newDynamicValues)
  }

  render() {
    const { pluginParameter: { name }, pluginParameterType } = this.props
    const { selectedValue, open, dynamicsValues } = this.state
    const { muiTheme, intl } = this.context
    const styles = moduleStyles(muiTheme)

    const validators = [string]
    let label = name
    if (pluginParameterType && !pluginParameterType.optional) {
      validators.push(required)
      label += '*'
    }

    return (
      <div>
        <Subheader style={styles.dynamicValue.label}>{label}</Subheader>
        <div style={styles.dynamicValue.wrapper}>
          <IconButton
            onTouchTap={this.onOpen}
            tooltip={intl.formatMessage({ id: 'microservice-management.plugin.parameter.dynamicvalue.add' })}
          >
            <AddCircle />
          </IconButton>

          {dynamicsValues.map((item, index) => (
            <div key={fpUniqueId('react_generated_uuid_')}>
              <Chip
                backgroundColor={selectedValue === item.value ? muiTheme.palette.primary1Color : undefined} // undefined is for using default
                style={styles.dynamicValue.chip}
                onRequestDelete={() => this.onRequestDelete(index)}
                onTouchTap={() => this.onTouchTap(index)}
              >
                {item.value}
              </Chip>
            </div>
          ))}
        </div>
        <DynamicValueCreateComponent
          open={open}
          onRequestClose={this.onClose}
          onSubmit={this.onCreate}
        />
      </div>
    )
  }
}

export default PluginParameterDynamicField
