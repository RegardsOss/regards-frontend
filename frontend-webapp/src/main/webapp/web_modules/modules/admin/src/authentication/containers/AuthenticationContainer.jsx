import { connect } from 'react-redux'
import { I18nProvider } from '@regardsoss/i18n'
import { fetchAuthenticate } from '@regardsoss/authentication'
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
  }

  showResults = (values) => {
    this.props.fetchAuthenticate(values.username, values.password)
  }

  render() {
    return (
      <I18nProvider messageDir="modules/admin/src/authentication/i18n">
        <LoginComponent
          onLogin={this.showResults}
          errorMessage={this.props.errorMessage}
        />
      </I18nProvider>
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
