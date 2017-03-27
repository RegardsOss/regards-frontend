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

  render() {
    try {
      return (<span>
        {map(this.props.attributes, (attribute, key) => {
          if (attribute && attribute.lowerBound && attribute.upperBound) {
            return (<span key={key}>
              <FormattedDate value={attribute.lowerBound} />
              {' '}
              <FormattedTime value={attribute.lowerBound} />
              {'-'}
              <FormattedDate value={attribute.upperBound} />
              {' '}
              <FormattedTime value={attribute.upperBound} />
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
