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
import { I18nProvider } from '@regardsoss/i18n'
import messages from '../i18n'
import OSQueryConfigurationComponent from '../components/OSQueryConfigurationComponent'

/**
*Comment Here
* @author Maxime Bouveron
*/
export class OSQueryConfigurationContainer extends React.Component {
  /**
 * Redux: map state to props function
 * @param {*} state: current redux state
 * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
 * @return {*} list of component properties extracted from redux state
 */
  static mapStateToProps(state) {
    return {}
  }

  /**
 * Redux: map dispatch to props function
 * @param {*} dispatch: redux dispatch function
 * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
 * @return {*} list of component properties extracted from redux state
 */
  static mapDispatchToProps(dispatch) {
    return {}
  }

static propTypes = {
  backUrl: PropTypes.string.isRequired,
  nextUrl: PropTypes.string.isRequired,
// from mapStateToProps
// from mapDispatchToProps
}

render() {
  const { backUrl, nextUrl } = this.props
  return (
    <I18nProvider messages={messages}>
      <OSQueryConfigurationComponent backUrl={backUrl} nextUrl={nextUrl} />
    </I18nProvider>
  )
}
}
export default connect(
  OSQueryConfigurationContainer.mapStateToProps,
  OSQueryConfigurationContainer.mapDispatchToProps)(OSQueryConfigurationContainer)
