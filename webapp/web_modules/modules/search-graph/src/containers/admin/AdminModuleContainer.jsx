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
import { connect } from '@regardsoss/redux'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import CollectionModelSelectors from '../../model/CollectionModelSelectors'
import CollectionModelActions from '../../model/CollectionModelActions'
import { AttributeModelActions, AttributeModelSelectors } from '../../clients/AttributeModelClient'
import ModuleForm from '../../components/admin/ModuleForm'

/**
 * Module container for admin interface (module instance configuration)
 */
export class AdminModuleContainer extends React.Component {
  static propTypes = {
    // from module loader
    ...AccessShapes.runtimeConfigurationModuleFields,
    // form map state to properties
    collectionModels: DataManagementShapes.ModelList.isRequired,
    selectableAttributes: DataManagementShapes.AttributeModelList,
    hasError: PropTypes.bool,
    // from map dispatch to properies
    fetchCollectionModels: PropTypes.func.isRequired,
    fetchSelectableAttributes: PropTypes.func.isRequired,
  }

  state = {
    loading: true,
  }

  componentDidMount = () => {
    const { fetchCollectionModels, fetchSelectableAttributes } = this.props
    return Promise.all([fetchCollectionModels(), fetchSelectableAttributes()]).then(() => this.setState({ loading: false }))
  }

  render() {
    const {
      collectionModels, project, appName, adminForm, selectableAttributes, hasError,
    } = this.props
    const { loading } = this.state
    return (
      <LoadableContentDisplayDecorator
        isLoading={loading}
        isContentError={hasError}
        isEmpty={false}
      >
        <ModuleForm
          collectionModels={collectionModels}
          selectableAttributes={selectableAttributes}
          project={project}
          appName={appName}
          adminForm={adminForm}
        />
      </LoadableContentDisplayDecorator>
    )
  }
}

const mapStateToProps = (state) => ({
  // fetched collection models to provide the available graph levels
  collectionModels: CollectionModelSelectors.getList(state) || {},
  selectableAttributes: AttributeModelSelectors.getList(state),
  hasError: AttributeModelSelectors.hasError(state) || CollectionModelSelectors.hasError(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionModels: () => dispatch(CollectionModelActions.fetchEntityList()),
  fetchSelectableAttributes: () => dispatch(AttributeModelActions.fetchEntityList({ modelType: 'DATASET' })),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminModuleContainer)
