/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'

/**
 * Component to Default ranged attributes in search results
 *
 * @author Sébastien binda
 */
class RangeAttributeCell extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    attributes: React.PropTypes.object,
  }

  render() {
    try {
      return (<div>
        {map(this.props.attributes, (attribute, key) => {
          if (attribute) {
            return (<div key={key}>{String(attribute.lowerBound)} - {String(attribute.upperBound)}</div>)
          }
          return null
        })}
      </div>)
    } catch (e) {
      console.log('Invalide cell content', e)
    }
    return null
  }

}

export default RangeAttributeCell
