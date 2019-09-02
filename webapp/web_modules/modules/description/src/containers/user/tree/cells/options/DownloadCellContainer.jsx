/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { AuthenticationClient, AuthenticationParametersSelectors } from '@regardsoss/authentication-utils'
import { DamDomain } from '@regardsoss/domain'
import { FileData } from '../../../../../shapes/DescriptionState'
import DownloadCellComponent from '../../../../../components/user/tree/cells/options/DownloadCellComponent'

/**
 * Download cell container: retrieves authentication data for locating download link
 * @author Raphaël Mechali
 */
export class DownloadCellContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      accessToken: AuthenticationClient.authenticationSelectors.getAccessToken(state),
      projectName: AuthenticationParametersSelectors.getProject(state),
    }
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    file: FileData.isRequired, // used only in on properties updated
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    accessToken: PropTypes.string, // used only in on properties updated
    // eslint-disable-next-line react/no-unused-prop-types
    projectName: PropTypes.string.isRequired, // used only in on properties updated
    // from mapDispatchToProps
  }

  /**
   * Initial state
   */
  state ={
    uri: null,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param {*} oldProps previous component properties
   * @param {*} newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { file, accessToken, projectName } = newProps
    const nextState = { ...this.state }
    if (!isEqual(oldProps.file, file)
      || !isEqual(oldProps.accessToken, accessToken)
      || !isEqual(oldProps.projectName, projectName)) {
      if (file.online) {
        nextState.uri = DamDomain.DataFileController.getURI(file.uri, file.external, accessToken, projectName)
      } else {
        nextState.uri = null
      }
    }
    if (!isEqual(this.state, nextState)) {
      this.setState(nextState)
    }
  }

  render() {
    const { uri } = this.state
    return <DownloadCellComponent uri={uri} />
  }
}
export default connect(DownloadCellContainer.mapStateToProps)(DownloadCellContainer)
