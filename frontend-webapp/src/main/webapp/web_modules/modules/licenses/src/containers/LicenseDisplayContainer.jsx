/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import FlatButton from 'material-ui/FlatButton'
import { i18nContextType } from '@regardsoss/i18n'
import { connect } from '@regardsoss/redux'
import { themeContextType } from '@regardsoss/theme'
import { SingleContentURLDialogContainer } from '@regardsoss/components'
import { CommonShapes } from '@regardsoss/shape'
import { AuthenticationClient } from '@regardsoss/authentication-manager'
import ProjectLicenseActions from '../model/ProjectLicenseActions'
import ProjectLicenseSelectors from '../model/ProjectLicenseSelectors'


/**
 * License display container, shows license validation dialog after user authenticated (injected by parent)
 */
export class LicenseDisplayContainer extends React.Component {

  static propTypes = {
    project: PropTypes.string.isRequired,
    // from mapStateToProps
    licenseLink: CommonShapes.URL,
    accepted: PropTypes.bool,
    // from mapDispatchToProps
    fetchLicenseInformation: PropTypes.func.isRequired,
    flushLicenseInformation: PropTypes.func.isRequired,
    sendAcceptLicense: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }


  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  componentDidMount = () => {
    // mounting: the user just authentified, fetch license state
    const { project, fetchLicenseInformation } = this.props
    fetchLicenseInformation(project)
  }

  componentWillUnmount = () => {
    // unmounting: user logged out, clear license state
    this.props.flushLicenseInformation()
  }

  onAccept = () => {
    const { project, sendAcceptLicense } = this.props
    sendAcceptLicense(project)
  }

  onRefuse = () => { this.props.logout() }

  renderActions = () => [
    <FlatButton
      key="license.refuse"
      label={this.context.intl.formatMessage({ id: 'license.refuse' })}
      onTouchTap={this.onRefuse}
    />,
    <FlatButton
      key="license.accept"
      label={this.context.intl.formatMessage({ id: 'license.accept' })}
      primary
      onTouchTap={this.onAccept}
    />,
  ]

  render() {
    const { licenseLink, accepted } = this.props
    const { dialog: { bodyStyle, heightPercent, widthPercent } } = this.context.moduleTheme

    if (licenseLink && !accepted) {
      const actions = this.renderActions()
      return (
        <SingleContentURLDialogContainer
          contentURL={licenseLink}
          loadingMessage={this.context.intl.formatMessage({ id: 'license.loading.message' })}
          dialogHeightPercent={heightPercent}
          dialogWidthPercent={widthPercent}
          bodyStyle={bodyStyle}
          open
          actions={actions}
        />
      )
    }
    return null
  }
}


const getLicenseLinkFromState = state => get(ProjectLicenseSelectors.getResult(state), 'content.licenseLink')
const getLicenseAcceptedFromState = state => get(ProjectLicenseSelectors.getResult(state), 'content.accepted', false)

const mapStateToProps = state => ({
  licenseLink: getLicenseLinkFromState(state),
  accepted: getLicenseAcceptedFromState(state),
})

const mapDispatchToProps = dispatch => ({
  fetchLicenseInformation: (project) => { dispatch(ProjectLicenseActions.fetchLicenseInformation(project)) },
  sendAcceptLicense: (project) => { dispatch(ProjectLicenseActions.sendAcceptLicense(project)) },
  flushLicenseInformation: () => { dispatch(ProjectLicenseActions.flush()) },
  logout: () => { dispatch(AuthenticationClient.authenticationActions.flush()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(LicenseDisplayContainer)

