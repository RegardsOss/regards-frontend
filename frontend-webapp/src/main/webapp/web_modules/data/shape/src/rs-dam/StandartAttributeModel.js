/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * These attributes are already linked to the model without configuration
 */
const StandartAttributeModelContent = PropTypes.shape({
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fragment: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
})
const StandartAttributeModel = PropTypes.shape({
  content: StandartAttributeModelContent,
})

export default { StandartAttributeModelContent, StandartAttributeModel }
