/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardText } from 'material-ui/Card'
import Icon from 'material-ui/svg-icons/content/report'

class ErrorCardComponent extends React.Component {

  static propTypes = {
    message: PropTypes.oneOf([PropTypes.string,PropTypes.func]).isRequired,
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Card
          style={{
            padding: 5,
          }}
        >
          <CardText >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Icon
                style={{
                  color: 'Red',
                  width: 30,
                  height: 30,
                  marginRight: 20,
                }}
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
