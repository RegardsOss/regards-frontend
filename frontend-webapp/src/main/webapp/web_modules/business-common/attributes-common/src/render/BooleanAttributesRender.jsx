/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import isBoolean from 'lodash/isBoolean'

/**
 * Component to display Boolean attributes group value
 *
 * @author Sébastien binda
 */
class BooleanAttributeRender extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    attributes: PropTypes.object,
  }

  render() {
    return (
      <span>
        {map(this.props.attributes, (attribute, key) => {
          if (isBoolean(attribute)) {
            return (<span key={key}>{String(attribute)}</span>)
          }
          return null
        })}
      </span>
    )
  }

}


export default BooleanAttributeRender
