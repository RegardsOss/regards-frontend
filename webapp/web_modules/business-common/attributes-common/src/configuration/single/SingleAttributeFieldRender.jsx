/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import compose from 'lodash/fp/compose'
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form'
import { connect } from '@regardsoss/redux'
import { intlShape } from 'react-intl'
import { UIDomain } from '@regardsoss/domain'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { AutoCompleteTextField } from '@regardsoss/components'
import { StringComparison } from '@regardsoss/form-utils'
import messages from '../../i18n'

/**
 * Single attribute selection field render: it edits a simple string, showing to user the attribute label. But it publishes,
 * when it is available, the attribute jsonPath
 *
 * @author Raphaël Mechali
 */
export class SingleAttributeFieldRender extends React.Component {
  static propTypes = {
    attributeModels: DataManagementShapes.AttributeModelArray.isRequired,
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
    meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
    label: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    // From mapStateToProps
    i18n: PropTypes.string, // automatically add by REGARDS connect method
  }

  static defaultProps = {
    i18n: UIDomain.LOCALES_ENUM.en,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Name of properties to not report onto the autocomplete field */
  static NON_REPORTED_PROPERTIES = [
    'attributeModels',
    'input',
    'meta',
    'label',
    'i18n',
    'dispatch',
  ]

  /**
   * Filters attributes models on filterText and converts them into auto complete fields selectable items
   * @param {*} filterText filter text
   * @param {*} attributeModels attribute models
   * @return [{*}] auto complete field items for current text
   */
  static filterAndConvertAttributes(filterText = '', attributeModels) {
    const lowerInputText = filterText.toLowerCase()
    return attributeModels
      .reduce((acc, { content: { jsonPath } }) => jsonPath.toLowerCase().includes(lowerInputText)
        ? [...acc, {
          id: jsonPath,
          text: jsonPath,
          value: jsonPath,
        }] : acc, [])
      .sort(({ text: t1 }, { text: t2 }) => StringComparison.compare(t1, t2))
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const newState = {}
    newState.fieldProperties = omit(newProps, SingleAttributeFieldRender.NON_REPORTED_PROPERTIES)
    this.setState(newState)
  }

  /**
   * User entered text in field (not to be committed yet)
   * @param text current text
   */
  onUpdateInput = (text) => {
    const { input: { onChange } } = this.props
    onChange(text)
  }

  /**
   * User selected an attribute
   */
  onAttributeSelected = (id, isInList) => {
    const { input: { onChange } } = this.props
    onChange(id)
  }

  render() {
    const {
      attributeModels, input: { value }, meta: { invalid, error }, label,
    } = this.props
    const { fieldProperties } = this.state
    const { intl } = this.props
    return (
      <AutoCompleteTextField
        name="attributeSelector"
        currentHintText={value}
        currentHints={SingleAttributeFieldRender.filterAndConvertAttributes(value, attributeModels)}
        isInError={invalid}
        errorMessage={invalid && error ? intl.formatMessage({ id: error }) : undefined}
        onUpdateInput={this.onUpdateInput}
        onFilterSelected={this.onAttributeSelected}
        floatingLabelText={label}
        {...fieldProperties}
      />
    )
  }
}

// as it may be consumed externally, export component with context and binding locale
export default compose(connect(), withI18n(messages, true))(SingleAttributeFieldRender)
