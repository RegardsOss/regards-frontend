/**
 * LICENSE_PLACEHOLDER
 **/
import connect from '@regardsoss/redux'
import { fetchAuthenticate } from '@regardsoss/authentication-manager'
import LoginComponent from '../components/LoginComponent'

/*
 export interface AuthenticationProps {
 // From mapStateToProps
 theme?: any,
 errorMessage?: string
 // From mapDispatchToProps
 fetchAuthenticate?: (username: string, password: string) => void,
 fetchEndpoints?: () => void
 }*/

export class Authentication extends React.Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    fetchAuthenticate: React.PropTypes.func,
    errorMessage: React.PropTypes.string,
    cancelButton: React.PropTypes.bool,
    onCancelAction: React.PropTypes.func,
    project: React.PropTypes.string.isRequired,
  }

  showResults = (values) => {
    this.props.fetchAuthenticate(values.username, values.password,this.props.project)
  }

  render() {
    return (
      <LoginComponent
        title={this.props.title}
        onLogin={this.showResults}
        errorMessage={this.props.errorMessage}
        cancelButton={this.props.cancelButton ? this.props.cancelButton : false}
        onCancelAction={this.props.onCancelAction}
      />
    )
  }

}

const mapStateToProps = state => ({
  errorMessage: state.common.authentication.error,
})
const mapDispatchToProps = dispatch => ({
  fetchAuthenticate: (username, password, scope) => dispatch(fetchAuthenticate(username, password, scope)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)
