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
      <div>
        {map(this.props.attributes, (attribute, key) => {
          if (attribute) {
            return (<div key={key}>{String(attribute)}</div>)
          }
          return null
        })}
      </div>
    )
  }

}

export default DefaultCell
