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
import messages from '../i18n'
import styles from '../styles/styles'
import { sipImportActions } from '../clients/SIPImportClient'
import SIPSubmitionFormComponent from '../components/SIPSubmitionFormComponent'

/**
* Displays the SIPSubmitionForm
* @author Sébastien Binda
*/
export class SIPSubmitionFormContainer extends React.Component {
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

  constructor(props) {
    super(props)
    this.state = {
      isError: false,
    }
  }

  onSucceed = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/sip/submition-summary`
    browserHistory.push(url)
  }

  onBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/board`
    browserHistory.push(url)
  }

  onSubmit = (values) => {
    this.props.flushSips().then(() => this.props.submitSips(values.sips)
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error || actionResult.meta.status === 422) {
          this.onSucceed()
          this.setState({
            isError: false,
          })
        } else {
          this.setState({
            isError: true,
          })
        }
      }))
  }

  render() {
    const stylesObj = { styles }
    return (
      <I18nProvider messages={messages}>
        <ModuleStyleProvider module={stylesObj}>
          <SIPSubmitionFormComponent
            isError={this.state.isError}
            submitSips={this.onSubmit}
            onBack={this.onBack}
          />
        </ModuleStyleProvider>
      </I18nProvider>
    )
  }
}

export default connect(SIPSubmitionFormContainer.mapStateToProps, SIPSubmitionFormContainer.mapDispatchToProps)(SIPSubmitionFormContainer)
