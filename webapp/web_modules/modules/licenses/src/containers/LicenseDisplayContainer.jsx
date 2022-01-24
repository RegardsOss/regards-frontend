/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AuthenticationClient } from '@regardsoss/authentication-utils'
import ProjectLicenseActions from '../model/ProjectLicenseActions'
import ProjectLicenseSelectors from '../model/ProjectLicenseSelectors'

/**
 * License display container, shows license validation dialog after user authenticated (injected by parent)
 */
export class LicenseDisplayContainer extends React.Component {
  static propTypes = {
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
    const { fetchLicenseInformation } = this.props
    fetchLicenseInformation()
  }

  componentWillUnmount = () => {
    // unmounting: user logged out, clear license state
    this.props.flushLicenseInformation()
  }

  onAccept = () => {
    const { sendAcceptLicense } = this.props
    sendAcceptLicense()
  }

  onRefuse = () => { this.props.logout() }

  render() {
    const { licenseLink, accepted } = this.props
    const { dialog: { heightPercent, widthPercent } } = this.context.moduleTheme

    if (licenseLink && !accepted) {
      return (
        <SingleContentURLDialogContainer
          contentURL={licenseLink}
          dialogHeightPercent={heightPercent}
          dialogWidthPercent={widthPercent}
          open
          actions={<>
            <FlatButton
              key="license.refuse"
              label={this.context.intl.formatMessage({ id: 'license.refuse' })}
              onClick={this.onRefuse}
            />
            <FlatButton
              key="license.accept"
              label={this.context.intl.formatMessage({ id: 'license.accept' })}
              primary
              onClick={this.onAccept}
            />
          </>}
        />)
    }
    return null
  }
}

const getLicenseLinkFromState = (state) => get(ProjectLicenseSelectors.getResult(state), 'content.licenseLink')
const getLicenseAcceptedFromState = (state) => get(ProjectLicenseSelectors.getResult(state), 'content.accepted', false)

const mapStateToProps = (state) => ({
  licenseLink: getLicenseLinkFromState(state),
  accepted: getLicenseAcceptedFromState(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchLicenseInformation: () => { dispatch(ProjectLicenseActions.fetchLicenseInformation()) },
  sendAcceptLicense: () => { dispatch(ProjectLicenseActions.sendAcceptLicense()) },
  flushLicenseInformation: () => { dispatch(ProjectLicenseActions.flush()) },
  logout: () => { dispatch(AuthenticationClient.authenticationActions.flush()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(LicenseDisplayContainer)
