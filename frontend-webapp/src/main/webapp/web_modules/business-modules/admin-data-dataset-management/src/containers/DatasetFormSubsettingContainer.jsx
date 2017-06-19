/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { DataManagementShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { modelAttributesActions, modelAttributesSelectors } from '../clients/ModelAttributesClient'
import DatasetFormSubsettingComponent from '../components/DatasetFormSubsettingComponent'
import { datasetValidSubsettingTestActions } from '../clients/DatasetValidSubsettingTest'
/**
 * Show the dataset form
 */
export class DatasetFormSubsettingContainer extends React.Component {

  static propTypes = {
    currentDataset: DataManagementShapes.Dataset,
    handleBack: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired,
    // from mapStateToProps
    modelAttributeList: DataManagementShapes.ModelAttributeList,
    // from mapDispatchToProps
    fetchModelAttributeList: PropTypes.func,
    testSubsetting: PropTypes.func,
  }


  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    // Fetch attributes from the Datasource model
    Promise.resolve(this.props.fetchModelAttributeList(this.props.currentDataset.content.dataModel))
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  getForm = () => {
    const { currentDataset, handleBack, handleSave, isEditing, modelAttributeList } = this.props
    return (<DatasetFormSubsettingComponent
      currentDataset={currentDataset}
      handleBack={handleBack}
      onSubmit={handleSave}
      handleTestSubsetting={this.handleTestSubsetting}
      modelAttributeList={modelAttributeList}
      isEditing={isEditing}
    />)
  }

  handleTestSubsetting = subsetting => this.props.testSubsetting(this.props.currentDataset.content.dataModel, encodeURIComponent(subsetting))

  render() {
    const { isLoading } = this.state
    return (
      <I18nProvider messageDir="business-modules/admin-data-dataset-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {this.getForm}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  modelAttributeList: modelAttributesSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchModelAttributeList: id => dispatch(modelAttributesActions.fetchEntityList({ pModelId: id })),
  testSubsetting: (dataModelId, subsetting) => dispatch(datasetValidSubsettingTestActions.sendSignal('POST', { query: subsetting }, null, { dataModelId })),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetFormSubsettingContainer)
