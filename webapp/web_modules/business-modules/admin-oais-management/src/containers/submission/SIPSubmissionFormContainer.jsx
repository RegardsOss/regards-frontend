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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleStyleProvider } from '@regardsoss/theme'
import messages from '../../i18n'
import styles from '../../styles'
import { sipImportActions } from '../../clients/SIPImportClient'
import SIPsubmissionFormComponent from '../../components/submission/SIPSubmissionFormComponent'

/**
* Displays the SIPsubmissionForm
* @author Sébastien Binda
*/
export class SIPSubmissionFormContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps = (dispatch) => ({
    submitSips: (file) => dispatch(sipImportActions.importSIPFeaturesCollection(file)),
    flushSips: () => dispatch(sipImportActions.flush()),
  })

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }).isRequired,
    // from mapDispatchToProps
    submitSips: PropTypes.func.isRequired,
    flushSips: PropTypes.func.isRequired,
  }

  state = {
    isError: false,
    isLoading: false,
  }

  onSucceed = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/oais/sip/submission-summary`
    browserHistory.push(url)
  }

  onBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/board`
    browserHistory.push(url)
  }

  onConfigureDataStorages = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/storage/storages`
    browserHistory.push(url)
  }

  onConfigureAllocationStrategies = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/storage/allocations`
    browserHistory.push(url)
  }

  onConfigureCatalogSecurity = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/storage/security`
    browserHistory.push(url)
  }

  onSubmit = (values) => {
    this.setState({
      isLoading: true,
    })
    this.props.flushSips()
    this.props.submitSips(values.sips)
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.onSucceed()
        } else {
          this.setState({
            isError: true,
            isLoading: false,
          })
        }
      })
  }

  render() {
    return (
      <I18nProvider messages={messages}>
        <ModuleStyleProvider module={styles}>
          <SIPsubmissionFormComponent
            isError={this.state.isError}
            isLoading={this.state.isLoading}
            submitSips={this.onSubmit}
            onBack={this.onBack}
          />
        </ModuleStyleProvider>
      </I18nProvider>
    )
  }
}

export default connect(null, SIPSubmissionFormContainer.mapDispatchToProps)(SIPSubmissionFormContainer)
