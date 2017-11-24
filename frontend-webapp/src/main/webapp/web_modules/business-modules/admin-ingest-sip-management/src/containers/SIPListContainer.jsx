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
import SIPListComponent from '../components/SIPListComponent'
import messages from '../i18n'
import styles from '../styles/styles'

/**
 * Displays the list of SIPs
 * @author Maxime Bouveron
 */
export class SIPListContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      session: PropTypes.string,
    }),
  }

  constructor(props) {
    super(props)
    this.state = {
      filters: {},
    }
  }

  getParams = () => {
    let queryParams = `sessionId=${this.props.params.session}`
    const { filters } = this.state

    Object.keys(filters).forEach((filter) => {
      if (filters[filter]) queryParams += `&${filter}=${filters[filter]}`
    })

    return { queryParams }
  }

  handleFilters = (filters) => {
    this.setState({
      filters,
    })
  }

  handleGoBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/sip/session`
    browserHistory.push(url)
  }

  render() {
    const stylesObj = { styles }
    return (
      <I18nProvider messages={messages}>
        <ModuleStyleProvider module={stylesObj}>
          <SIPListComponent
            getParams={this.getParams}
            handleFilters={this.handleFilters}
            handleGoBack={this.handleGoBack}
          />
        </ModuleStyleProvider>
      </I18nProvider>
    )
  }
}

export default SIPListContainer
