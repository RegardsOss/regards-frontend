import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import ErrorDecorator from './ErrorDecorator'

/**
 * React component for login form in administration applicationstat
 */
class LoginComponent extends React.Component {

  static propTypes = {
    onLogin: React.PropTypes.func.isRequired,
    errorMessage: React.PropTypes.string,
  }

  /**
   * constructor
   * @param {{onLogin: function, errorMessage: string}} props
   */
  constructor(props) {
    super(props)
    /**
     * @type {{username: string, password: string, showError: boolean}} state Internal state
     */
    this.state = {
      username: '',
      password: '',
      showError: false,
    }
  }

  /**
   * On component mount
   */
  componentWillMount() {
    if (process.env.NODE_ENV === 'development') {
      console.log('DEV', 'Auto connection')
      this.props.onLogin('admin@cnes.fr', 'admin')
    }
  }

  /**
   * Handle 'Enter' key press to validate form
   * @param {KeyboardEvent} event
   */
  handleKeyPress = (event) => {
    this.setState({ showError: true })
    if (event.key === 'Enter') {
      this.props.onLogin(this.state.username, this.state.password)
    }
  }

  /**
   * Handle input change
   * @param {InputEvent} event
   */
  handleUserInputChange = (event) => {
    this.setState({
      username: event.target.value,
      showError: false,
    })
  }

  /**
   * Handle input change
   * @param {InputEvent} event
   */
  handlePasswordInputChange = (event) => {
    this.setState({
      password: event.target.value,
      showError: false,
    })
  }

  /**
   * Handle mouse press on the connection button
   * @param {MouseEvent} event
   */
  handleButtonPress = (event) => {
    this.props.onLogin(this.state.username, this.state.password)
    this.setState({ showError: true })
  }

  /**
   * Render function
   * @returns {React.Component} component
   */
  render() {
    let errorMessage = null
    if (this.state.showError && this.props.errorMessage && this.props.errorMessage !== '') {
      errorMessage = <ErrorDecorator><FormattedMessage id={this.props.errorMessage} /></ErrorDecorator>
    }

    return (
      <Card>
        <CardTitle title={<FormattedMessage id="login.title" />} />
        <CardText>
          <div onKeyDown={this.handleKeyPress}>
            {errorMessage}
            <TextField
              type="text"
              floatingLabelText={<FormattedMessage id="login.username" />}
              fullWidth
              onChange={this.handleUserInputChange}
            />
            <TextField
              floatingLabelText={<FormattedMessage id="login.password" />}
              type="password"
              fullWidth
              onChange={this.handlePasswordInputChange}
            />
          </div>
        </CardText>
        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
          <RaisedButton
            label={<FormattedMessage id="login.button" />}
            primary
            onClick={this.handleButtonPress}
          />
        </CardActions>
      </Card>
    )
  }
}
export default LoginComponent

