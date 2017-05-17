import { InternalFragment } from './Fragment'

const AttributeModel = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    defaultValue: PropTypes.string,
    type: PropTypes.string.isRequired,
    unit: PropTypes.string,
    precision: PropTypes.number,
    arraysize: PropTypes.number,
    fragment: InternalFragment,
    queryable: PropTypes.bool,
    facetable: PropTypes.bool,
    alterable: PropTypes.bool,
    optional: PropTypes.bool,
    group: PropTypes.string,
  }),
})

export default AttributeModel
