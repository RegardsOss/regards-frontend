/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'

/**
 * Component to render ranged attributes group value
 *
 * @author Sébastien binda
 */
class RangeAttributesRender extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    attributes: PropTypes.object,
  }

  render() {
    try {
      return (<span>
        {map(this.props.attributes, (attribute, key) => {
          if (attribute && attribute.lowerBound && attribute.upperBound) {
            return (<span key={key}>{String(attribute.lowerBound)} - {String(attribute.upperBound)}</span>)
          }
          return null
        })}
      </span>)
    } catch (e) {
      console.log('Invalid attribute value', e)
    }
    return null
  }

}

export default RangeAttributesRender
