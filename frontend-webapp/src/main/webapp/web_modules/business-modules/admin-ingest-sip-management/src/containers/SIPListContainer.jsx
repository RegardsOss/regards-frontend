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
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleStyleProvider } from '@regardsoss/theme'
import SIPListComponent from '../components/SIPListComponent'
import messages from '../i18n'
import styles from '../styles/styles'
import { sipActions, sipSelectors } from '../clients/SIPClient'

/**
* Displays the list of SIPs
* @author Maxime Bouveron
*/
export class SIPListContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      // sips: sipSelectors.getResults(state),
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
      fetchSips: () => dispatch(sipActions.fetchPagedEntityList()),
    }
  }

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    sips: PropTypes.arrayOf(Object),
    // from mapDispatchToProps
    fetchSips: PropTypes.func,
  }


  componentWillMount() {
    this.props.fetchSips()
  }

  componentDidMount() {
    // console.log(this.props.sips)
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
          <SIPListComponent handleGoBack={this.handleGoBack} />
        </ModuleStyleProvider>
      </I18nProvider>
    )
  }
}

export default connect(SIPListContainer.mapStateToProps, SIPListContainer.mapDispatchToProps)(
  SIPListContainer,
)
