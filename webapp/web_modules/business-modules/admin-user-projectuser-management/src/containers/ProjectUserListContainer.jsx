/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import get from 'lodash/get'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { AdminClient } from '@regardsoss/client'
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { AuthenticateShape, AuthenticationClient } from '@regardsoss/authentication-utils'
import ProjectUserListComponent from '../components/list/ProjectUserListComponent'
import { projectUserActions, projectUserSelectors } from '../clients/ProjectUserClient'
import messages from '../i18n'
import styles from '../styles'

const csvSummaryFileActions = new AdminClient.DownloadUserMetalinkFileAtions()

/**
 * ProjectUserListContainer
 * @author Théo Lasserre
 */
export class ProjectUserListContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      visualisationMode: PropTypes.string,
    }),
    // from mapStateToProps
    pageMeta: PropTypes.shape({
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    // eslint-disable-next-line react/no-unused-prop-types
    authentication: AuthenticateShape.isRequired, // used only in onPropertiesUpdated
    // from mapDispatchToProps
    fetchUsers: PropTypes.func.isRequired,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      pageMeta: projectUserSelectors.getMetaData(state),
      authentication: AuthenticationClient.authenticationSelectors.getAuthentication(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetchUsers: (pageIndex, pageSize, pathParams, queryParams, bodyParam) => dispatch(projectUserActions.fetchPagedEntityList(pageIndex, pageSize, pathParams, queryParams, bodyParam)),
    }
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { authentication } = newProps
    // when authentication changed, update the link to get CSV user list
    if (oldProps.authentication !== authentication) {
      this.setState({
        csvLink: csvSummaryFileActions.getFileDownloadLink(get(newProps, 'authentication.result.access_token')),
      })
    }
  }

  onRefresh = (contextRequestURLParameters) => {
    const {
      pageMeta, fetchUsers,
    } = this.props
    const lastPage = (pageMeta && pageMeta.number) || 0
    const fetchPageSize = ProjectUserListContainer.PAGE_SIZE * (lastPage + 1)
    fetchUsers(0, fetchPageSize, {}, { ...contextRequestURLParameters })
  }

  onBack = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/user/board`)
  }

  onCreate = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/user/project-user/create`)
  }

  render() {
    const { params: { project, visualisationMode } } = this.props
    const { csvLink } = this.state
    return (
      <I18nProvider messages={messages}>
        <ModuleStyleProvider module={styles}>
          <ProjectUserListComponent
            project={project}
            csvLink={csvLink}
            onRefresh={this.onRefresh}
            onCreate={this.onCreate}
            onBack={this.onBack}
            visualisationMode={visualisationMode}
          />
        </ModuleStyleProvider>
      </I18nProvider>
    )
  }
}
export default connect(
  ProjectUserListContainer.mapStateToProps,
  ProjectUserListContainer.mapDispatchToProps)(ProjectUserListContainer)
