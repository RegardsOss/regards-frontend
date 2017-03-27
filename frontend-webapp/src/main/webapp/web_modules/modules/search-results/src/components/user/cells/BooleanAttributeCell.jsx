/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'

/**
 * Component to display Boolean attribute in search results
 *
 * @author Sébastien binda
 */
class BooleanAttributeCell extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    attributes: React.PropTypes.object,
  }

  render() {
    return (
      <span>
        {map(this.props.attributes, (attribute, key) => {
          if (typeof attribute === 'boolean') {
            return (<span key={key}>{String(attribute)}</span>)
          }
          return null
        })}
      </span>
    )
  }

}


export default BooleanAttributeCell
