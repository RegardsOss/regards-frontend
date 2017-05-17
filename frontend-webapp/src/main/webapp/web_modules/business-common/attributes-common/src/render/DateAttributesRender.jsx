/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import { FormattedDate, FormattedTime } from 'react-intl'

/**
 * Component to display Date attributes group value
 *
 * @author Sébastien binda
 */
class DateAttributesRender extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    attributes: PropTypes.object,
  }

  render() {
    return (
      <span>
        {map(this.props.attributes, (attribute, key) => {
          if (attribute && !isNaN((new Date(attribute)).getDate())) {
            return (
              <span key={key}>
                <FormattedDate value={attribute} />
                {' '}
                <FormattedTime value={attribute} />
              </span>
            )
          }
          return null
        })}
      </span>
    )
  }

}

export default DateAttributesRender
