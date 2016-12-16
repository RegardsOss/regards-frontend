/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from 'react-redux'
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
    // from mapDispatchToProps
    fetchAuthenticate: React.PropTypes.func,
    errorMessage: React.PropTypes.string,
  }

  showResults = (values) => {
    this.props.fetchAuthenticate(values.username, values.password)
  }

  render() {
    return (
      <LoginComponent
        onLogin={this.showResults}
        errorMessage={this.props.errorMessage}
      />
    )
  }

}

const mapStateToProps = state => ({
  errorMessage: state.common.authentication.error,
})
const mapDispatchToProps = dispatch => ({
  fetchAuthenticate: (username, password) => dispatch(fetchAuthenticate(username, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)
