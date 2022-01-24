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
import { connect } from '@regardsoss/redux'
import { OrderClient } from '@regardsoss/client'
import { AuthenticateShape, AuthenticationClient } from '@regardsoss/authentication-utils'
import DownloadOrdersCSVSummaryComponent from '../../../components/orders/options/DownloadOrdersCSVSummaryComponent'

const csvSummaryFileActions = new OrderClient.DownloadOrderSummaryCSVFileActions()

/**
 * Container for download orders CSV summary option
 * @author Raphaël Mechali
 */
export class DownloadOrdersCSVSummaryContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      authentication: AuthenticationClient.authenticationSelectors.getAuthentication(state),
    }
  }

  static propTypes = {
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    authentication: AuthenticateShape.isRequired, // used only in onPropertiesUpdated
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
    // when authentication changed, update the link to orders CSV summary
    this.setState({
      csvLink: csvSummaryFileActions.getFileDownloadLink(get(newProps, 'authentication.result.access_token')),
    })
  }

  render() {
    const { csvLink } = this.state
    return (
      <DownloadOrdersCSVSummaryComponent link={csvLink} />
    )
  }
}
export default connect(DownloadOrdersCSVSummaryContainer.mapStateToProps)(DownloadOrdersCSVSummaryContainer)
