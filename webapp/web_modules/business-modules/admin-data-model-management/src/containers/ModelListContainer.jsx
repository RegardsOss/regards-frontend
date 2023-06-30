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
import { modelActions, modelSelectors } from '../clients/ModelClient'
import ModelListComponent from '../components/ModelListComponent'
import { authenticationSelectors } from '../clients/AuthenticationClient'
import messages from '../i18n'

/**
 * React container to list all model entities
 */
export class ModelListContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    modelList: DataManagementShapes.ModelList,
    accessToken: PropTypes.string,
    // from mapDispatchToProps
    fetchModelList: PropTypes.func,
    deleteModel: PropTypes.func,
  }

  state = {
    isLoading: true,
  }

  UNSAFE_componentWillMount() {
    Promise.resolve(this.props.fetchModelList())
      .then((actionResult) => {
        if (!actionResult.error) {
          this.setState({
            isLoading: false,
          })
        }
      })
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/models/model/create`
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/models/board`
  }

  handleEdit = (modelName) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/models/model/${modelName}/edit`
    browserHistory.push(url)
  }

  handleDuplicate = (modelName) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/models/model/${modelName}/duplicate`
    browserHistory.push(url)
  }

  handleBindAttributes = (modelId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/models/model-attribute/${modelId}/edit`
    browserHistory.push(url)
  }

  handleDelete = (projectName) => {
    this.props.deleteModel(projectName)
  }

  render() {
    const { modelList, accessToken } = this.props
    return (
      <I18nProvider messages={messages}>
        <ModelListComponent
          modelList={modelList}
          accessToken={accessToken}
          createUrl={this.getCreateUrl()}
          backUrl={this.getBackUrl()}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          handleDuplicate={this.handleDuplicate}
          handleBindAttributes={this.handleBindAttributes}
          isLoading={this.state.isLoading}
        />
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state) => ({
  modelList: modelSelectors.getList(state),
  accessToken: authenticationSelectors.getAccessToken(state),
})
const mapDispatchToProps = (dispatch) => ({
  fetchModelList: () => dispatch(modelActions.fetchEntityList()),
  deleteModel: (id) => dispatch(modelActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModelListContainer)
