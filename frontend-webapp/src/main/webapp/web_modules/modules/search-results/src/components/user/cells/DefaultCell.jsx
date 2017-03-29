/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import { themeContextType } from '@regardsoss/theme'

/**
 * Component to display default attribute in search results
 *
 * @author Sébastien binda
 */
class DefaultCell extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    attributes: React.PropTypes.object,
  }

  static contextTypes = {
    ...themeContextType,
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

export default DefaultCell
