const commonAttributeForGraph = {
  // attribute label
  label: React.PropTypes.string.isRequired,
  // the render component, see attributes-common/render (expects a list of attribute values)
  render: React.PropTypes.func.isRequired,
}

// a dataset attribute definition for graph
export const DatasetAttributeForGraph = React.PropTypes.shape({
  ...commonAttributeForGraph,
  // access path to attribute value in entity
  attributePath: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
})

// array of dataset attributes definitions for graph
export const DatasetAttributesArrayForGraph = React.PropTypes.arrayOf(DatasetAttributeForGraph)

/**
 * A resolved dataset attribute   (holds value from dataset)
 */
export const ResolvedDatasetAttribute = React.PropTypes.shape({
  ...commonAttributeForGraph,
  renderKey: React.PropTypes.string.isRequired, // render key (for render optimizations)
  renderValue: React.PropTypes.object, // the attribute value on an object, prepared for to be rendered, null or undefined allowed
})

/**
 * A resolved dataset attributes array (holds corresponding values)
 */
export const ResolvedDatasetAttributesArray = React.PropTypes.arrayOf(ResolvedDatasetAttribute)
