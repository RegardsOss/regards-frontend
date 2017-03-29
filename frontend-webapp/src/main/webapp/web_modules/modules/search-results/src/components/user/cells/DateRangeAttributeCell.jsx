/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import { FormattedDate, FormattedTime } from 'react-intl'

/**
 * Component to display Date range attribute in search results
 *
 * @author Sébastien binda
 */
class DateRangeAttributeCell extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    attributes: React.PropTypes.object,
  }

  renderDate = (date) => {
    if (date && !isNaN((new Date(date)).getDate())) {
      return (
        <span>
          <FormattedDate value={date} />
          {
            ' '
          }
          <FormattedTime value={date} />
        </span>
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
              {'-'}
              {this.renderDate(attribute.upperBound)}
            </span>
            )
          }
          return null
        })}
      </span>)
    } catch (e) {
      console.log('Invalide cell content', e)
    }
    return null
  }

}

export default DateRangeAttributeCell
