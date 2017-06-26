import { FragmentContent } from './Fragment'

const AttributeModelContent = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
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

const AttributeModelArray = PropTypes.arrayOf(AttributeModel)

export default {
  AttributeModelContent,
  AttributeModel,
  AttributeModelList,
  AttributeModelArray,
}
