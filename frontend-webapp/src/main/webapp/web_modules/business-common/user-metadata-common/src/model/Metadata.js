import metadatav1 from '../definitions/metadatav1'

/**
 * Metadata shape definitions
 */

export const Editor = PropTypes.oneOfType([
  // text editor
  PropTypes.shape({
    type: PropTypes.oneOf([metadatav1.editorTypes.text]).isRequired,
  }),
  // multiline text editor
  PropTypes.shape({
    type: PropTypes.oneOf([metadatav1.editorTypes.multilineText]).isRequired,
  }),
  // choice editor
  PropTypes.shape({
    type: PropTypes.oneOf([metadatav1.editorTypes.choice]).isRequired,
    choices: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      labelKey: PropTypes.string.isRequired,
    })).isRequired,
  }),
])

export const Metadata = PropTypes.shape({
  key: PropTypes.string.isRequired,
  labelKey: PropTypes.string.isRequired,
  mandatory: PropTypes.bool.isRequired,
  onlyAtRegistration: PropTypes.bool.isRequired,
  currentValue: PropTypes.string, // current value if any
  editor: Editor,
})

export const MetadataList = PropTypes.arrayOf(Metadata)
