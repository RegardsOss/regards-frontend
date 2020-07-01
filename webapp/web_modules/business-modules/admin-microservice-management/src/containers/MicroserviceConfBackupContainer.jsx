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
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { URLAuthInjector } from '@regardsoss/domain/common'
import { browserHistory } from 'react-router'
import { AuthenticationClient } from '@regardsoss/authentication-utils'
import { microserviceConfBackupActions, microserviceConfBackupSelectors } from '../clients/MicroserviceConfBackupClient'
import MicroserviceConfBackupComponent from '../components/MicroserviceConfBackupComponent'
import messages from '../i18n'

/**
 * React container to export / import microservice configuration
 */
export class MicroserviceConfBackupContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      microserviceName: PropTypes.string,
    }),
    // from mapStateToProps
    isSendingConfiguration: PropTypes.bool,
    accessToken: PropTypes.string,
    // from mapDispatchToProps
    uploadConfiguration: PropTypes.func,
  }

  static mapStateToProps = (state) => ({
    accessToken: AuthenticationClient.authenticationSelectors.getAccessToken(state),
    isSendingConfiguration: microserviceConfBackupSelectors.isFetching(state),
  })

  static mapDispatchToProps = (dispatch, ownProps) => ({
    uploadConfiguration: (file) => dispatch(microserviceConfBackupActions.sendBackupConf(ownProps.params.microserviceName, file)),
  })

  getExportUrl = () => {
    const { params: { microserviceName }, accessToken } = this.props
    return URLAuthInjector(`${GATEWAY_HOSTNAME}/${API_URL}/${microserviceName}/microservice/configuration`, accessToken)
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/microservice/board`
  }

  redirectToBack = () => {
    const backUrl = this.getBackUrl()
    browserHistory.push(backUrl)
  }

  render() {
    return (
      <I18nProvider messages={messages}>
        <MicroserviceConfBackupComponent
          exportUrl={this.getExportUrl()}
          backUrl={this.getBackUrl()}
          microserviceName={this.props.params.microserviceName}
          handleBack={this.redirectToBack}
          handleExportFile={this.props.uploadConfiguration}
          isSendingConfiguration={this.props.isSendingConfiguration}
        />
      </I18nProvider>
    )
  }
}

export default connect(MicroserviceConfBackupContainer.mapStateToProps, MicroserviceConfBackupContainer.mapDispatchToProps)(MicroserviceConfBackupContainer)
