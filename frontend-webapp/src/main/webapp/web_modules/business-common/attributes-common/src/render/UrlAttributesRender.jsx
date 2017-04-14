/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'

/**
 * Component to display url link attributes group value
 *
 * @author Sébastien binda
 */
class UrlAttributesRender extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    attributes: React.PropTypes.object,
  }

  render() {
    return (
      <span>
        {map(this.props.attributes, (attribute, key) => {
          if (attribute) {
            return (<a key={key} target="_blank" rel="noopener noreferrer" href={String(attribute)}>{String(attribute)}</a>)
          }
          return null
        })}
      </span>
    )
  }

}

export default UrlAttributesRender
