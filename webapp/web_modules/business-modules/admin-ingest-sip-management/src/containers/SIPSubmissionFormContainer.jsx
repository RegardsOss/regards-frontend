/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import reduce from 'lodash/reduce'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import messages from '../i18n'
import styles from '../styles/styles'
import { sipImportActions } from '../clients/SIPImportClient'
import { storageReadyActions } from '../clients/StorageReadyClient'
import SIPsubmissionFormComponent from '../components/submission/SIPSubmissionFormComponent'
import SIPSubmissionNotReadyComponent from '../components/submission/SIPSubmissionNotReadyComponent'

/**
* Displays the SIPsubmissionForm
* @author Sébastien Binda
*/
export class SIPSubmissionFormContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps = dispatch => ({
    flushSips: () => dispatch(sipImportActions.flush()),
    submitSips: file => dispatch(sipImportActions.createEntityUsingMultiPart({}, { file })),
    isStorageReady: () => dispatch(storageReadyActions.sendSignal('GET', null, { microserviceName: 'rs-storage' })),
  })

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }).isRequired,
    // from mapDispatchToProps
    submitSips: PropTypes.func.isRequired,
    flushSips: PropTypes.func.isRequired,
    isStorageReady: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      isError: false,
      isLoading: true,
      storageReady: false,
      serverMessage: undefined,
    }
  }

  componentDidMount() {
    this.props.isStorageReady().then((actionResults) => {
      const result = get(actionResults, 'payload.ready')
      if (!result) {
        const reasons = get(actionResults, 'payload.reasons', [get(actionResults, 'payload.message', '')])
        this.setState({
          storageReady: false,
          isLoading: false,
          serverMessage: reduce(reasons, (serverMessage, r) => `${serverMessage} ${r}`, ''),
        })
      } else {
        this.setState({
          storageReady: true,
          isLoading: false,
        })
      }
    })
  }

  onSucceed = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/sip/submission-summary`
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
    this.props.flushSips().then(() => this.props.submitSips(values.sips)
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error || actionResult.meta.status === 422) {
          this.onSucceed()
          this.setState({
            isError: false,
            isLoading: false,
          })
        } else {
          this.setState({
            isError: true,
            isLoading: false,
          })
        }
      }))
  }

  renderSIPSubmissionForm = () => {
    if (this.state.storageReady) {
      return (
        <SIPsubmissionFormComponent
          isError={this.state.isError}
          isLoading={this.state.isLoading}
          submitSips={this.onSubmit}
          onBack={this.onBack}
        />
      )
    }
    return (
      <SIPSubmissionNotReadyComponent
        serverMessage={this.state.serverMessage}
        onConfigureDataStorages={this.onConfigureDataStorages}
        onConfigureAllocationStrategies={this.onConfigureAllocationStrategies}
        onConfigureCatalogSecurity={this.onConfigureCatalogSecurity}
        onBack={this.onBack}
      />
    )
  }

  render() {
    const stylesObj = { styles }

    return (
      <I18nProvider messages={messages}>
        <ModuleStyleProvider module={stylesObj}>
          <LoadableContentDisplayDecorator
            isLoading={this.state.isLoading}
          >
            {this.renderSIPSubmissionForm()}
          </LoadableContentDisplayDecorator>
        </ModuleStyleProvider>
      </I18nProvider >
    )
  }
}

export default connect(SIPSubmissionFormContainer.mapStateToProps,
  SIPSubmissionFormContainer.mapDispatchToProps)(SIPSubmissionFormContainer)
