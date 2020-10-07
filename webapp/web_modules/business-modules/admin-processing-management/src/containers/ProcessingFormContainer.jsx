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
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import get from 'lodash/get'
import { processingActions, processingSelectors } from '../clients/ProcessingClient'
import ProcessingFormComponent, { FORM_MODE } from '../components/ProcessingFormComponent'

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
  }

  UNSAFE_componentWillMount() {
    const { params: { businessId } } = this.props
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
  }

  /**
   * Create or Update a processingConf from the PluginConfiguration fields & SelectedRole field.
   * @param {*} fields
   */
  onSubmit = (fields) => {
    const {
      params: { mode }, processing, create, update,
    } = this.props

    // Creation of a plugin conf thanks to form fields
    const pluginConfiguration = fields.pluginConfiguration ? {
      ...PluginFormUtils.formatPluginConf(fields.pluginConfiguration),
    } : null
    const processingConf = {
      content: {
        pluginConfiguration,
        rights: {
          role: get(fields, 'userRole'),
        },
      },
    }

    // Action to do depending on form mode
    let action
    switch (mode) {
      case FORM_MODE.CREATE:
        action = create(processingConf)
        break
      case FORM_MODE.EDIT:
        action = update(get(processing, 'content.pluginConfiguration.businessId'), processingConf)
        break
      default:
        throw new Error('FORM MODE Unknown')
    }

    // Action execution
    action.then((actionResults) => {
      if (!actionResults.error) {
        browserHistory.push(this.getBackUrl())
      }
    })
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/commands/processing/list`
  }

  render() {
    const {
      params: { mode }, processing,
    } = this.props

    return (
      <LoadableContentDisplayDecorator
        isLoading={this.state.isLoading}
      >
        <ProcessingFormComponent
          mode={mode}
          processing={processing}
          onSubmit={this.onSubmit}
          backUrl={this.getBackUrl()}
        />
      </LoadableContentDisplayDecorator>
    )
  }
}

export default connect(
  ProcessingFormContainer.mapStateToProps,
  ProcessingFormContainer.mapDispatchToProps)(ProcessingFormContainer)
