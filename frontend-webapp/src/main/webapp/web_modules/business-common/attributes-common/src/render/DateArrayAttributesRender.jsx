/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import { FormattedDate, FormattedTime } from 'react-intl'

/**
 * Component to display Date Array attributes group value
 *
 * @author Sébastien binda
 */
class DateArrayAttributeRender extends React.Component {

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
                  <div key={key2}>
                    <FormattedDate value={date} />
                    {' '}
                    <FormattedTime value={date} />
                  </div>
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

export default DateArrayAttributeRender
