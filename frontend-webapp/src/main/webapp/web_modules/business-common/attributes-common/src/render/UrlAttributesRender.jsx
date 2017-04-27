/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import { LinkComponent } from '@regardsoss/components'

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
            return (<LinkComponent
              key={key}
              target="_blank"
              rel="noopener noreferrer"
              link={String(attribute)}
            />)
          }
          return null
        })}
      </span>
    )
  }

}

export default UrlAttributesRender
