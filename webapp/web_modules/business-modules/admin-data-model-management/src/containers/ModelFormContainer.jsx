/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DataManagementShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { modelActions, modelSelectors } from '../clients/ModelClient'
import ModelFormComponent from '../components/ModelFormComponent'
import messages from '../i18n'

export class ProjectFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      modelName: PropTypes.string,
      mode: PropTypes.string,
    }),
    // from mapStateToProps
    model: DataManagementShapes.Model,
    // from mapDispatchToProps
    createModel: PropTypes.func,
    fetchModel: PropTypes.func,
    updateModel: PropTypes.func,
    duplicateModel: PropTypes.func,
    createModelUsingFile: PropTypes.func,
  }

  state = {
    isCreating: this.props.params.modelName === undefined,
    isLoading: this.props.params.modelName !== undefined,
    isEditing: this.props.params.mode === 'edit',
  }

  componentDidMount() {
    if (!this.state.isCreating) {
      this.props.fetchModel(this.props.params.modelName)
        .then(() => {
          this.setState({
            isLoading: false,
          })
        })
    }
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/models/model/list`
  }

  handleUpdate = (values) => {
    const updatedProject = { ...this.props.model.content, description: values.description }
    return Promise.resolve(this.props.updateModel(this.props.model.content.name, updatedProject))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
        }
      })
  }

  handleCreate = (values) => {
    let task
    if (values.file) {
      task = this.props.createModelUsingFile({
        file: values.file,
      })
    } else {
      task = this.props.createModel({
        name: values.name,
        description: values.description,
        type: values.type,
      })
    }
    return Promise.resolve(task)
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
        }
      })
  }

  handleDuplicate = (values) => {
    const { model } = this.props
    return Promise.resolve(this.props.duplicateModel(model.content.name, {
      type: model.content.type,
      name: values.name,
      description: values.description,
    }))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
        }
      })
  }

  handleSubmit = (values) => {
    const { isCreating, isEditing } = this.state
    if (isCreating) {
      return this.handleCreate(values)
    }
    if (isEditing) {
      return this.handleUpdate(values)
    }
    return this.handleDuplicate(values)
  }

  render() {
    const { isCreating, isEditing, isLoading } = this.state
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator isLoading={isLoading}>
          <ModelFormComponent
            onSubmit={this.handleSubmit}
            backUrl={this.getBackUrl()}
            isEditing={isEditing}
            isCreating={isCreating}
            currentModel={this.props.model}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  model: ownProps.params.modelName ? modelSelectors.getById(state, ownProps.params.modelName) : null,
})

const mapDispatchToProps = (dispatch) => ({
  createModel: (values) => dispatch(modelActions.createEntity(values)),
  updateModel: (id, values) => dispatch(modelActions.updateEntity(id, values)),
  duplicateModel: (modelId, values) => dispatch(modelActions.duplicateModel(modelId, values)),
  createModelUsingFile: (file) => dispatch(modelActions.createEntityUsingMultiPart({}, file)),
  fetchModel: (id) => dispatch(modelActions.fetchEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFormContainer)
