/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import { FormattedDate, FormattedTime } from 'react-intl'

/**
 * Component to display Date attribute in search results
 *
 * @author Sébastien binda
 */
class DefaultCell extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    attributes: React.PropTypes.object,
  }

  render() {
    return (
      <div>
        {map(this.props.attributes, (attribute, key) => {
          if (attribute) {
            return (
              <div key={key}>
                <FormattedDate value={attribute} />
                {' '}
                <FormattedTime value={attribute} />
              </div>
            )
          }
          return null
        })}
      </div>
    )
  }

}

export default DefaultCell
