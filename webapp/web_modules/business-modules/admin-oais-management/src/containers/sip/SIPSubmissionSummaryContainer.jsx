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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { IngestShapes } from '@regardsoss/shape'
import { withI18n } from '@regardsoss/i18n'
import { sipImportSelectors } from '../../clients/SIPImportClient'
import SIPsubmissionSummaryComponent from '../../components/sip/submission/SIPSubmissionSummaryComponent'
import messages from '../../i18n'

/**
* Container to display sip submission synchrone results from server. May contain rejected or handled SIP.
* @author Sébastien Binda
*/
export class SIPSubmissionSummaryContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      submitedSips: sipImportSelectors.getArray(state),
    }
  }

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }).isRequired,
    // from mapStateToProps
    submitedSips: PropTypes.arrayOf(IngestShapes.SIPSubmited).isRequired,
    // from mapDispatchToProps
  }

  onBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/board`
    browserHistory.push(url)
  }

  render() {
    return (
      <SIPsubmissionSummaryComponent
        submitedSips={this.props.submitedSips}
        onBack={this.onBack}
      />
    )
  }
}
export default connect(SIPSubmissionSummaryContainer.mapStateToProps)(withI18n(messages)(SIPSubmissionSummaryContainer))
