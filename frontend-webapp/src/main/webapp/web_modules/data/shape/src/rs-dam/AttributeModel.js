import { FragmentContent } from './Fragment'

const AttributeModelContent = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  // only provided when fetching attrModel list
  jsonPath: PropTypes.string,
  description: PropTypes.string,
  defaultValue: PropTypes.string,
  type: PropTypes.string.isRequired,
  unit: PropTypes.string,
  precision: PropTypes.number,
  arraysize: PropTypes.number,
  fragment: FragmentContent,
  queryable: PropTypes.bool,
  facetable: PropTypes.bool,
  alterable: PropTypes.bool,
  optional: PropTypes.bool,
  group: PropTypes.string,
})
const AttributeModel = PropTypes.shape({
  content: AttributeModelContent,
})
const AttributeModelList = PropTypes.objectOf(AttributeModel)

export default { AttributeModelContent, AttributeModel, AttributeModelList }
