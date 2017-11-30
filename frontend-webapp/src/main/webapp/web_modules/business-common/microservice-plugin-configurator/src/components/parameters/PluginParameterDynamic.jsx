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
import fpUniqueId from 'lodash/fp/uniqueId'
import Chip from 'material-ui/Chip'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import { ShowableAtRender } from '@regardsoss/components'
import { ValidationHelpers } from '@regardsoss/form-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import DynamicValueCreateComponent from './DynamicValueCreateComponent'
import { pluginParameterComponentPropTypes, getFieldName } from './util'
import moduleStyles from '../../styles/styles'

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
      dynamicsValues: props.pluginParameter.dynamicsValues || [],
    }
  }

  onRequestDelete = (dynamicvalueIndex) => {
    const {
      reduxFormfieldNamePrefix, change, pluginMetaData, pluginParameterType: { name },
    } = this.props
    const { selectedValue, dynamicsValues } = this.state
    const removedValue = dynamicsValues.splice(dynamicvalueIndex, 1)[0]
    this.setState({ // Update the state for re-render
      dynamicsValues,
    })
    change(getFieldName(reduxFormfieldNamePrefix, name, pluginMetaData, '.dynamicsValues'), dynamicsValues)

    if (removedValue.value === selectedValue) { // If the removed dynamic value was the one selected, empty the current value
      this.setState({
        selectedValue: '',
      })
      change(getFieldName(reduxFormfieldNamePrefix, name, pluginMetaData, '.value'), '')
    }
  }

  onTouchTap = (dynamicvalueIndex) => {
    const {
      reduxFormfieldNamePrefix, change, pluginMetaData, pluginParameterType: { name },
    } = this.props
    const { dynamicsValues, selectedValue } = this.state
    const newValue = dynamicsValues[dynamicvalueIndex].value
    // We clicked on currently selected value -> deselect it
    if (newValue === selectedValue) {
      this.setState({
        selectedValue: '',
      })
      change(getFieldName(reduxFormfieldNamePrefix, name, pluginMetaData, '.value'), '') // Update the value
    } else {
      this.setState({
        selectedValue: newValue,
      })
      change(getFieldName(reduxFormfieldNamePrefix, name, pluginMetaData, '.value'), newValue) // Update the value
    }
  }

  onOpen = () => this.setState({ open: true })

  onClose = () => this.setState({ open: false })

  onCreate = (value) => {
    const {
      reduxFormfieldNamePrefix, change, pluginMetaData, pluginParameterType: { name },
    } = this.props
    const { dynamicsValues, selectedValue } = this.state
    const newDynamicValues = dynamicsValues.concat([value]) // concat returns the result array
    this.setState({ // Update state for re-render
      dynamicsValues: newDynamicValues,
    })
    change(getFieldName(reduxFormfieldNamePrefix, name, pluginMetaData, '.dynamicsValues'), newDynamicValues) // Update the list of dynamic values

    if (selectedValue === '') { // If first value to add, auto-select it
      this.setState({
        selectedValue: value.value,
      })
      change(getFieldName(reduxFormfieldNamePrefix, name, pluginMetaData, '.value'), value)
    }
  }

  render() {
    const { pluginParameterType, mode } = this.props
    const { open, dynamicsValues, selectedValue } = this.state
    const { muiTheme, intl } = this.context
    const isView = mode === 'view'
    const styles = moduleStyles(muiTheme)

    const validators = [string]
    let label = pluginParameterType.name
    if (pluginParameterType && !pluginParameterType.optional) {
      validators.push(required)
      label += '*'
    }

    return (
      <div style={styles.pluginParameter.wrapper}>
        <Subheader style={styles.pluginParameter.label}>{label}</Subheader>
        <ShowableAtRender show={!isView}>
          <IconButton
            onTouchTap={this.onOpen}
            tooltip={intl.formatMessage({ id: 'microservice-management.plugin.parameter.dynamicvalue.add' })}
          >
            <AddCircle />
          </IconButton>
          <DynamicValueCreateComponent
            open={open}
            onRequestClose={this.onClose}
            onSubmit={this.onCreate}
            pluginParameterType={pluginParameterType}
          />
        </ShowableAtRender>
        {dynamicsValues.map((item, index) => (
          <div key={fpUniqueId('react_generated_uuid_')}>
            <Chip
              backgroundColor={selectedValue === item.value ? muiTheme.palette.primary1Color : undefined} // undefined is for using default
              style={styles.dynamicValue.chip}
              onRequestDelete={!isView ? () => this.onRequestDelete(index) : undefined}
              onTouchTap={!isView ? () => this.onTouchTap(index) : undefined}
            >
              {item.value}
            </Chip>
          </div>
        ))}
      </div>
    )
  }
}

export default PluginParameterDynamicField
