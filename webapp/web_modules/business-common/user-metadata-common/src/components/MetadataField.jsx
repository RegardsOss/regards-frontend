/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import sortBy from 'lodash/sortBy'
import MenuItem from 'material-ui/MenuItem'
import { i18nContextType } from '@regardsoss/i18n'
import {
  Field, RenderTextField, RenderSelectField, ErrorTypes, StringComparison, ValidationHelpers,
} from '@regardsoss/form-utils'
import { Metadata } from '../model/Metadata'
import metadatav1 from '../definitions/metadatav1'

const DEFAULT_MULTILINES_COUNT = 3

/**
* Form field to edit a metadata model.
* Note: when importing this field, you should make sure the i18n keys of this module are available
*/
class MetadataField extends React.Component {
  static propTypes = {
    metadata: Metadata,
    disabled: PropTypes.bool,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  UNSAFE_componentWillMount() {
    this.onPropertiesChanged(this.props)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onPropertiesChanged(nextProps)
  }

  onPropertiesChanged = (properties) => {
    // we compute here the transient options list, as we need to use them sorted by I18N label at runtime
    let options = []
    if (properties.metadata) {
      const { editor } = properties.metadata
      if (editor.type === metadatav1.editorTypes.choice) {
        const { intl: { formatMessage } } = this.context
        // convert (store value for sorting)
        options = sortBy(editor.choices.map(({ key, labelKey }) => {
          const message = formatMessage({ id: labelKey })
          return {
            key,
            message,
            sortString: StringComparison.getComparableLabel(message),
          }
        }), ['sortString'])
      }
    }
    this.setState({ options })
  }

  showStarIfFieldRequired = () => {
    const { metadata: { mandatory } } = this.props
    return mandatory ? '(*)' : ''
  }

  validateFieldValue = (fieldValue) => {
    const { metadata: { mandatory } } = this.props
    return mandatory && !fieldValue ? ErrorTypes.REQUIRED : ValidationHelpers.validStringSize(0, 255)(fieldValue)
  }

  /**
   * Renders field as a choice
   * @param metadata metadata model
   * @param fieldProperties other field properties
   */
  renderChoiceMetadataField = (metadata, fieldProperties) => {
    const { intl: { formatMessage } } = this.context
    const { options } = this.state
    const { disabled } = this.props
    return (
      <Field
        name={metadata.key}
        component={RenderSelectField}
        floatingLabelText={`${formatMessage({ id: metadata.labelKey })} ${this.showStarIfFieldRequired()}`}
        {...fieldProperties}
        validate={this.validateFieldValue}
        disabled={disabled}
      >
        {options.map(({ key, message }) => (
          <MenuItem
            key={key}
            value={key}
            primaryText={message}
          />
        ))}
      </Field>)
  }

  /**
   * Render fields a a text
   * @param metadata metadata model
   * @param fieldProperties other field properties
   * @param multiline is multiline text
   */
  renderTextMetadataField = (metadata, fieldProperties, multiline = false) => {
    const { intl: { formatMessage } } = this.context
    const { disabled } = this.props
    return (
      <Field
        name={metadata.key}
        component={RenderTextField}
        type="text"
        floatingLabelText={`${formatMessage({ id: metadata.labelKey })} ${this.showStarIfFieldRequired()}`}
        validate={this.validateFieldValue}
        multiLine={multiline}
        disaled={disabled}
        rows={multiline ? DEFAULT_MULTILINES_COUNT : 1}
        {...fieldProperties}
      />)
  }

  render() {
    const { metadata, ...fieldProperties } = this.props
    const metaEditorType = metadata.editor.type
    if (metaEditorType === metadatav1.editorTypes.choice) {
      return this.renderChoiceMetadataField(metadata, fieldProperties)
    }
    return this.renderTextMetadataField(metadata, fieldProperties, metaEditorType === metadatav1.editorTypes.multilineText)
  }
}
export default MetadataField
