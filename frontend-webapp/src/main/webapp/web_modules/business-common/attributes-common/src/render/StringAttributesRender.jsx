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
    const attributes = map(this.props.attributes, (attribute) => {
      if (attribute) {
        return String(attribute)
      }
      return null
    })
    return (
      <span title={attributes.join(' ')}>
        {map(attributes, (attribute, key) => <span key={key}>{attribute}</span>)}
      </span>
    )
  }

}

export default StringAttributesRender
