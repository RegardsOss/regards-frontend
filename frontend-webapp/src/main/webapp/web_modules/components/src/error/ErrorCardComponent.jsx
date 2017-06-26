/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardText } from 'material-ui/Card'
import Icon from 'material-ui/svg-icons/content/report'

class ErrorCardComponent extends React.Component {

  static propTypes = {
    message: PropTypes.node,
  }

  static defaultProps = {
    message: <span>Oops! Error occured when retrieving the content.</span>,
  }

  render() {
    const cardStyle = { padding: 5 }
    const iconStyle = {
      color: 'Red',
      width: 30,
      height: 30,
      marginRight: 20,
    }
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Card style={cardStyle}>
          <CardText >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Icon
                style={iconStyle}
              />
              {this.props.message}
            </div>
          </CardText>
        </Card>
      </div>
    )
  }

}

export default ErrorCardComponent
