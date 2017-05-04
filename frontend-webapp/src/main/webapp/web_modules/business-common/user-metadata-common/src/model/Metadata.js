import metadatav1 from '../definitions/metadatav1'

/**
 * Metadata shape definitions
 */

export const Editor = React.PropTypes.oneOfType([
  // text editor
  React.PropTypes.shape({
    type: React.PropTypes.oneOf([metadatav1.editorTypes.text]).isRequired,
  }),
  // multiline text editor
  React.PropTypes.shape({
    type: React.PropTypes.oneOf([metadatav1.editorTypes.multilineText]).isRequired,
  }),
  // choice editor
  React.PropTypes.shape({
    type: React.PropTypes.oneOf([metadatav1.editorTypes.choice]).isRequired,
    choices: React.PropTypes.arrayOf(React.PropTypes.shape({
      key: React.PropTypes.string.isRequired,
      labelKey: React.PropTypes.string.isRequired,
    })).isRequired,
  }),
])

export const Metadata = React.PropTypes.shape({
  key: React.PropTypes.string.isRequired,
  labelKey: React.PropTypes.string.isRequired,
  mandatory: React.PropTypes.bool.isRequired,
  onlyAtRegistration: React.PropTypes.bool.isRequired,
  currentValue: React.PropTypes.string, // current value if any
  editor: Editor,
})

export const MetadataList = React.PropTypes.arrayOf(Metadata)
