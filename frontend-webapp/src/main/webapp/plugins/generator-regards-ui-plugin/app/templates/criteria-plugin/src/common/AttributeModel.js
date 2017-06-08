import Fragment from './Fragment'

const AttributeModel = React.PropTypes.shape({
  id: React.PropTypes.number,
  name: React.PropTypes.string,
  description: React.PropTypes.string,
  defaultValue: React.PropTypes.string,
  type: React.PropTypes.string,
  unit: React.PropTypes.string,
  precision: React.PropTypes.number,
  arraysize: React.PropTypes.number,
  fragment: Fragment,
  queryable: React.PropTypes.bool,
  facetable: React.PropTypes.bool,
  alterable: React.PropTypes.bool,
  optional: React.PropTypes.bool,
  group: React.PropTypes.string,
})

/**
 * Function to retrieve the fullyQualified name of an attribute.
 * @param attribute
 * @returns {string}
 */
const getAttributeName = (attribute) => {
  if (!attribute.fragment || !attribute.fragment.name || attribute.fragment.name ==='default'){
    return attribute.name
  }
  return `${attribute.fragment.name}.${attribute.name}`
}

export {
  AttributeModel,
  getAttributeName,
}
