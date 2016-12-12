import { map } from 'lodash'
import { FormattedDate, FormattedTime } from 'react-intl'


/**
 * React component to display the language selector widget
 */
class FormattedDateComponent extends React.Component {
  static propTypes = {
    value: React.PropTypes.shape({
      date: React.PropTypes.shape({
        day: React.PropTypes.number,
        month: React.PropTypes.number,
        year: React.PropTypes.number,
      }),
      time: React.PropTypes.shape({
        hour: React.PropTypes.number,
        minute: React.PropTypes.number,
        nano: React.PropTypes.number,
        second: React.PropTypes.number,
      }),
    }).isRequired,
  }

  render() {
    const { date: { day, month, year }, time: { hour, minute, nano, second } } = this.props.value
    const dateInMs = new Date(year, month - 1, day, hour, minute, second, 0)
    return (
      <span>
        <FormattedDate
          value={dateInMs}
          year="numeric"
          month="long"
          day="2-digit"
        /> <FormattedTime
          value={dateInMs}
        />
      </span>
    )
  }
}
export default FormattedDateComponent
