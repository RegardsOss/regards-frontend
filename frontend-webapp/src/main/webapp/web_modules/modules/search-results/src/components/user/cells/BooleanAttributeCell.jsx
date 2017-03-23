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
      <div>
        {map(this.props.attributes, (attribute, key) => {
          if (typeof attribute === 'boolean') {
            return (<div key={key}>{String(attribute)}</div>)
          }
          return null
        })}
      </div>
    )
  }

}

export default BooleanAttributeCell
