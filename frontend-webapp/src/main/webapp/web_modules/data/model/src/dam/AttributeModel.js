import { InternalFragment } from './Fragment'

const AttributeModel = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    unit: React.PropTypes.string,
    precision: React.PropTypes.number,
    arraysize: React.PropTypes.number,
    fragment: InternalFragment,
    queryable: React.PropTypes.bool,
    facetable: React.PropTypes.bool,
    alterable: React.PropTypes.bool,
    optional: React.PropTypes.bool,
    group: React.PropTypes.string,
  }),
})

export default AttributeModel
