/**
* LICENSE_PLACEHOLDER
**/
import reduce from 'lodash/reduce'
import sortBy from 'lodash/sortBy'
import MenuItem from 'material-ui/MenuItem'
import { i18nContextType } from '@regardsoss/i18n'
import { Field, RenderTextField, RenderSelectField, ErrorTypes } from '@regardsoss/form-utils'
import { Metadata } from '../model/Metadata'
import metadatav1 from '../definitions/metadatav1'

const DEFAULT_MULTILINES_COUNT = 3


/**
* Form field to edit a metadata model.
* Note: when importing this field, you should make sure the i18n keys of this module are available
*/
class MetadataField extends React.Component {

  static charToAccentMap = {
    a: ['à', 'á', 'â', 'ã', 'ä', 'å', 'æ'],
    c: ['ç'],
    e: ['è', 'é', 'ê', 'ë', 'æ'],
    i: ['ì', 'í', 'î', 'ï'],
    n: ['ñ'],
    o: ['ò', 'ó', 'ô', 'õ', 'ö', 'ø'],
    s: ['ß'],
    u: ['ù', 'ú', 'û', 'ü'],
    y: ['ÿ'],
  }

  /**
   * Returns a comparable string from string as parameter (removes accents and case)
   * @param {*} str string
   * @return comparable string
   */
  static getComparableLabel(str) {
    return reduce(MetadataField.charToAccentMap,
      (acc, accents, char) =>
        accents.reduce((innerAcc, accent) => innerAcc.split(accent).join(char), acc)
      , str.toLowerCase())
  }

  static propTypes = {
    metadata: Metadata,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  componentWillMount = () => {
    this.onPropertiesChange(this.props)
  }

  componentWillReceiveProps = (nextProps) => {
    this.onPropertiesChange(nextProps)
  }

  onPropertiesChange = (properties) => {
    // we compute here the transient options list, as we need to use them sorted by I18N label at runtime
    let options = []
    if (properties.metadata) {
      const editor = properties.metadata.editor
      if (editor.type === metadatav1.editorTypes.choice) {
        const { intl: { formatMessage } } = this.context
        // convert (store value for sorting)
        options = sortBy(editor.choices.map(({ key, labelKey }) => {
          const message = formatMessage({ id: labelKey })
          return {
            key,
            message,
            sortString: MetadataField.getComparableLabel(message),
          }
        }), ['sortString'])
      }
    }
    this.setState({ options })
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
  renderChoiceMetadataField = (metadata, fieldProperties) => {
    const { intl: { formatMessage } } = this.context
    const { options } = this.state
    return (
      <Field
        name={metadata.key}
        component={RenderSelectField}
        floatingLabelText={formatMessage({ id: metadata.labelKey })}
        {...fieldProperties}
        validate={this.validateFieldValue}
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
    return (
      <Field
        name={metadata.key}
        component={RenderTextField}
        type="text"
        floatingLabelText={formatMessage({ id: metadata.labelKey })}
        validate={this.validateFieldValue}
        multiLine={multiline}
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
