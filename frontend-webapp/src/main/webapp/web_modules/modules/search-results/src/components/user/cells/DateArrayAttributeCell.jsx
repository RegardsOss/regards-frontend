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
    return (<div>
      {map(this.props.attributes, (attribute, key) => {
        if (attribute) {
          return (<div key={key}>
            {map(attribute, (date, key2) => (
              <div key={key2}>
                <FormattedDate value={date} />
                {' '}
                <FormattedTime value={date} />
              </div>
                    ),
                )}
          </div>
          )
        }
        return null
      })}
    </div>
    )
  }

}

export default DateArrayAttributeCell
