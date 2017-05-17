/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import { FormattedDate, FormattedTime } from 'react-intl'

/**
 * Component to display Date range attributes group value
 *
 * @author Sébastien binda
 */
class DateRangeAttributesRender extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    attributes: PropTypes.object,
  }

  renderDate = (date) => {
    if (date && !isNaN((new Date(date)).getDate())) {
      return (
        <div>
          <FormattedDate value={date} />
          {' '}
          <FormattedTime value={date} />
        </div>
      )
    }
    return null
  }

  render() {
    try {
      return (<span>
        {map(this.props.attributes, (attribute, key) => {
          if (attribute && attribute.lowerBound && attribute.upperBound) {
            return (<span key={key}>
              {this.renderDate(attribute.lowerBound)}
              {this.renderDate(attribute.upperBound)}
            </span>
            )
          }
          return null
        })}
      </span>)
    } catch (e) {
      console.log('Invalid attribute value', e)
    }
    return null
  }

}

export default DateRangeAttributesRender
