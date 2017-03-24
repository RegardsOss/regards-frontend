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
      return (<div>
        {map(this.props.attributes, (attribute, key) => {
          if (attribute && attribute.lowerBound && attribute.upperBound) {
            return (<div key={key}>
              <FormattedDate value={attribute.lowerBound} />
              {' '}
              <FormattedTime value={attribute.lowerBound} />
              {'-'}
              <FormattedDate value={attribute.upperBound} />
              {' '}
              <FormattedTime value={attribute.upperBound} />
            </div>
            )
          }
          return null
        })}
      </div>)
    } catch (e) {
      console.log('Invalide cell content', e)
    }
    return null
  }

}

export default DateRangeAttributeCell
