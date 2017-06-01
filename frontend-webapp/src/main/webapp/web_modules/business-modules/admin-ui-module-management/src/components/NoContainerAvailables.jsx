/**
 * LICENSE_PLACEHOLDER
 **/
import { FormattedMessage } from 'react-intl'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardTitle, CardText } from 'material-ui/Card'

/**
 * React component to display an information message thaht no layout containers are available for modules configuration.
 * @author Sébastien Binda
 */
class NoContainerAvailables extends React.PureComponent {

  static propTypes = {
    goToLayoutConfiguration: PropTypes.func.isRequired,
  }

  render() {
    const style = {
      display: 'flex',
      flexDirection: 'column',
    }
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id={'module.no.container.available.title'} />}
        />
        <CardText
          style={style}
        >
          <FormattedMessage id={'module.no.container.available'} />
          <RaisedButton
            label={<FormattedMessage id={'module.no.container.available.configure.layout'} />}
            primary
            onTouchTap={this.props.goToLayoutConfiguration}
            style={{
              marginTop: 20,
            }}
          />
        </CardText>
      </Card>
    )
  }

}

export default NoContainerAvailables
