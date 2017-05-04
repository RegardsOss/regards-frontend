/**
* LICENSE_PLACEHOLDER
**/
import { FormattedMessage } from 'react-intl'
import MenuItem from 'material-ui/MenuItem'
import { Field, RenderTextField, RenderSelectField, ErrorTypes } from '@regardsoss/form-utils'
import { Metadata } from '../model/Metadata'
import metadatav1 from '../definitions/metadatav1'

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
   */
  renderChoiceMetadataField = () => {
    const { metadata, ...fieldProperties } = this.props
    return (<Field
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
  }

  /**
   * Render fields a a text
   * @param multiline is multiline text
   */
  renderTextMetadataField = (multiline = false) => {
    const { metadata, ...fieldProperties } = this.props
    return (<Field
      name={metadata.key}
      component={RenderTextField}
      type="text"
      floatingLabelText={<FormattedMessage id={metadata.labelKey} />}
      validate={this.validateFieldValue}
      {...fieldProperties}
    />)
  }

  render() {
    const { metadata } = this.props
    const metaEditorType = metadata.editor.type
    if (metaEditorType === metadatav1.editorTypes.choice) {
      return this.renderChoiceMetadataField(metadata)
    }
    return this.renderTextMetadataField(metadata, metaEditorType === metadatav1.editorTypes.multilineText)
  }
}
export default MetadataField
