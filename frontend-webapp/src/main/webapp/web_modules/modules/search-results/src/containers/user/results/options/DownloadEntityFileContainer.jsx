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
import { connect } from '@regardsoss/redux'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
import DownloadEntityFileComponent from '../../../../components/user/results/options/DownloadEntityFileComponent'
import { authenticationSelectors } from '../../../../clients/AuthenticationClient'
/**
* Download file container
* @author Léo Mieulet
*/
export class DownloadEntityFileContainer extends React.Component {
  static propTypes = {
    // from table cell API, mentionned here only to be excluded from children properties
    rowIndex: PropTypes.number,
    accessToken: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    scope: PropTypes.string,
    //... other properties reported to sub-component
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { rowIndex, ...otherProps } = this.props
    return (
      <DownloadEntityFileComponent {...otherProps} />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  accessToken: authenticationSelectors.getAccessToken(state),
  isAuthenticated: authenticationSelectors.isAuthenticated(state),
  scope: AuthenticationParametersSelectors.getProject(state),
})


export default connect(mapStateToProps)(DownloadEntityFileContainer)
