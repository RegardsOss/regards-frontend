/**
 * LICENSE_PLACEHOLDER
 **/
import forEach from 'lodash/forEach'

/**
 * Component to display integer attributes group value
 *
 * @author Sébastien binda
 */
class IntegerAttributesRender extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    attributes: PropTypes.object,
  }

  render() {
    const results = []
    forEach(this.props.attributes, (attribute, key) => {
      if (Number.isInteger(attribute)) {
        results.push(<span key={key}>{attribute}</span>)
      }
    })
    return (
      <span>
        {results}
      </span>
    )
  }

}

export default IntegerAttributesRender
