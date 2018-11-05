/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import omit from 'lodash/omit'
import { DamDomain } from '@regardsoss/domain'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { AutoCompleteTextField } from '@regardsoss/components'

/**
 * Single attribute selection field render: it edits a simple string, showing to user the attribute label. But it publishes,
 * when it is available, the attribute jsonPath
 *
 * @author Raphaël Mechali
 */
class SingleAttributeFieldRender extends React.Component {
  static propTypes = {
    attributeModels: DataManagementShapes.AttributeModelArray.isRequired,
    input: PropTypes.shape({
      value: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
    }).isRequired,
    meta: PropTypes.shape({
      invalid: PropTypes.bool.isRequired,
      error: PropTypes.string,
    }),
    label: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Filters attributes models on filterText and converts them into auto complete fields selectable items
   * @param {*} filterText filter text
   * @param {*} attributeModels attribute models
   * @return [{*}] auto complete field items for current text
   */
  static filterAndConvertAttributes(filterText = '', attributeModels) {
    return attributeModels.reduce((acc, attribute) => {
      // to be more usable here, we accept searching in the middle of labels, case insensitive
      const attributeLabel = DamDomain.AttributeModelController.getAttributeModelFullLabel(attribute)
      if (attributeLabel.toLowerCase().includes(filterText.toLowerCase())) {
        return [...acc, { // prepare autocompletion field item:
          id: attribute.content.jsonPath,
          text: attributeLabel,
          value: attribute.content.jsonPath,
        }]
      }
      return acc
    }, [])
  }

  /** Name of properties to not report onto the autocomplete field */
  static NON_REPORTED_PROPERTIES = [
    'attributeModels',
    'input',
    'meta',
    'label',
  ]

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const newState = {}
    // update current text and available filtered attribute models list
    const newInputValue = newProps.input.value
    newState.inputValue = newProps.input.value
    newState.filteredAttributes = SingleAttributeFieldRender.filterAndConvertAttributes(
      newInputValue, newProps.attributeModels)
    // compute sub component properties
    newState.fieldProperties = omit(newProps, SingleAttributeFieldRender.NON_REPORTED_PROPERTIES)
    this.setState(newState)
  }

  /**
   * User entered text in field (not to be committed yet)
   * @param text current text
   */
  onUpdateInput = (text) => {
    this.setState({
      inputValue: text,
      filteredAttributes: SingleAttributeFieldRender.filterAndConvertAttributes(
        text, this.props.attributeModels),
    })
  }

  /**
   * User selected an attribute
   */
  onAttributeSelected = (id, isInList) => {
    const { input: { onChange } } = this.props
    onChange(id)
  }


  render() {
    const { meta: { invalid, error }, label } = this.props
    const { inputValue, filteredAttributes, fieldProperties } = this.state
    return (
      <AutoCompleteTextField
        name="attributeSelector"
        currentHintText={inputValue}
        currentHints={filteredAttributes}
        isInError={invalid}
        errorMessage={invalid ? error : undefined}
        onUpdateInput={this.onUpdateInput}
        onFilterSelected={this.onAttributeSelected}
        floatingLabelText={label}
        {...fieldProperties}
      />
    )
  }
}
export default SingleAttributeFieldRender
