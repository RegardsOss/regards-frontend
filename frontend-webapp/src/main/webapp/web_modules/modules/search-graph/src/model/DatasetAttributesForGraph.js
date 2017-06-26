const commonAttributeForGraph = {
  // attribute label
  label: PropTypes.string.isRequired,
  // the render component, see attributes-common/render (expects a list of attribute values)
  render: PropTypes.func.isRequired,
}

// a dataset attribute definition for graph
export const DatasetAttributeForGraph = PropTypes.shape({
  ...commonAttributeForGraph,
  // access path to attribute value in entity
  attributePath: PropTypes.string.isRequired,
})

// array of dataset attributes definitions for graph
export const DatasetAttributesArrayForGraph = PropTypes.arrayOf(DatasetAttributeForGraph)

/**
 * A resolved dataset attribute   (holds value from dataset)
 */
export const ResolvedDatasetAttribute = PropTypes.shape({
  ...commonAttributeForGraph,
  renderKey: PropTypes.string.isRequired, // render key (for render optimizations)
  renderValue: PropTypes.object, // the attribute value on an object, prepared for to be rendered, null or undefined allowed
})

/**
 * A resolved dataset attributes array (holds corresponding values)
 */
export const ResolvedDatasetAttributesArray = PropTypes.arrayOf(ResolvedDatasetAttribute)
