/** @module AdminAuthentication */
import * as React from "react"
import { FormattedMessage } from "react-intl"
import { Card, CardActions, CardTitle, CardText } from "material-ui/Card"
import TextField from "material-ui/TextField"
import RaisedButton from "material-ui/RaisedButton"
import ErrorDecorator from "./ErrorDecorator"

export interface LoginProps {
  onLogin: (username: string, password: string) => void,
  errorMessage: string
}

/**
 * React component for login form in administration application
 * @prop {Function} onLogin Callback for on login action
 * @prop {String} errorMessage Error message to display
 */
class LoginComponent extends React.Component<LoginProps, any> {
  constructor (props: LoginProps) {
    super(props)
    this.state = {
      username: "",
      password: "",
      showError: false
    }
  }

  componentWillMount (): any {
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleUserInputChange = this.handleUserInputChange.bind(this)
    this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this)
    this.handleButtonPress = this.handleButtonPress.bind(this)
    if (process.env.NODE_ENV === 'development') {
      console.log("DEV", "Auto connection")
      this.props.onLogin("admin", "admin")
    }
  }

  /**
   * handleKeyPress - Handle 'Enter' key press to validate form
   *
   * @param  {type} event: KeyboardEvent
   * @return {type}
   */
  handleKeyPress (event: React.KeyboardEvent): any {
    this.setState({"showError": true})
    if (event.key === 'Enter') {
      this.props.onLogin(this.state.username, this.state.password)
    }
  }

  handleUserInputChange (event: React.FormEvent): any {
    this.setState({
      "username": (event.target as any).value,
      "showError": false
    })
  }

  handlePasswordInputChange (event: React.FormEvent): any {
    this.setState({
      "password": (event.target as any).value,
      "showError": false
    })
  }

  handleButtonPress (event: React.FormEvent): any {
    this.props.onLogin(this.state.username, this.state.password)
    this.setState({"showError": true})
  }

  render (): JSX.Element {
    let errorMessage: any = null
    if (this.state.showError && this.props.errorMessage && this.props.errorMessage !== '') {
      errorMessage = <ErrorDecorator><FormattedMessage id={this.props.errorMessage}/></ErrorDecorator>
    }

    return (
      <Card>
        <CardTitle title={<FormattedMessage id="login.title"/>}/>
        <CardText>
          <div onKeyDown={this.handleKeyPress}>
            {errorMessage}
            <TextField
              type="text"
              floatingLabelText={<FormattedMessage id="login.username"/>}
              fullWidth={true}
              onChange={this.handleUserInputChange}
            />
            <TextField
              floatingLabelText={<FormattedMessage id="login.password"/>}
              type="password"
              fullWidth={true}
              onChange={this.handlePasswordInputChange}
            />
          </div>
        </CardText>
        <CardActions style={{display: "flex",justifyContent: "center"}}>
          <RaisedButton
            label={<FormattedMessage id="login.button"/>}
            primary={true}
            onClick={this.handleButtonPress}
          />
        </CardActions>
      </Card>
    )
  }
}

export default LoginComponent
