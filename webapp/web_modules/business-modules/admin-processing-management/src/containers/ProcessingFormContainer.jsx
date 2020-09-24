/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { PluginFormUtils } from '@regardsoss/microservice-plugin-configurator'
import { connect } from '@regardsoss/redux'
import { ProcessingShapes } from '@regardsoss/shape'
import { AdminDomain } from '@regardsoss/domain'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import get from 'lodash/get'
import { processingActions, processingSelectors } from '../clients/ProcessingClient'
import ProcessingFormComponent, { FORM_MODE }  from '../components/ProcessingFormComponent'

/**
* Container to handle create/edit/duplicate form of a storage location plugin
* @author Théo Lasserre
*/
export class ProcessingFormContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} ownProps: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, ownProps) {
    return {
      processing: get(ownProps, 'params.businessId') ? processingSelectors.getById(state, ownProps.params.businessId) : null,
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} ownProps: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetch: (businessId) => dispatch(processingActions.fetchEntity(businessId)),
      create: (processing) => dispatch(processingActions.createEntity(processing)),
      update: (entityId, processing) => dispatch(processingActions.updateEntity(entityId, processing)),
    }
  }

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
      businessId: PropTypes.string,
      mode: PropTypes.string.isRequired,
    }),
    // from mapStateToProps
    processing: ProcessingShapes.Processing,
    // from mapDispatchToProps
    fetch: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
  }

  state = {
    isLoading: !!get(this.props, 'params.businessId', false),
    backUrl: ''
  }

  UNSAFE_componentWillMount() {
    const { params: { project, businessId, mode } } = this.props

    // Fetch processing if exist
    if (businessId) {
      this.props.fetch(businessId).then((actionResult) => {
        if (!actionResult.error) {
          this.setState({
            isLoading: false,
          })
        }
      })
    }

    // Set backUrl
    let backUrl
    switch(mode) {
      case FORM_MODE.CREATE:
        backUrl = `/admin/${project}/commands/board`
        break
      case FORM_MODE.EDIT:
        backUrl = `/admin/${project}/commands/processing/list`
        break
      default: ''
    }
    this.setState({
      backUrl
    })
  }

  onSubmit = (fields) => {
    const { params: { mode } } = this.props
    switch(mode) {
      case FORM_MODE.CREATE:
        this.createProcessingConf(fields)
        break
      case FORM_MODE.EDIT:
        this.updateProcessingConf(fields)
        break
      default:
        null
    }
  }

  onBack = () => {
    const { backUrl } = this.state
    browserHistory.push(backUrl)
  }

  /**
   * Create a processingConf from the given updated PluginConfiguration fields.
   */
  createProcessingConf = (fields) => {
    const { create } = this.props
    const pluginConf = fields.pluginConfiguration ? fields.pluginConfiguration : null
    const formatedPluginConf = PluginFormUtils.formatPluginConf(pluginConf)
    const processingConf = {
      content: {
        pluginConfiguration: formatedPluginConf,
        rigths: {
          role: get(fields, 'userRole', AdminDomain.DEFAULT_ROLES_ENUM.PUBLIC),
        },
      },
    }

    create(processingConf).then((actionResults) => {
      if (!actionResults.error) {
        this.onBack()
      }
    })
  }

  /**
   * Update a processingConf from the given updated PluginConfiguration fields & SelectedRole field.
   * @param {*} fields
   */
  updateProcessingConf = (fields) => {
    const { update, processing } = this.props
    const pluginConfiguration = fields.pluginConfiguration ? {
      ...PluginFormUtils.formatPluginConf(fields.pluginConfiguration),
    } : null
    const processingConfToUpdate = {
      pluginConfiguration,
      rigths: {
        role: get(fields, 'userRole'),
      },
    }
    update(get(processing, 'content.pluginConfiguration.businessId'), processingConfToUpdate).then((actionResults) => {
      if (!actionResults.error) {
        this.onBack()
      }
    })
  }

  render() {
    const {
      params: { mode }, processing,
    } = this.props
    const { backUrl } = this.state

    return (
      <LoadableContentDisplayDecorator
        isLoading={this.state.isLoading}
      >
        <ProcessingFormComponent
          mode={mode}
          processing={processing}
          onSubmit={this.onSubmit}
          backUrl={backUrl}
        />
      </LoadableContentDisplayDecorator>
    )
  }
}

export default connect(
  ProcessingFormContainer.mapStateToProps,
  ProcessingFormContainer.mapDispatchToProps)(ProcessingFormContainer)
