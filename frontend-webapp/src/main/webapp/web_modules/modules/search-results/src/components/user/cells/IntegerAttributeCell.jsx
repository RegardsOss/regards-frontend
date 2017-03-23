/**
 * LICENSE_PLACEHOLDER
 **/
import forEach from 'lodash/forEach'

/**
 * Component to display integer attribute in search results
 *
 * @author Sébastien binda
 */
class IntegerAttributeCell extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    attributes: React.PropTypes.object,
  }

  render() {
    const results = []
    forEach(this.props.attributes, (attribute, key) => results.push(<div key={key}>{attribute}</div>))
    return (
      <div>
        {results}
      </div>
    )
  }

}

export default IntegerAttributeCell
