/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { AttributeModel } from '@regardsoss/model'
import SearchResultsConfigurationComponent from '../components/admin/SearchResultsConfigurationComponent'
import {
  AttributeModelActions as DataobjectAttributeModelActions,
  AttributeModelSelectors as DataobjectAttributeModelSelectors,
} from '../clients/DataobjectAttributeModelClient'
import {
  AttributeModelActions as DatasetAttributeModelActions,
  AttributeModelSelectors as DatasetAttributeModelSelectors,
} from '../clients/DatasetAttributeModelClient'
import ModuleConfiguration from '../models/ModuleConfiguration'


/**
 * Main container to display administration view of the module form.
 * @author Sébastien binda
 */
export class AdminContainer extends React.Component {


  static propTypes = {
    // Props supplied by LazyModuleComponent
    // eslint-disable-next-line react/no-unused-prop-types
    appName: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    project: PropTypes.string,
    adminForm: PropTypes.shape({
      changeField: PropTypes.func,
      form: ModuleConfiguration,
    }).isRequired,
    // Default props given to the form
    moduleConf: ModuleConfiguration.isRequired,

    // Set by mapStateToProps and mapDispatchToProps
    attributeModels: PropTypes.objectOf(AttributeModel),
    datasetAttributeModels: PropTypes.objectOf(AttributeModel),
    fetchAllDataobjectsAttributes: PropTypes.func,
    fetchAllDatasetModelsAttributes: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      attributesFetching: !this.props.moduleConf.selectableAttributes,
      datasetAttributesFetching: true,
    }
  }

  componentWillMount() {
    if (this.state.attributesFetching) {
      Promise.resolve(this.props.fetchAllDataobjectsAttributes()).then(() => this.setState({ attributesFetching: false }))
    }
    Promise.resolve(this.props.fetchAllDatasetModelsAttributes()).then(() => this.setState({ datasetAttributesFetching: false }))
  }

  render() {
    const {
      moduleConf: {
        displayDatasets,
      attributes,
      attributesRegroupements,
      datasetAttributes,
      selectableAttributes,
      hideDatasetsConfiguration = false,
      enableFacettes,
      },
    } = this.props


    if (this.props.adminForm.form && !this.state.attributesFetching && !this.state.datasetAttributesFetching) {
      const formConf = this.props.adminForm.form.conf
      const attributesConf = formConf && formConf.attributes ? formConf.attributes : []
      const defaultDatasetAttributesConf = formConf && formConf.datasetAttributes ? formConf.datasetAttributes : []
      const displayDataset = formConf && formConf.displayDatasets
      const attributesRegroupementsConf = formConf && formConf.attributesRegroupements ? formConf.attributesRegroupements : []
      return (
        <SearchResultsConfigurationComponent
          selectableAttributes={selectableAttributes || this.props.attributeModels}
          datasetSelectableAttributes={this.props.datasetAttributeModels}
          attributesConf={attributesConf}
          attributesRegroupementsConf={attributesRegroupementsConf}
          datasetAttributes={defaultDatasetAttributesConf}
          displayDataset={displayDataset}
          changeField={this.props.adminForm.changeField}
          defaultAttributesConf={attributes}
          defaultDatasetAttributesConf={datasetAttributes}
          defaultAttributesRegroupementsConf={attributesRegroupements}
          defaultEnableFacettes={enableFacettes}
          defaultDisplayDatasets={!!displayDatasets}
          hideDatasetsConfiguration={hideDatasetsConfiguration}
        />
      )
    }
    return null
  }
}

const mapStateToProps = (state, ownProps) => ({
  attributeModels: DataobjectAttributeModelSelectors.getList(state),
  datasetAttributeModels: DatasetAttributeModelSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchAllDataobjectsAttributes: () => dispatch(DataobjectAttributeModelActions.fetchEntityList({ pModelType: 'DATA' })),
  fetchAllDatasetModelsAttributes: () => dispatch(DatasetAttributeModelActions.fetchEntityList({ pModelType: 'DATASET' })),
})

const UnconnectedAdminContainer = AdminContainer
export {
  UnconnectedAdminContainer,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)

