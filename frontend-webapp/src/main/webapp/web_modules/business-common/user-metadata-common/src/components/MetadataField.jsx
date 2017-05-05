/**
* LICENSE_PLACEHOLDER
**/
import { FormattedMessage } from 'react-intl'
import MenuItem from 'material-ui/MenuItem'
import { Field, RenderTextField, RenderSelectField, ErrorTypes } from '@regardsoss/form-utils'
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
  }

  validateFieldValue = (fieldValue) => {
    const { metadata: { mandatory } } = this.props
    return mandatory && !fieldValue ? ErrorTypes.REQUIRED : undefined
  }

  /**
   * Renders field as a choice
   * @param metadata metadata model
   * @param fieldProperties other field properties
   */
  renderChoiceMetadataField = (metadata, fieldProperties) => (
    <Field
      name={metadata.key}
      component={RenderSelectField}
      floatingLabelText={<FormattedMessage id={metadata.labelKey} />}
      {...fieldProperties}
      validate={this.validateFieldValue}
    >
      {metadata.editor.choices.map(({ key, labelKey }) => (
        <MenuItem
          key={key}
          value={key}
          primaryText={<FormattedMessage id={labelKey} />}
        />
      ))}
    </Field>)

  /**
   * Render fields a a text
   * @param metadata metadata model
   * @param fieldProperties other field properties
   * @param multiline is multiline text
   */
  renderTextMetadataField = (metadata, fieldProperties, multiline = false) => (
    <Field
      name={metadata.key}
      component={RenderTextField}
      type="text"
      floatingLabelText={<FormattedMessage id={metadata.labelKey} />}
      validate={this.validateFieldValue}
      multiLine={multiline}
      rows={multiline ? DEFAULT_MULTILINES_COUNT : 1}
      {...fieldProperties}
    />)

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
