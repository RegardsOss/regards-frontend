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
import { browserHistory } from 'react-router'
import messages from '../i18n'
import OSCrawlerConfigurationComponent from '../components/OSCrawlerConfigurationComponent'

/**
*Comment Here
* @author Maxime Bouveron
*/
export class OSCrawlerConfigurationContainer extends React.Component {
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
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    refresh: PropTypes.string,
    descriptor: PropTypes.string,
  }),
  // from mapStateToProps
  // from mapDispatchToProps
}

onSubmit = (fields) => {
  // TODO do the promise thingy
  this.props.onSubmit(fields)
  browserHistory.push(this.props.nextUrl)
}

render() {
  const { backUrl } = this.props
  return (
    <I18nProvider messages={messages}>
      <OSCrawlerConfigurationComponent
        backUrl={backUrl}
        onSubmit={this.onSubmit}
        initialValues={this.props.initialValues}
      />
    </I18nProvider>
  )
}
}

export default connect(
  OSCrawlerConfigurationContainer.mapStateToProps,
  OSCrawlerConfigurationContainer.mapDispatchToProps)(OSCrawlerConfigurationContainer)
