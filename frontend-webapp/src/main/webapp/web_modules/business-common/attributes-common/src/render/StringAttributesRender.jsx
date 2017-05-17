/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'

/**
 * Component to display string attributes group value
 *
 * @author Sébastien binda
 */
class StringAttributesRender extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    attributes: PropTypes.object,
  }

  render() {
    return (
      <span>
        {map(this.props.attributes, (attribute, key) => {
          if (attribute) {
            return (<span key={key}>{String(attribute)}</span>)
          }
          return null
        })}
      </span>
    )
  }

}

export default StringAttributesRender
