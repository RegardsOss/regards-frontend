/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { Dataset, ModelAttribute } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { modelAttributesActions, modelAttributesSelectors } from '../client/ModelAttributesClient'
import DatasetFormSubsettingComponent from '../components/DatasetFormSubsettingComponent'

/**
 * Show the dataset form
 */
export class DatasetFormSubsettingContainer extends React.Component {

  static propTypes = {
    currentDataset: Dataset,
    handleBack: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired,
    // from mapStateToProps
    modelAttributeList: PropTypes.objectOf(ModelAttribute),
    // from mapDispatchToProps
    fetchModelAttributeList: PropTypes.func,
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

  handleTestSubsetting = (formValues) => {
    console.log("Let's test subsetting", formValues)
  }

  render() {
    const { currentDataset, handleBack, handleSave, isEditing, modelAttributeList } = this.props
    const { isLoading } = this.state
    return (
      <I18nProvider messageDir="business-modules/admin-data-dataset-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {() => (<DatasetFormSubsettingComponent
            currentDataset={currentDataset}
            handleBack={handleBack}
            onSubmit={handleSave}
            handleTestSubsetting={this.handleTestSubsetting}
            modelAttributeList={modelAttributeList}
            isEditing={isEditing}
          />)
          }
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
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetFormSubsettingContainer)
