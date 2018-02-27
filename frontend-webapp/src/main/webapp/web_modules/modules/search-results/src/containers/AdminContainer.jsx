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
import get from 'lodash/get'
import { connect } from '@regardsoss/redux'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import SearchResultsConfigurationComponent from '../components/admin/SearchResultsConfigurationComponent'
import {
  DataAttributeModelActions,
  DataAttributeModelSelectors,
} from '../clients/DataobjectAttributeModelClient'
import {
  DatasetAttributeModelActions,
  DatasetAttributeModelSelectors,
} from '../clients/DatasetAttributeModelClient'
import {
  DocumentAttributeModelActions,
  DocumentAttributeModelSelectors,
} from '../clients/DocumentAttributeModelClient'
import ModuleConfiguration from '../models/ModuleConfiguration'

/**
 * Main container to display administration view of the module form.
 * @author Sébastien binda
 * @author Léo Mieulet
 */
export class AdminContainer extends React.Component {
  static propTypes = {
    // default module properties
    ...AccessShapes.runtimeConfigurationModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfiguration.isRequired,
    // Set by mapStateToProps
    dataAttributeModels: DataManagementShapes.AttributeModelList,
    datasetAttributeModels: DataManagementShapes.AttributeModelList,
    documentAttributeModels: DataManagementShapes.AttributeModelList,
    // Set by mapDispatchToProps
    fetchAllDataAttributes: PropTypes.func,
    fetchAllDatasetModelsAttributes: PropTypes.func,
    fetchAllDocumentModelsAttributes: PropTypes.func,
  }

  state = {
    isLoading: true,
  }

  componentDidMount() {
    const tasks = [
      this.props.fetchAllDatasetModelsAttributes(),
      this.props.fetchAllDocumentModelsAttributes(),
      this.props.fetchAllDataAttributes(),
    ]
    Promise.all(tasks)
      .then(() =>
        this.setState({ isLoading: false }))
  }

  render() {
    const currentFormValues = get(this.props.adminForm.form, this.props.adminForm.currentNamespace)
    const adminConf = get(this.props.adminForm, 'conf', {})
    if (this.props.adminForm.form && !this.state.isLoading) {
      return (
        <SearchResultsConfigurationComponent
          dataAttributeModels={this.props.dataAttributeModels}
          datasetAttributeModels={this.props.datasetAttributeModels}
          documentAttributeModels={this.props.documentAttributeModels}
          currentFormValues={currentFormValues}
          initialFormValues={this.props.moduleConf}
          isCreating={this.props.adminForm.isCreating}
          adminConf={adminConf}
          changeField={this.props.adminForm.changeField}
          currentNamespace={this.props.adminForm.currentNamespace}
        />
      )
    }
    return null
  }
}


const mapStateToProps = (state, ownProps) => ({
  dataAttributeModels: DataAttributeModelSelectors.getList(state),
  datasetAttributeModels: DatasetAttributeModelSelectors.getList(state),
  documentAttributeModels: DocumentAttributeModelSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchAllDataAttributes: () => dispatch(DataAttributeModelActions.fetchEntityList({ pModelType: 'DATA' })),
  fetchAllDatasetModelsAttributes: () => dispatch(DatasetAttributeModelActions.fetchEntityList({ pModelType: 'DATASET' })),
  fetchAllDocumentModelsAttributes: () => dispatch(DocumentAttributeModelActions.fetchEntityList({ pModelType: 'DOCUMENT' })),
})

const UnconnectedAdminContainer = AdminContainer
export { UnconnectedAdminContainer }

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)

