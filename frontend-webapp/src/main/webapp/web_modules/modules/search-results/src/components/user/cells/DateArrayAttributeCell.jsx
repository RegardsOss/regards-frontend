/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import { FormattedDate, FormattedTime } from 'react-intl'

/**
 * Component to display Date Array attribute in search results
 *
 * @author Sébastien binda
 */
class DateArrayAttributeCell extends React.Component {

  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    attributes: React.PropTypes.object,
  }

  render() {
    return (<span>
      {map(this.props.attributes, (attribute, key) => {
        if (attribute && Array.isArray(attribute)) {
          return (<div key={key}>
            {map(attribute, (date, key2) => {
              const dateWrapper = new Date(date)
              if (!isNaN(dateWrapper.getDate())) {
                return (
                  <span key={key2}>
                    <FormattedDate value={date} />
                    {' '}
                    <FormattedTime value={date} />
                  </span>
                )
              }
              return null
            },
              )}
          </div>
          )
        }
        return null
      })}
    </span>
    )
  }

}

export default DateArrayAttributeCell
