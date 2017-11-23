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
import { browserHistory } from 'react-router'
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleStyleProvider } from '@regardsoss/theme'
import SIPSessionComponent from '../components/SIPSessionComponent'
import messages from '../i18n'
import styles from '../styles/styles'

/**
* Displays the selection of session in order to list SIPs
* @author Maxime Bouveron
*/
export class SIPSessionContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
  }

  handleOpen = (session, isError = false) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/sip/${session}/list${isError ? '?errors' : ''}`
    browserHistory.push(url)
  }

  render() {
    const stylesObj = { styles }
    return (
      <I18nProvider messages={messages}>
        <ModuleStyleProvider module={stylesObj}>
          <SIPSessionComponent handleOpen={this.handleOpen} />
        </ModuleStyleProvider>
      </I18nProvider>
    )
  }
}

export default SIPSessionContainer
