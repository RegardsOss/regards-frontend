/**
* LICENSE_PLACEHOLDER
**/
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
import { connect } from '@regardsoss/redux'
import { CatalogShapes } from '@regardsoss/shape'
import { authenticationSelectors } from '../../../clients/AuthenticationClient'
import DocumentFilesComponent from '../../../components/description/file/DocumentFilesComponent'

/**
* Document files container
*/
export class DocumentFilesContainer extends React.Component {

  static mapStateToProps = state => ({
    accessToken: authenticationSelectors.getAccessToken(state), // map the token for direct download
    scope: AuthenticationParametersSelectors.getProject(state),
    isAuthenticated: authenticationSelectors.isAuthenticated(state),
  })

  static propTypes = {
    entity: CatalogShapes.Entity,
    accessToken: PropTypes.string,
    scope: PropTypes.string,
    isAuthenticated: PropTypes.bool,
  }

  render() {
    // provide URL or local content to child (only one can be non null at a given time)
    return (
      <DocumentFilesComponent
        entity={this.props.entity}
        accessToken={this.props.accessToken}
        scope={this.props.scope}
        isAuthenticated={this.props.isAuthenticated}
      />
    )
  }
}
export default connect(DocumentFilesContainer.mapStateToProps)(DocumentFilesContainer)
